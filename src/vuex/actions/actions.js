import axios from 'axios'

export default {
    LOGIN_USER({commit}, user){
        return new Promise((resolve, reject) => {
            axios('http://www.host1813334.hostland.pro/public/api/login',{
                method: 'POST', data: user
            })
            .then((resp) => {
                if(resp.data.success){
              
                    const token = resp.data.api_token
                    localStorage.setItem('token', token)  

                    if(token){
                        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                    }

                    commit('SET_USER', token)
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
                commit('SET_TODO_LIST', resp.data)
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
    }
}