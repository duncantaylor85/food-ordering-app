import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from "../views/login.vue"
import SecureComponent from "../views/secure.vue"
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent
  },
  {
    path: "/secure",
    name: "secure",
    component: SecureComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
