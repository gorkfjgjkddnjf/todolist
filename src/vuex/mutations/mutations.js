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
        let editDes = false
        todoList.forEach(element => {
            element.tasks.reverse()
            element.des = editDes
            element.created_at = element.created_at.substr(0,16)
            element.tasks.forEach(item => {
                item.created_at = item.created_at.substr(0,16)
            });
  
        });
        state.todoList = todoList
    },
    DELETE_TODO_LIST:(state, index) => {
        state.todoList.splice(index,1)
    },
    DELETE_FROM_TODO:(state, index) =>{
        state.todoList[index.listIndex].tasks.splice(index.index,1)
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
    },
    DELETE_ERRORS:(state) =>{
        state.errors = null
    }
}