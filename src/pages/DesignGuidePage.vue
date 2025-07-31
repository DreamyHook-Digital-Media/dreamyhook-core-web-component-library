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
        Design Guide
      </h1>

      <!-- Typography Section -->
      <section class="mt-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Typography</h2>
        <div class="mt-6 space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Display</p>
            <p class="text-5xl font-bold">The quick brown fox</p>
          </div>
          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Heading 1</p>
            <h1 class="text-4xl font-bold">The quick brown fox</h1>
          </div>
          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Heading 2</p>
            <h2 class="text-3xl font-semibold">The quick brown fox</h2>
          </div>
          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Heading 3</p>
            <h3 class="text-2xl font-semibold">The quick brown fox</h3>
          </div>
          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Body</p>
            <p class="text-base">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Small</p>
            <p class="text-sm">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Caption</p>
            <p class="text-xs">The quick brown fox jumps over the lazy dog</p>
          </div>
        </div>
      </section>

      <!-- Color Palette Section -->
      <section class="mt-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Color Palette</h2>
        
        <!-- Brand Colors -->
        <div class="mt-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Brand Colors</h3>
          <div class="mt-4 grid grid-cols-3 gap-4">
            <div class="space-y-2">
              <div class="h-24 rounded-lg bg-primary"></div>
              <p class="text-sm font-medium">Primary</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">#6366f1</p>
            </div>
            <div class="space-y-2">
              <div class="h-24 rounded-lg bg-secondary"></div>
              <p class="text-sm font-medium">Secondary</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">#f59e0b</p>
            </div>
            <div class="space-y-2">
              <div class="h-24 rounded-lg bg-accent"></div>
              <p class="text-sm font-medium">Accent</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">#10b981</p>
            </div>
          </div>
        </div>

        <!-- Neutral Colors -->
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Neutral Colors</h3>
          <div class="mt-4 grid grid-cols-5 gap-4 sm:grid-cols-10">
            <div v-for="i in 10" :key="i" class="space-y-2">
              <div :class="`h-16 rounded-lg bg-gray-${i * 100 - 100}`"></div>
              <p class="text-xs font-medium">{{ i * 100 - 100 }}</p>
            </div>
          </div>
        </div>

        <!-- Semantic Colors -->
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Semantic Colors</h3>
          <div class="mt-4 grid grid-cols-4 gap-4">
            <div class="space-y-2">
              <div class="h-24 rounded-lg bg-green-500"></div>
              <p class="text-sm font-medium">Success</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">#10b981</p>
            </div>
            <div class="space-y-2">
              <div class="h-24 rounded-lg bg-amber-500"></div>
              <p class="text-sm font-medium">Warning</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">#f59e0b</p>
            </div>
            <div class="space-y-2">
              <div class="h-24 rounded-lg bg-red-500"></div>
              <p class="text-sm font-medium">Error</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">#ef4444</p>
            </div>
            <div class="space-y-2">
              <div class="h-24 rounded-lg bg-blue-500"></div>
              <p class="text-sm font-medium">Info</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">#3b82f6</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Spacing Section -->
      <section class="mt-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Spacing</h2>
        <div class="mt-6 space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div v-for="space in [1, 2, 3, 4, 6, 8, 12, 16]" :key="space" class="flex items-center gap-4">
            <p class="w-16 text-sm font-medium">{{ space }}</p>
            <div :class="`h-4 bg-primary`" :style="`width: ${space * 4}px`"></div>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ space * 4 }}px</p>
          </div>
        </div>
      </section>

      <!-- Shadows Section -->
      <section class="mt-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Shadows</h2>
        <div class="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div v-for="shadow in ['sm', '', 'md', 'lg', 'xl', '2xl']" :key="shadow">
            <div :class="`rounded-lg bg-white p-6 shadow${shadow ? '-' + shadow : ''} dark:bg-gray-800`">
              <p class="text-sm font-medium">shadow{{ shadow ? '-' + shadow : '' }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Border Radius Section -->
      <section class="mt-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Border Radius</h2>
        <div class="mt-6 grid grid-cols-3 gap-6 lg:grid-cols-6">
          <div v-for="radius in ['', 'md', 'lg', 'xl', '2xl', 'full']" :key="radius" class="text-center">
            <div :class="`mx-auto h-20 w-20 bg-primary rounded${radius ? '-' + radius : ''}`"></div>
            <p class="mt-2 text-sm">rounded{{ radius ? '-' + radius : '' }}</p>
          </div>
        </div>
      </section>

      <div class="mt-12 flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>