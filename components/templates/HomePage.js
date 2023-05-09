import React, { useEffect, useState } from "react";
import Tasks from "../modules/Tasks";
import Loader from "../modules/Loader";


function HomePage() {

  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState({});



  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    if (data.status === "success") {
      setLoading(false)
      setTodos(data.data.todos);
    }
  };



  if (loading && Object.keys(todos).length === 0) return (
    <div className="min-h-[calc(100vh-180px)] flex justify-center items-center">
      <p className="font-bold text-2xl md:text-3xl text-red-400">Loading ....</p>
    </div>
  )


  if (Object.keys(todos).length === 0) return (
    <div className="min-h-[calc(100vh-180px)] flex justify-center items-center">
      <p className="font-bold text-2xl md:text-3xl text-red-400">Todos container is empty.....</p>
    </div>
  )


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
