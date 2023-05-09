import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { todoOne } from "@/utils/sortTodos";
import mongoose from "mongoose";
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

    const { id } = req.query
    if (method === "DELETE") {
        const todo = await User.findByIdAndUpdate(user.id, { $pull: { todos: { _id: id } } }, { new: true })
        return res.status(200).json({ status: "success", message: "todo is deleted!" })
    } else if (method === "PATCH") {
        const { title, description, status } = req.body
        const result = await User.updateOne(
            { "todos._id": id },
            { $set: { "todos.$.status": status, "todos.$.title": title, "todos.$.description": description } }
        )
        return res.status(200).json({ status: "success" })
    } else if (method === "GET") {
        if (!id) {
            return res.status(422).json({ status: "failed", message: 'Invalid Data!' })
        }
        const todo = user.todos.filter(item => item._id.toString() === id)
        return res.status(200).json({ status: "success", data: todo[0] })
    }
}


export default handler;