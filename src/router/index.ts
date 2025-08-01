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
  },
  {
    path: '/advanced-forms',
    name: 'advanced-forms',
    component: () => import('@/pages/AdvancedFormsPage.vue')
  },
  {
    path: '/dashboard-examples',
    name: 'dashboard-examples',
    component: () => import('@/pages/DashboardExamplesPage.vue')
  },
  {
    path: '/ecommerce',
    name: 'ecommerce',
    component: () => import('@/pages/EcommercePage.vue')
  },
  {
    path: '/admin-panel',
    name: 'admin-panel',
    component: () => import('@/pages/AdminPanelPage.vue')
  },
  {
    path: '/landing-examples',
    name: 'landing-examples',
    component: () => import('@/pages/LandingPageExamples.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router