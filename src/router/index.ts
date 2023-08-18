import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/game1',
      name: 'game1',
      component: () => import('@/views/Game1View.vue')
    },
    // {
    //   path: '/fesfs',
    //   name: 'home',
    //   component: HomeView
    // },

    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
