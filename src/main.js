import App from '@/App.vue'
import router from '@/router'
import Toast, { POSITION } from 'vue-toastification'
import store from '@/store'
import Vue from 'vue'
import 'vue-toastification/dist/index.css'

Vue.config.productionTip = false
Vue.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 2000
})

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount('#app')
