import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function TodoDetailsPage() {
  const [todo, setTodo] = useState(null)
  const router = useRouter()
  const fetchTodos = async () => {
    const res = await fetch(`/api/todo/${router.query.todo}`)
    const data = await res.json()
    setTodo(data.data)
  }

  useEffect(() => {
    fetchTodos()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const deleteHandler = async () => {
    const id = router.query.todo
    const res = await fetch(`/api/todo/${id}`, { method: "DELETE" })
    const data = await res.json()
    if (data.status === "success") router.replace("/")
  }

  return (
    <div className="p-4 w-[calc(100vw-280px)] min-h-[calc(100vh-180px)] bg-white shadow-lg rounded-lg ">
      <p className="text-center">{todo?.title}</p>
      <div className="mt-10 bg-green-300  p-2 rounded-lg shadow-lg text-white">
        {todo?.description}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Link href={`/todo/edit/${router.query.todo}`} >
          <button >Edit</button>
        </Link>
        <button className="bg-red-300 text-white" onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}

export default TodoDetailsPage;

