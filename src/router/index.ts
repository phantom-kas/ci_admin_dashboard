import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authenticationRoutes from './authentications/index'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authenticationRoutes,
    {
      path: '/',
      name: 'home',
      component: HomeView,
    }
  ],
})

export default router
