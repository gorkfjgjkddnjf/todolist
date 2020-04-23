export default {
    SET_USER: (state, token) =>{
        state.token = token
    },
    ADD_USER:(state, user) =>{
        state.newUser = user
    },
    GET_ERRORS:(state, errors) => {
        state.errors = errors
    },
    LOGOUT:(state) => {
        state.token = ''
    },
    SET_TODO_LIST:(state, todoList) =>{
        state.todoList = todoList
    },
    DELETE_TODO_LIST:(state, index) => {
        state.todoList.splice(index,1)
    }
}