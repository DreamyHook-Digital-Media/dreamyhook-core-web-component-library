<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div class="max-w-max mx-auto">
      <main class="sm:flex">
        <!-- Error illustration -->
        <div class="flex-shrink-0">
          <div class="mx-auto h-48 w-48 sm:h-64 sm:w-64">
            <slot name="illustration">
              <!-- Default 404 illustration placeholder -->
              <div class="h-full w-full rounded-lg bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-800 flex items-center justify-center">
                <div class="text-center">
                  <h1 class="text-6xl sm:text-8xl font-bold text-blue-600 dark:text-blue-300">
                    404
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
            
            <!-- Additional content -->
            <div v-if="$slots.default" class="mt-6">
              <slot />
            </div>
          </div>
          
          <!-- Actions -->
          <div class="mt-8 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <Button
              :href="homeUrl"
              variant="primary"
            >
              {{ homeButtonText }}
            </Button>
            
            <Button
              variant="outline"
              @click="goBack"
            >
              {{ backButtonText }}
            </Button>
            
            <!-- Custom actions -->
            <div v-if="$slots.actions">
              <slot name="actions" />
            </div>
          </div>

          <!-- Help links -->
          <div v-if="helpLinks && helpLinks.length > 0" class="mt-8 sm:border-l sm:border-transparent sm:pl-6">
            <p class="text-sm font-medium text-gray-900 dark:text-white mb-3">
              {{ helpLinksTitle }}
            </p>
            <ul class="space-y-2">
              <li v-for="link in helpLinks" :key="link.text">
                <a
                  :href="link.href"
                  :to="link.to"
                  class="text-sm text-primary hover:text-primary-dark underline"
                >
                  {{ link.text }}
                </a>
              </li>
            </ul>
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
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'

interface HelpLink {
  text: string
  href?: string
  to?: string
}

interface Error404Props {
  title?: string
  message?: string
  homeUrl?: string
  homeButtonText?: string
  backButtonText?: string
  helpLinks?: HelpLink[]
  helpLinksTitle?: string
  showSupport?: boolean
  supportText?: string
  supportUrl?: string
  supportLinkText?: string
}

const props = withDefaults(defineProps<Error404Props>(), {
  title: 'Page not found',
  message: 'Sorry, we couldn\'t find the page you\'re looking for.',
  homeUrl: '/',
  homeButtonText: 'Go back home',
  backButtonText: 'Go back',
  helpLinksTitle: 'Popular pages',
  showSupport: true,
  supportText: 'Still need help?',
  supportUrl: '/contact',
  supportLinkText: 'Contact support'
})

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    window.location.href = props.homeUrl
  }
}
</script>