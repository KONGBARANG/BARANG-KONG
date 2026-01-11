import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Hello from "../components/Hello.vue"
import Admin from "../views/Admin.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/component",
    name: "Component",
    component: Hello
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
