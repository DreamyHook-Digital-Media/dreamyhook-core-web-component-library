<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <Sidebar
      :items="sidebarItems"
      :collapsed="sidebarCollapsed"
      :overlay="isMobile"
      @close="closeSidebar"
      @toggle="toggleSidebar"
    >
      <template #header>
        <div class="flex items-center space-x-3">
          <div class="h-8 w-8 rounded bg-primary"></div>
          <span v-if="!sidebarCollapsed" class="text-xl font-bold text-gray-900 dark:text-white">
            {{ appName }}
          </span>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center space-x-3">
          <Avatar
            :src="user?.avatar"
            :initials="user?.initials"
            size="sm"
          />
          <div v-if="!sidebarCollapsed" class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
              {{ user?.name }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
              {{ user?.email }}
            </p>
          </div>
        </div>
      </template>
    </Sidebar>

    <!-- Main content area -->
    <div :class="mainContentClasses">
      <!-- Top navigation -->
      <header class="bg-white shadow-sm dark:bg-gray-800">
        <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div class="flex items-center space-x-4">
            <!-- Mobile sidebar toggle -->
            <button
              v-if="isMobile"
              type="button"
              class="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:hover:bg-gray-700"
              @click="openSidebar"
            >
              <span class="sr-only">Open sidebar</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Breadcrumbs -->
            <Breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" />
          </div>

          <!-- Header actions -->
          <div class="flex items-center space-x-4">
            <slot name="header-actions">
              <!-- Notifications -->
              <button
                type="button"
                class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-gray-800"
              >
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>

              <!-- Theme toggle -->
              <ThemeToggle />

              <!-- User menu -->
              <div class="relative">
                <button
                  type="button"
                  class="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-gray-800"
                  @click="toggleUserMenu"
                >
                  <span class="sr-only">Open user menu</span>
                  <Avatar
                    :src="user?.avatar"
                    :initials="user?.initials"
                    size="sm"
                  />
                </button>
                <!-- User menu dropdown would go here -->
              </div>
            </slot>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1">
        <div class="py-6">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Page header -->
            <div v-if="$slots.header" class="mb-8">
              <slot name="header" />
            </div>

            <!-- Main content -->
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Bars3Icon, BellIcon } from '@heroicons/vue/24/outline'
import {
  Avatar,
  Breadcrumbs,
  Sidebar,
  ThemeToggle
} from '@/components'
import type { NavItem, BreadcrumbItem } from '@/types/navigation.types'

interface User {
  name: string
  email: string
  avatar?: string
  initials?: string
}

interface AuthenticatedLayoutProps {
  appName?: string
  user?: User
  sidebarItems?: NavItem[]
  breadcrumbs?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<AuthenticatedLayoutProps>(), {
  appName: 'App',
  sidebarItems: () => [],
  user: () => ({
    name: 'John Doe',
    email: 'john@example.com',
    initials: 'JD'
  })
})

const sidebarCollapsed = ref(false)
const sidebarOpen = ref(false)
const userMenuOpen = ref(false)
const windowWidth = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value < 1024)

const mainContentClasses = computed(() => {
  if (isMobile.value) {
    return 'flex flex-1 flex-col'
  }
  
  const marginLeft = sidebarCollapsed.value ? 'ml-16' : 'ml-64'
  return `flex flex-1 flex-col ${marginLeft} transition-all duration-300`
})

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const openSidebar = () => {
  sidebarOpen.value = true
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>