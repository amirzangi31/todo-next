import React from 'react'
import { RiMastodonLine } from 'react-icons/ri'
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi'


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
                    <span className={i.status}></span>
                    <RiMastodonLine />
                    <h4>{i.title}</h4>
                    <div>
                        {back ? (<button className='button-back' onClick={() => changeStatus(i._id, back)}>
                            <BiLeftArrow />
                            Back
                        </button>) : null}
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