const sortTodos = todos => {
    const sortedData = {}

    todos.map(todo => {
        if (!sortedData[todo.status]) sortedData[todo.status] = []

        sortedData[todo.status].push(todo)
    })

    return sortedData

}


const todoOne = (todos, id) => {
    const result = todos.filter(item => item._id === id)
    return result
}



export { sortTodos, todoOne }