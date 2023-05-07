import React, { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { MdDoneAll } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import RadioButton from "../modules/RadioButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",

      body: JSON.stringify({ title, status }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === "success") {
      setTitle("");
      setStatus("todo");
      toast.success(data.message);
    }
  };

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
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
        <button onClick={addHandler}>Add</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddTodoPage;
