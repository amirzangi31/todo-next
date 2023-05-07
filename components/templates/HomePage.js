import React, { useEffect, useState } from "react";
import Tasks from "../modules/Tasks";
import Loader from "../modules/Loader";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    if (data.status === "success") setTodos(data.data.todos);
  };

  return (
    <div className="home-page">
      <div className="home-page--todo">
        <p>Todo</p>
        {loading ? (
          <Loader />
        ) : (
          <Tasks
            fetchTodos={fetchTodos}
            setLoading={setLoading}
            next="inProgress"
            data={todos.todo}
          />
        )}
      </div>
      <div className="home-page--inProgress">
        <p>In Progress</p>
        {loading ? (
          <Loader />
        ) : (
          <Tasks
            fetchTodos={fetchTodos}
            setLoading={setLoading}
            next="review"
            back="todo"
            data={todos.inProgress}
          />
        )}
      </div>
      <div className="home-page--review">
        <p>Review</p>
        {loading ? (
          <Loader />
        ) : (
          <Tasks
            fetchTodos={fetchTodos}
            setLoading={setLoading}
            next="done"
            back="inProgress"
            data={todos.review}
          />
        )}
      </div>
      <div className="home-page--done">
        <p>Done</p>
        {loading ? (
          <Loader />
        ) : (
          <Tasks
            fetchTodos={fetchTodos}
            setLoading={setLoading}
            back="review"
            data={todos.done}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
