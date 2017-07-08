import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import VueDraggableResizable from 'vue-draggable-resizable'
import VueSocketio from 'vue-socket.io'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.use(VueSocketio, 'http://localhost:8081')

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
