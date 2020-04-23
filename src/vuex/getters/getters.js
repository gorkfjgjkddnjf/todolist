export default {
    USERS(state){
        return state.users
    },
    ERRORS(state){
        return state.errors
    },
    TODO_LIST(state){
        return state.todoList
    },
    IS_LOGGED: state => !!state.token 
}