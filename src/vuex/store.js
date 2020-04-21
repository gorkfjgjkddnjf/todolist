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
        return axios('http://www.host1813334.hostland.pro/public/api/login',{
            method: 'POST', data: user
        })
        .then((resp) => {
            if(resp.data.success){
                const token = resp.data.api_token
                localStorage.setItem('token', token)
                console.log(token)
                commit('SET_USER', token)
            }
            else{
                commit('GET_ERRORS', resp.data[0])
          }
        })
        .catch((error) => {
            localStorage.removeItem('token')
            console.log(error);
            return error
        })
      },
      REGISTER_USER({commit}, user){
        return axios('http://www.host1813334.hostland.pro/public/api/user',{
          method: 'POST', data: user
        })
        .then((resp) => {
            if(resp.data.success){
                const user = resp.data.user
                commit('ADD_USER', user)
            }
            else{
                commit('GET_ERRORS', resp.data[0])
            }
        })
        .catch((error) => {
          console.log(error);
          return error
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