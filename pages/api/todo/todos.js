import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
    const { method } = req

    try {
        await connectDB();
    } catch (err) {
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

    if (method === "GET") {
        return res.status(200).json({ status: 'success', data: user.todos })
    }


}

export default handler