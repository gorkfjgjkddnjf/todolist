import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
      token: null,
      newUser: null,
      errors: null
    },
    mutations: {
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
      }
     
    },
    actions: {
      LOGIN_USER({commit}, user){
        return new Promise((resolve, reject) => {
          axios('http://www.host1813334.hostland.pro/public/api/login',{
            method: 'POST', data: user
          })
          .then((resp) => {
            if(resp.data.success){
              const token = resp.data.api_token
              localStorage.setItem('token', token)
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
      }
    
      
    },
    getters: {
      USERS(state){
        return state.users
      },
      ERRORS(state){
        return state.errors
      },
      IS_LOGGED: state => !!state.token
      
    }
});
  
  
export default store;