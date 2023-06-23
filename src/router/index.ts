import { createRouter, createWebHistory } from "vue-router"
// @ts-ignore
import HomeView from "@/views/HomeView.vue"
// @ts-ignore
import AboutView from "@/views/AboutView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue")
    }
  ]
})

export default router
