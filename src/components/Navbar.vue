<template>
  <nav :class="navClasses" role="navigation" aria-label="Main navigation">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo section -->
        <div class="flex items-center">
          <component
            :is="logoComponent"
            :to="logoHref"
            :href="logoHref"
            class="flex items-center space-x-2"
          >
            <img
              v-if="logo"
              :src="logo"
              :alt="logoText || 'Logo'"
              class="h-8 w-auto"
            />
            <span
              v-if="logoText"
              class="text-xl font-bold text-gray-900 dark:text-white"
            >
              {{ logoText }}
            </span>
          </component>
        </div>

        <!-- Desktop navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <template v-for="item in items" :key="item.label">
              <component
                :is="getLinkComponent(item)"
                :to="item.to"
                :href="item.href"
                :target="item.external ? '_blank' : undefined"
                :rel="item.external ? 'noopener noreferrer' : undefined"
                :class="getNavItemClasses(item)"
                :disabled="item.disabled"
              >
                <component
                  v-if="item.icon"
                  :is="item.icon"
                  class="mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                {{ item.label }}
                <Badge
                  v-if="item.badge"
                  variant="primary"
                  size="sm"
                  class="ml-2"
                >
                  {{ item.badge }}
                </Badge>
              </component>
            </template>
          </div>
        </div>

        <!-- Search bar -->
        <div v-if="showSearch" class="hidden flex-1 md:block md:ml-6 md:mr-6">
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              :placeholder="searchPlaceholder"
              class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              @input="$emit('search', $event.target.value)"
            />
          </div>
        </div>

        <!-- Right side content -->
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <slot name="actions" />
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            type="button"
            :class="mobileMenuButtonClasses"
            aria-controls="mobile-menu"
            :aria-expanded="mobileMenuOpen"
            @click="toggleMobileMenu"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!mobileMenuOpen" class="h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-show="mobileMenuOpen" class="md:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <!-- Mobile search -->
          <div v-if="showSearch" class="mb-4">
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                :placeholder="searchPlaceholder"
                class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                @input="$emit('search', $event.target.value)"
              />
            </div>
          </div>

          <!-- Mobile navigation items -->
          <template v-for="item in items" :key="item.label">
            <component
              :is="getLinkComponent(item)"
              :to="item.to"
              :href="item.href"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener noreferrer' : undefined"
              :class="getMobileNavItemClasses(item)"
              :disabled="item.disabled"
              @click="closeMobileMenu"
            >
              <component
                v-if="item.icon"
                :is="item.icon"
                class="mr-3 h-5 w-5"
                aria-hidden="true"
              />
              {{ item.label }}
              <Badge
                v-if="item.badge"
                variant="primary"
                size="sm"
                class="ml-auto"
              >
                {{ item.badge }}
              </Badge>
            </component>
          </template>

          <!-- Mobile actions -->
          <div class="border-t border-gray-200 pt-4 dark:border-gray-700">
            <slot name="mobile-actions" />
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import Badge from './Badge.vue'
import type { NavbarProps } from '@/types/navigation.types'

const props = withDefaults(defineProps<NavbarProps>(), {
  items: () => [],
  logoHref: '/',
  sticky: false,
  transparent: false,
  showSearch: false,
  searchPlaceholder: 'Search...'
})

defineEmits<{
  'search': [query: string]
}>()

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const logoComponent = computed(() => {
  return props.logoHref?.startsWith('/') ? 'router-link' : 'a'
})

const getLinkComponent = (item: any) => {
  if (item.to) return 'router-link'
  if (item.href) return 'a'
  return 'button'
}

const navClasses = computed(() => {
  const base = 'relative'
  const position = props.sticky ? 'sticky top-0 z-50' : ''
  const background = props.transparent 
    ? 'bg-transparent' 
    : 'bg-white shadow dark:bg-gray-900'
  
  return [base, position, background].filter(Boolean).join(' ')
})

const getNavItemClasses = (item: any) => {
  const base = 'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors'
  
  if (item.disabled) {
    return `${base} cursor-not-allowed opacity-50 text-gray-400`
  }
  
  if (item.active) {
    return `${base} bg-primary/10 text-primary`
  }
  
  return `${base} text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white`
}

const getMobileNavItemClasses = (item: any) => {
  const base = 'flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors'
  
  if (item.disabled) {
    return `${base} cursor-not-allowed opacity-50 text-gray-400`
  }
  
  if (item.active) {
    return `${base} bg-primary/10 text-primary`
  }
  
  return `${base} text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white`
}

const mobileMenuButtonClasses = computed(() => {
  return 'inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:hover:bg-gray-800'
})
</script>