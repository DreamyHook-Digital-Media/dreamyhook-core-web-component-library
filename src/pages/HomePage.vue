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

      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

        <router-link
          to="/playground"
          class="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="absolute top-4 right-4">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Interactive
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Playground</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Interactive component editor with live preview
          </p>
          <span class="absolute bottom-4 right-4 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600">
            →
          </span>
        </router-link>

        <router-link
          to="/landing-examples"
          class="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Landing Pages</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Complete landing page examples and templates
          </p>
          <span class="absolute bottom-4 right-4 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600">
            →
          </span>
        </router-link>
      </div>
      
      <!-- Documentation and Links -->
      <div class="mt-12 grid gap-6 md:grid-cols-2">
        <a
          href="https://github.com/dreamyhook/core-web-component-library"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Documentation</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Full API documentation and installation guides
          </p>
          <span class="absolute bottom-4 right-4 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600">
            ↗
          </span>
        </a>
        
        <a
          href="https://github.com/dreamyhook/core-web-component-library/releases"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Releases</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Version history, changelogs, and downloads
          </p>
          <span class="absolute bottom-4 right-4 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600">
            ↗
          </span>
        </a>
      </div>
      
      <!-- Real-World Examples Section -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Real-World Examples
        </h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <router-link
            to="/advanced-forms"
            class="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <h4 class="font-medium text-gray-900 dark:text-white">Advanced Forms</h4>
            <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Multi-step, dynamic, validation
            </p>
            <span class="absolute bottom-2 right-2 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600 text-sm">
              →
            </span>
          </router-link>

          <router-link
            to="/dashboard-examples"
            class="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <h4 class="font-medium text-gray-900 dark:text-white">Dashboards</h4>
            <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Analytics, charts, real-time data
            </p>
            <span class="absolute bottom-2 right-2 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600 text-sm">
              →
            </span>
          </router-link>

          <router-link
            to="/ecommerce"
            class="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <h4 class="font-medium text-gray-900 dark:text-white">E-commerce</h4>
            <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Products, cart, checkout flow
            </p>
            <span class="absolute bottom-2 right-2 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600 text-sm">
              →
            </span>
          </router-link>

          <router-link
            to="/admin-panel"
            class="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <h4 class="font-medium text-gray-900 dark:text-white">Admin Panel</h4>
            <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
              User management, system monitoring
            </p>
            <span class="absolute bottom-2 right-2 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600 text-sm">
              →
            </span>
          </router-link>

          <router-link
            to="/theme-showcase"
            class="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div class="absolute top-2 right-2">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
            <h4 class="font-medium text-gray-900 dark:text-white">Themes</h4>
            <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Color themes, customization
            </p>
            <span class="absolute bottom-2 right-2 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-600 text-sm">
              →
            </span>
          </router-link>
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