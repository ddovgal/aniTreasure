import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$firebase', { value: firebase })

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
window.vueApp = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
