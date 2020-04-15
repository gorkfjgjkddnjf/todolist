import Vue from 'vue'
import Router from 'vue-router'

import tMainBlockWrapper from '../components/t-main-block/t-main-block-wrapper'
import tLogin from '../components/t-sign/t-login'
import tSignUp from '../components/t-sign/t-sign-up'
import tForgotPass from '../components/t-sign/t-forgot-pass/t-forgot-pass'


Vue.use(Router);

let router = new Router({
    routes:[
        {
            path:'/',
            name: 'main',
            component: tMainBlockWrapper
        },
        {
            path: '/login',
            name: 'login',
            component: tLogin,
        },
        {
            path: '/sign-up',
            name: 'sign-up',
            component: tSignUp,
        },
        {
            path: '/login/forgot-pass',
            name: 'forgot-pass',
            component: tForgotPass,
        },   
    ]
})

export default router