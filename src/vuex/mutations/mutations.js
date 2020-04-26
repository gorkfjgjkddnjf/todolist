export default {
    SET_TOKEN: (state, token) =>{
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
        todoList.forEach(element => {
            element.tasks.reverse()
        });
        state.todoList = todoList
    },
    DELETE_TODO_LIST:(state, index) => {
        state.todoList.splice(index,1)
    },
    GET_USERS:(state, users) =>{
        state.users = users
    },
    CREATE_TASK:(state, task) =>{
        state.todoList.push(task)
    },
    CREATE_SUB_TASK:(state, subtask) =>{
        let index = subtask.list_index
        state.todoList[index].tasks.unshift(subtask)
    }
}