
const initialState = {
    loading: false,
    todos: [],
    error: ""
}



const todosReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "FETCH_TODOS_REQUEST": {
            return {
                ...state,
                loading: true
            }
        }
        case "FETCH_TODOS_SUCCESS": {
            return {
                todos: payload,
                loading: false
            }
        }
        case "FETCH_TODOS_FAILURE": {
            return {
                loading: false,
                error: payload
            }
        }

        default:
            return state

    }


}

export default todosReducer