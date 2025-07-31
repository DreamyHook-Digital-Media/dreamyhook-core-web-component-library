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

      <div class="mt-12">
        <div class="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p class="text-gray-600 dark:text-gray-400">
            Component examples will be added as components are built throughout the development phases.
          </p>
          <p class="mt-4 text-sm text-gray-500 dark:text-gray-500">
            Check back soon for Button, Input, Card, Modal, and more examples!
          </p>
        </div>
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