// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Hynme from '@/views/Hynme.vue' // Importez le composant Hynme

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/hynme',
    name: 'Hynme',
    component: Hynme // Associez le composant Hynme ici
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
