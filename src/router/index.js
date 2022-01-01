import Vue from "vue"
import VueRouter from "vue-router"
import homepage from "@/views/homepage.vue"
import login from "@/views/login.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "homepage",
    component: homepage,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  }

]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
