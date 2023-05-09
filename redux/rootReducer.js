import { combineReducers } from "redux";
import todosReducer from "./todos/todosReducer";




const rootReducer = combineReducers({
    todosState : todosReducer
})


export default rootReducer;