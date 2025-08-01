<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-4 py-12">
      <router-link
        to="/"
        class="mb-8 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        ← Back to Home
      </router-link>

      <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Component Examples
      </h1>
      <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Interactive examples showcasing component usage and patterns
      </p>

      <div class="mt-12 space-y-12">
        <!-- Navigation Tabs -->
        <div class="border-b border-gray-200 dark:border-gray-700">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
          <component :is="activeComponent" />
        </div>
      </div>

      <div class="mt-12 flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import ButtonExamples from '@/examples/ButtonExamples.vue'
import FormExamples from '@/examples/FormExamples.vue'
import FormControlsExamples from '@/examples/FormControlsExamples.vue'
import ProfileSettingsExample from '@/examples/ProfileSettingsExample.vue'

const tabs = [
  { id: 'buttons', name: 'Buttons', component: ButtonExamples },
  { id: 'forms', name: 'Forms & Inputs', component: FormExamples },
  { id: 'form-controls', name: 'Form Controls', component: FormControlsExamples },
  { id: 'profile', name: 'Profile Form', component: ProfileSettingsExample }
]

const activeTab = ref('buttons')

const activeComponent = computed(() => {
  const tab = tabs.find(t => t.id === activeTab.value)
  return tab?.component || ButtonExamples
})
</script>