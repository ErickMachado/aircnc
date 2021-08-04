import Login from '@/views/Login.vue'
import Router from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import PasswordRecover from '@/views/PasswordRecover.vue'
import Vue from 'vue'

Vue.use(Router)

const routes = [
  {
    component: Login,
    children: [
      {
        component: SignIn,
        path: 'signin'
      },
      {
        component: SignUp,
        path: 'signup'
      },
      {
        component: PasswordRecover,
        path: 'recover'
      }
    ],
    path: '/',
    redirect: '/signin'
  }
]

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})
