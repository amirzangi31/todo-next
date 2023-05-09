import React from 'react'
import { RiMastodonLine } from 'react-icons/ri'
import { BiRightArrow, BiLeftArrow, BiEdit } from 'react-icons/bi'
import Link from 'next/link'
import { shorthen } from '@/services/functions'


function Tasks({ data, back, next, fetchTodos, setLoading }) {
    const changeStatus = async (id, status) => {
        setLoading(true)
        const res = await fetch('/api/todos', {
            method: 'PATCH',
            body: JSON.stringify({ id, status }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await res.json()
        if (data.status === "success") {
            setLoading(false)
            fetchTodos()
        }
    }


    return (
        <div className='tasks'>
            {data?.map(i => (
                <div key={i._id} className='tasks__card'>

                    <div className='flex justify-between items-center'>
                        <span className={i.status}></span>
                        <Link href={`/todo/edit/${i._id}`} >
                            <BiEdit />
                        </Link>

                    </div>

                    <RiMastodonLine />
                    <h4 className='max-w-full overflow-hidden'>{shorthen(i.title, 40)}{i.description.length > 40 && "..."}</h4>
                    <div className='des'>{shorthen(i.description, 40)}{i.description.length > 40 && "..."}</div>
                    <div>
                        {back ? (<button className='button-back' onClick={() => changeStatus(i._id, back)}>
                            <BiLeftArrow />
                            Back
                        </button>) : null}


                        <Link href={`/todo/${i._id}`}>
                            <button >Details</button>
                        </Link>

                        {next ? (<button className='button-next' onClick={() => changeStatus(i._id, next)}>
                            Next
                            <BiRightArrow />
                        </button>) : null}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tasks;