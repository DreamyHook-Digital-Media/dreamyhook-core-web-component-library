<template>
  <footer class="bg-white dark:bg-gray-900" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
      <!-- Main footer content -->
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <!-- Logo and description section -->
        <div class="space-y-8">
          <div v-if="showLogo || logoText" class="flex items-center space-x-3">
            <slot name="logo">
              <span v-if="logoText" class="text-xl font-bold text-gray-900 dark:text-white">
                {{ logoText }}
              </span>
            </slot>
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <slot name="description">
              <p>
                Making the world a better place through constructing elegant hierarchies.
              </p>
            </slot>
          </div>
          <!-- Social links -->
          <div v-if="socialLinks && socialLinks.length > 0" class="flex space-x-6">
            <component
              v-for="link in socialLinks"
              :key="link.label"
              :is="getLinkComponent(link)"
              :href="link.href"
              :to="link.to"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              :aria-label="link.label"
            >
              <slot :name="`social-${link.label.toLowerCase()}`">
                <span class="sr-only">{{ link.label }}</span>
                <!-- Placeholder for social icons -->
                <div class="h-6 w-6 rounded bg-gray-300 dark:bg-gray-600"></div>
              </slot>
            </component>
          </div>
        </div>

        <!-- Links sections -->
        <div v-if="sections && sections.length > 0" class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div v-for="section in firstColumnSections" :key="section.title">
              <h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                {{ section.title }}
              </h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="link in section.links" :key="link.label">
                  <component
                    :is="getLinkComponent(link)"
                    :href="link.href"
                    :to="link.to"
                    :target="link.external ? '_blank' : undefined"
                    :rel="link.external ? 'noopener noreferrer' : undefined"
                    class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {{ link.label }}
                  </component>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div v-for="section in secondColumnSections" :key="section.title">
              <h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                {{ section.title }}
              </h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="link in section.links" :key="link.label">
                  <component
                    :is="getLinkComponent(link)"
                    :href="link.href"
                    :to="link.to"
                    :target="link.external ? '_blank' : undefined"
                    :rel="link.external ? 'noopener noreferrer' : undefined"
                    class="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {{ link.label }}
                  </component>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter signup -->
      <div v-if="$slots.newsletter" class="mt-16 border-t border-gray-900/10 pt-8 dark:border-gray-800">
        <slot name="newsletter" />
      </div>

      <!-- Bottom section -->
      <div class="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 dark:border-gray-800">
        <div class="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <!-- Copyright -->
          <p class="text-xs leading-5 text-gray-500 dark:text-gray-400">
            <slot name="copyright">
              {{ copyright || `© ${currentYear} Your Company, Inc. All rights reserved.` }}
            </slot>
          </p>

          <!-- Additional bottom links -->
          <div v-if="$slots.bottom" class="flex space-x-6">
            <slot name="bottom" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FooterProps } from '@/types/navigation.types'

const props = withDefaults(defineProps<FooterProps>(), {
  sections: () => [],
  socialLinks: () => [],
  showLogo: true
})

const currentYear = new Date().getFullYear()

const firstColumnSections = computed(() => {
  return props.sections.slice(0, Math.ceil(props.sections.length / 2))
})

const secondColumnSections = computed(() => {
  return props.sections.slice(Math.ceil(props.sections.length / 2))
})

const getLinkComponent = (link: any) => {
  if (link.to) return 'router-link'
  if (link.href) return 'a'
  return 'span'
}
</script>