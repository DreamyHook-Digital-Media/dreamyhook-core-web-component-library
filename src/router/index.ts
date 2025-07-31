import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/design-guide',
    name: 'design-guide',
    component: () => import('@/pages/DesignGuidePage.vue')
  },
  {
    path: '/examples',
    name: 'examples',
    component: () => import('@/pages/ExamplesPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router