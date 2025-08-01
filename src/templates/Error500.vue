<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div class="max-w-max mx-auto">
      <main class="sm:flex">
        <!-- Error illustration -->
        <div class="flex-shrink-0">
          <div class="mx-auto h-48 w-48 sm:h-64 sm:w-64">
            <slot name="illustration">
              <!-- Default 500 illustration placeholder -->
              <div class="h-full w-full rounded-lg bg-gradient-to-br from-red-100 to-orange-200 dark:from-red-900 dark:to-orange-800 flex items-center justify-center">
                <div class="text-center">
                  <h1 class="text-6xl sm:text-8xl font-bold text-red-600 dark:text-red-300">
                    500
                  </h1>
                </div>
              </div>
            </slot>
          </div>
        </div>

        <!-- Error content -->
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 sm:pl-6 dark:sm:border-gray-700">
            <h1 class="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl dark:text-white">
              {{ title }}
            </h1>
            <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
              {{ message }}
            </p>
            
            <!-- Error details -->
            <div v-if="showErrorId && errorId" class="mt-4">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Error ID: <code class="font-mono text-xs">{{ errorId }}</code>
              </p>
            </div>

            <!-- Additional content -->
            <div v-if="$slots.default" class="mt-6">
              <slot />
            </div>
          </div>
          
          <!-- Actions -->
          <div class="mt-8 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <Button
              variant="primary"
              @click="refresh"
            >
              {{ refreshButtonText }}
            </Button>
            
            <Button
              :href="homeUrl"
              variant="outline"
            >
              {{ homeButtonText }}
            </Button>
            
            <!-- Custom actions -->
            <div v-if="$slots.actions">
              <slot name="actions" />
            </div>
          </div>

          <!-- Suggestions -->
          <div v-if="suggestions && suggestions.length > 0" class="mt-8 sm:border-l sm:border-transparent sm:pl-6">
            <p class="text-sm font-medium text-gray-900 dark:text-white mb-3">
              {{ suggestionsTitle }}
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li v-for="suggestion in suggestions" :key="suggestion">
                {{ suggestion }}
              </li>
            </ul>
          </div>

          <!-- Status page -->
          <div v-if="statusPageUrl" class="mt-6 sm:border-l sm:border-transparent sm:pl-6">
            <Alert
              variant="info"
              title="System Status"
              :dismissible="false"
              :show-icon="true"
            >
              <p class="text-sm">
                Check our 
                <a
                  :href="statusPageUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-primary hover:text-primary-dark underline"
                >
                  status page
                </a>
                for any ongoing issues.
              </p>
            </Alert>
          </div>

          <!-- Contact support -->
          <div v-if="showSupport" class="mt-8 sm:border-l sm:border-transparent sm:pl-6">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ supportText }}
              <a
                :href="supportUrl"
                class="font-medium text-primary hover:text-primary-dark underline"
              >
                {{ supportLinkText }}
              </a>
              <span v-if="showErrorId && errorId">
                and include error ID: <code class="font-mono text-xs">{{ errorId }}</code>
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Alert from '@/components/Alert.vue'
import Button from '@/components/Button.vue'

interface Error500Props {
  title?: string
  message?: string
  errorId?: string
  showErrorId?: boolean
  homeUrl?: string
  homeButtonText?: string
  refreshButtonText?: string
  suggestions?: string[]
  suggestionsTitle?: string
  statusPageUrl?: string
  showSupport?: boolean
  supportText?: string
  supportUrl?: string
  supportLinkText?: string
}

const props = withDefaults(defineProps<Error500Props>(), {
  title: 'Server error',
  message: 'Sorry, something went wrong on our end. We\'re working to fix this issue.',
  showErrorId: true,
  errorId: () => Math.random().toString(36).substr(2, 9).toUpperCase(),
  homeUrl: '/',
  homeButtonText: 'Go back home',
  refreshButtonText: 'Try again',
  suggestionsTitle: 'You can try:',
  suggestions: () => [
    'Refreshing the page',
    'Checking your internet connection',
    'Trying again in a few minutes',
    'Clearing your browser cache'
  ],
  showSupport: true,
  supportText: 'If the problem persists, please',
  supportUrl: '/contact',
  supportLinkText: 'contact support'
})

const refresh = () => {
  window.location.reload()
}
</script>