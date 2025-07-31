<template>
  <button
    @click="themeStore.toggleTheme"
    class="rounded-lg border border-gray-300 bg-white p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
    :aria-label="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <SunIcon v-if="themeStore.isDark" class="h-5 w-5" />
    <MoonIcon v-else class="h-5 w-5" />
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useThemeStore } from '@/store/useThemeStore'

const themeStore = useThemeStore()
</script>