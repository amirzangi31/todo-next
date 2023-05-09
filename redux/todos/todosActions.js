const fetchTodosRequest = () => {
    return {
        type: "FETCH_TODOS_REQUEST"
    }
}
const fetchTodosSuccess = todos => {
    return {
        type: "FETCH_TODOS_SUCCESS",
        payload: todos
    }
}
const fetchTodosFailure = error => {
    return {
        type: "FETCH_TODOS_FAILURE",
        payload: error
    }
}


const fetchTodosRedux = () => {
    return (dispatch) => {
        dispatch(fetchTodosRequest())
        fetch('http://localhost:3000/api/todo/todos')
            .then(res => res.json())
            .then(data => dispatch(fetchTodosSuccess(data.data)))
            .catch(err => dispatch(fetchTodosFailure(err)))
    }
}
export default fetchTodosRedux;