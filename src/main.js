import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.config.productionTip = false
// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDaGX_xuvvh0LeqNNLcWgmWmYitr0XwN3Q',
  authDomain: 'anitreasure.tk',
  databaseURL: 'https://anitreasure-fa2ca.firebaseio.com',
  projectId: 'anitreasure-fa2ca',
  storageBucket: 'anitreasure-fa2ca.appspot.com',
  messagingSenderId: '1066091742753'
}
firebase.initializeApp(config)
Object.defineProperty(Vue.prototype, '$firebase', { value: firebase })

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
window.vueApp = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
