import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import firebase from './config/index.js'
import axios from 'axios'
import('./assets/style.css')

Vue.prototype.$liff = window.liff
Vue.config.productionTip = false
axios.defaults.baseURL = 'https://us-central1-siamproject-dbffa.cloudfunctions.net/api'
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  firebase,
  render: h => h(App)
}).$mount('#app')
