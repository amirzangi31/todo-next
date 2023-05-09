import EditPage from '@/components/templates/EditPage'
import React, { useEffect, useState } from 'react'

//ROUTER
import { useRouter } from 'next/router'


function Edit() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [todo, setTodo] = useState({})
  const fetchTodo = async () => {
    setLoading(true)
    const res = await fetch(`/api/todo/${router.query.todo}`)
    const data = await res.json()
    setTodo(data.data)
    setLoading(false)
  }

  useEffect(() => {
    if (router.isReady) {
      fetchTodo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])



  if (loading) return <h1>loading...</h1>
  return <EditPage todo={todo} />

}

export default Edit