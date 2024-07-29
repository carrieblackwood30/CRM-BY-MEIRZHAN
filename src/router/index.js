import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import finishedDeals from '@/views/finishedDeals.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/finishedDeals',
      name: "finished deals",
      component: finishedDeals
    }
  ]
})

export default router
