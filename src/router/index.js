import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import NewSpot from '@/views/NewSpot.vue'
import NotFound from '@/views/NotFound.vue'
import Router from 'vue-router'
import SpotList from '@/views/SpotList.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import PasswordRecover from '@/views/PasswordRecover.vue'
import UserSettings from '@/views/UserSettings.vue'
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
  },
  {
    component: Dashboard,
    children: [
      {
        component: SpotList,
        name: 'spots',
        path: 'spots'
      },
      {
        component: NewSpot,
        name: 'new-spot',
        path: 'new-spot'
      },
      {
        component: UserSettings,
        name: 'settings',
        path: 'settings'
      }
    ],
    name: 'dashboard',
    path: '/dashboard'
  },
  {
    component: NotFound,
    path: '*'
  }
]

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})
