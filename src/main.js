import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import 'jquery'
import 'popper.js'
import 'bootstrap'
import store from './vuex/store'
import './assets/styles/main.sass'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
