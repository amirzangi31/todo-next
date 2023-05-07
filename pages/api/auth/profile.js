import { verifyPassword } from "@/utils/auth";

import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";


const handler = async (req, res) => {

    try {
        await connectDB();
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ status: "failed", message: "Error in connecting to DB" });
    }

    const session = await getSession({ req })
    if (!session) {
        return res.status(401).json({ status: "failed", message: "You are not logged in!" })
    }

    const user = await User.findOne({ email: session.user.email })
    if (!user) {
        return res.status(404).json({ status: "failed", message: "User doesn't exist" })
    }


    if (req.method === "POST") {
        const { name, lastName, password } = req.body
        const isValid = await verifyPassword(password, user.password)
        console.log(isValid)
        if (!isValid) {
            return res.status(422).json({ status: "failed", message: "Password is incorrect" })
        }

        user.name = name
        user.lastName = lastName
        user.save()

        return res.status(200).json({ status: "success", data: { name, lastName, email: session.user.email } })


    } else if (req.method === "GET") {
        return res.status(200).json({ status: "success", data: { name: user.name, email: user.email, lastName: user.lastName  } })
    }


}

export default handler