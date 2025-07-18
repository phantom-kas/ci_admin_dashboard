import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/auth/index.vue'
import authRoutes from './auth/index'
import authenticationRoutes from './authentications/index'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authenticationRoutes,
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children:[
        ...authRoutes
      ]
    }
  ],
})

export default router
