import axios from 'axios'

export default {
    LOGIN_USER({commit}, user){
        return new Promise((resolve, reject) => {
            axios('http://www.host1813334.hostland.pro/public/api/login',{
                method: 'POST', data: user
            })
            .then((resp) => {
                console.log(resp.data)
                if(resp.data.success){
              
                    let token = resp.data.api_token
                    localStorage.setItem('token', token)  
                    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
      
                    commit('SET_TOKEN', token)
                    resolve(resp)
                }
                else{
                    commit('GET_ERRORS', resp.data)
                }
            })
            .catch((error) => {
                localStorage.removeItem('token')
                reject(error)
            })
        })
    },
    REGISTER_USER({commit}, user){
        return new Promise((resolve, reject) => {
            axios('http://www.host1813334.hostland.pro/public/api/user',{
                method: 'POST', data: user
            })
            .then((resp) => {
                if(resp.data.success){
                    const user = resp.data.user
                    commit('ADD_USER', user)
                    resolve(resp)
                }
                else{
                    commit('GET_ERRORS', resp.data[0])
                }
            })
            .catch((error) => {
                reject(error)
            })
        })
    },
    LOGOUT({commit}){
        commit('LOGOUT')
        localStorage.removeItem('token')
    },
    GET_TODO_LIST({commit}){
        return new Promise((resolve, reject) => {
            axios('http://www.host1813334.hostland.pro/public/api/list', {
                method: 'GET'
            })        
            .then((resp) => {
                commit('SET_TODO_LIST', resp.data[0])
                resolve(resp)
            })
            .catch((error) => {
                reject(error)
            })
        })
    },
    DELETE_TODO_LIST({commit}, list_id){
        return new Promise((resolve, reject) => {
            axios(`http://www.host1813334.hostland.pro/public/api/list/ ${list_id}`, {
                method: 'DELETE'
            })        
            .then((resp) => {
                commit('')
                resolve(resp)
            })
            .catch((error) => {
                reject(error)
            })
        })        
    },
    DELETE_FROM_STATE({commit}, index){
        commit('DELETE_TODO_LIST', index)
    },
    DELETE_FROM_TODO({commit}, index){
        commit('DELETE_FROM_TODO', index)
    },
    GET_USERS({commit}){
        return axios('http://www.host1813334.hostland.pro/public/api/user',{
            method: "GET"
        })
        .then((users) =>{
            commit('GET_USERS', users.data)
        })
    },
    CREATE_TASK({commit}, task){
        return new Promise((resolve, reject) => {
            axios(`http://www.host1813334.hostland.pro/public/api/list`, {
                method: 'POST', data: task
            })        
            .then((resp) => {
                console.log(resp.data)
                if(resp.data.success){
                    commit('CREATE_TASK', task)
                    resolve(resp)
                }
                else{
                    commit('GET_ERRORS', resp.data[0])
                    //reject(resp.data)
                }
            })
            .catch((error) => {
                reject(error)
            })
        })     
    },
    CREATE_SUB_TASK({commit}, subtask){
        return new Promise((resolve, reject) => {
            axios(`http://www.host1813334.hostland.pro/public/api/task`, {
                method: 'POST', data: subtask
            })        
            .then((resp) => {
                console.log(resp.data)
                if(resp.data.success){
                    commit('CREATE_SUB_TASK', subtask)
                    resolve(resp)
                }
                else{
                    commit('GET_ERRORS', resp.data[0])
                    //reject(resp.data)
                }
            })
            .catch((error) => {
                reject(error)
            })
        })     
    },
    CHECK_SUBTASK({commit}, task_id){
        return new Promise((resolve, reject) => {
            axios(`http://www.host1813334.hostland.pro/public/api/task/ ${task_id}`, {
                method: 'PUT'
            })        
            .then((resp) => {
                commit('')
                resolve(resp)
            })
            .catch((error) => {
                reject(error)
            })
        })  
    },
    DELETE_SUBTASK({commit}, task_id){
        return new Promise((resolve, reject) => {
            axios(`http://www.host1813334.hostland.pro/public/api/task/ ${task_id}`, {
                method: 'DELETE'
            })        
            .then((resp) => {
                commit('')
                resolve(resp)
            })
            .catch((error) => {
                reject(error)
            })
        })        
    },
    EDIT_TODO({commit}, todo){
        return new Promise((resolve, reject) => {
            axios('http://www.host1813334.hostland.pro/public/api/list/update',{
                method: 'POST', data: todo
            })
            .then((resp) => {
                if(resp.data.success){
                    resolve(resp)
                }
                else{
                    commit('GET_ERRORS', resp.data[0])
                }
            })
            .catch((error) => {
                reject(error)
            })
        })
    },
    EDIT_TASK({commit}, task){
        return new Promise((resolve, reject) => {
            axios('http://www.host1813334.hostland.pro/public/api/task/update',{
                method: 'POST', data: task
            })
            .then((resp) => {
                if(resp.data.success){
                    resolve(resp)
                }
                else{
                    commit('GET_ERRORS', resp.data[0])
                }
            })
            .catch((error) => {
                reject(error)
            })
        })
    },
    DELETE_ERRORS({commit}){
        commit('DELETE_ERRORS')
    }
}