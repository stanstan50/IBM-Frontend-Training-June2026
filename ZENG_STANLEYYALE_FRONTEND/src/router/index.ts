import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/task1',
      name: 'task1',
      // lazy-loaded: this chunk only downloads when the route is visited
      component: () => import('../views/Task1.vue'),
    },
    {
      path: '/task2',
      name: 'task2',
      // lazy-loaded: this chunk only downloads when the route is visited
      component: () => import('../views/Task2.vue'),
    },
  ],
})

export default router