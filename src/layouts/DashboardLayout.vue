<template>
  <AuthenticatedLayout
    :app-name="appName"
    :user="user"
    :sidebar-items="sidebarItems"
    :breadcrumbs="breadcrumbs"
  >
    <template #header-actions>
      <slot name="header-actions" />
    </template>

    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ pageTitle }}
          </h1>
          <p v-if="pageDescription" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ pageDescription }}
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <slot name="page-actions" />
        </div>
      </div>
    </template>

    <!-- Main dashboard content -->
    <div class="space-y-6">
      <!-- Stats/KPI section -->
      <div v-if="$slots.stats" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <slot name="stats" />
      </div>

      <!-- Charts section -->
      <div v-if="$slots.charts" class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <slot name="charts" />
      </div>

      <!-- Tabbed content -->
      <div v-if="tabs && tabs.length > 0">
        <Tabs
          v-model="activeTab"
          :items="tabs"
          variant="underline"
          @change="handleTabChange"
        >
          <template v-for="tab in tabs" :key="tab.id" #[tab.id]>
            <div class="mt-6">
              <slot :name="`tab-${tab.id}`" :tab="tab" />
            </div>
          </template>
        </Tabs>
      </div>

      <!-- Main content area -->
      <div v-if="!tabs || tabs.length === 0">
        <slot />
      </div>

      <!-- Side panels -->
      <div v-if="$slots.sidebar" class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <slot name="main-content" />
        </div>
        <div class="lg:col-span-1">
          <slot name="sidebar" />
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthenticatedLayout from './AuthenticatedLayout.vue'
import { Tabs } from '@/components'
import type { NavItem, BreadcrumbItem, TabItem } from '@/types/navigation.types'

interface User {
  name: string
  email: string
  avatar?: string
  initials?: string
}

interface DashboardLayoutProps {
  appName?: string
  user?: User
  sidebarItems?: NavItem[]
  breadcrumbs?: BreadcrumbItem[]
  pageTitle: string
  pageDescription?: string
  tabs?: TabItem[]
}

const props = withDefaults(defineProps<DashboardLayoutProps>(), {
  appName: 'Dashboard',
  sidebarItems: () => [],
  user: () => ({
    name: 'John Doe',
    email: 'john@example.com',
    initials: 'JD'
  })
})

const emit = defineEmits<{
  'tab-change': [activeTab: string, previousTab: string | null]
}>()

const activeTab = ref(props.tabs?.[0]?.id || '')

const handleTabChange = (newTab: string, previousTab: string | null) => {
  emit('tab-change', newTab, previousTab)
}
</script>