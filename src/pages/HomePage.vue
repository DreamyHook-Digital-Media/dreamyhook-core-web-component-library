<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-4 py-12">
      <div class="text-center">
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          DreamyHook Core
        </h1>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Web Component Library
        </p>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <router-link
          to="/design-guide"
          class="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Design Guide</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Typography, colors, spacing, and design principles
          </p>
          <span class="absolute bottom-4 right-4 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600">
            →
          </span>
        </router-link>

        <router-link
          to="/examples"
          class="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Examples</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Component examples and usage patterns
          </p>
          <span class="absolute bottom-4 right-4 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600">
            →
          </span>
        </router-link>

        <a
          href="https://github.com/dreamyhook/core-web-component-library"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Documentation</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Full API documentation and guides
          </p>
          <span class="absolute bottom-4 right-4 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600">
            ↗
          </span>
        </a>
      </div>

      <div class="mt-12 flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>