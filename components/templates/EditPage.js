import React, { useEffect, useState } from 'react'
import RadioButton from '../modules/RadioButton'

//ICONS
import { GrAddCircle } from 'react-icons/gr'
import { BsAlignStart } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { MdDoneAll } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/router'




function EditPage({ todo }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState(todo ? todo.title : "");
    const [description, setDescription] = useState(todo ? todo.description : "");
    const [status, setStatus] = useState(todo ? todo.status : "");


    const updateHandler = async () => {
        const res = await fetch(`/api/todo/${router.query.todo}`, {
            method: "PATCH",

            body: JSON.stringify({ title, status, description }),
            headers: {
                "Content-type": "application/json",
            },
        });
        const data = await res.json();
        if (data.status === "success") {
            setTitle("");
            setDescription("");
            setStatus("todo");
            toast.success(data.message);
            router.push("/")
        }
    };

    return (
        <div className="add-form">
            <h2>
                <GrAddCircle />
                Edit Todo
            </h2>
            <div className="add-form__input">
                <div className="add-form__input--first">
                    <label htmlFor="title">Title : </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="add-form__input--first">
                    <label htmlFor="description">Description : </label>
                    <textarea
                        id="description"
                        value={description}
                        cols={30}
                        onChange={(e) => setDescription(e.target.value)}></textarea>


                </div>
                <div className="add-form__input--second">
                    <RadioButton
                        title="Todo"
                        value="todo"
                        setStatus={setStatus}
                        status={status}
                    >
                        <BsAlignStart />
                    </RadioButton>
                    <RadioButton
                        title="In Progress"
                        value="inProgress"
                        setStatus={setStatus}
                        status={status}
                    >
                        <FiSettings />
                    </RadioButton>
                    <RadioButton
                        title="Review"
                        value="review"
                        setStatus={setStatus}
                        status={status}
                    >
                        <AiOutlineFileSearch />
                    </RadioButton>
                    <RadioButton
                        title="Done"
                        value="done"
                        setStatus={setStatus}
                        status={status}
                    >
                        <MdDoneAll />
                    </RadioButton>
                </div>
                <button onClick={updateHandler}
                    className={`${loading ? "bg-white text-red-300" : ""}`}
                    disabled={loading} >
                    {loading ? "loading..." : "Update"}
                </button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default EditPage