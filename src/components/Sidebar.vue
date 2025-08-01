<template>
  <div>
    <!-- Overlay for mobile -->
    <Transition
      enter-active-class="transition-opacity ease-linear duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="overlay && isOpen"
        class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
        @click="$emit('close')"
      />
    </Transition>

    <!-- Sidebar -->
    <Transition
      enter-active-class="transition ease-in-out duration-300 transform"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition ease-in-out duration-300 transform"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div
        v-show="isOpen || !overlay"
        :class="sidebarClasses"
        role="navigation"
        aria-label="Sidebar navigation"
      >
        <!-- Header -->
        <div v-if="$slots.header" class="flex h-16 items-center justify-between px-4">
          <slot name="header" />
          <button
            v-if="overlay"
            type="button"
            class="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:hover:bg-gray-800 lg:hidden"
            @click="$emit('close')"
          >
            <span class="sr-only">Close sidebar</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 space-y-1 px-2 py-4">
          <template v-for="item in items" :key="item.label">
            <!-- Section with children -->
            <div v-if="item.children && item.children.length > 0" class="space-y-1">
              <div
                :class="sectionHeaderClasses"
                @click="toggleSection(item.label)"
              >
                <div class="flex items-center">
                  <component
                    v-if="item.icon"
                    :is="item.icon"
                    :class="iconClasses"
                    aria-hidden="true"
                  />
                  <span :class="textClasses">{{ item.label }}</span>
                </div>
                <ChevronRightIcon
                  :class="[
                    'h-5 w-5 transition-transform',
                    expandedSections[item.label] ? 'rotate-90' : ''
                  ]"
                  aria-hidden="true"
                />
              </div>
              
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div v-show="expandedSections[item.label]" class="space-y-1 pl-8">
                  <component
                    v-for="child in item.children"
                    :key="child.label"
                    :is="getLinkComponent(child)"
                    :to="child.to"
                    :href="child.href"
                    :target="child.external ? '_blank' : undefined"
                    :rel="child.external ? 'noopener noreferrer' : undefined"
                    :class="getNavItemClasses(child, true)"
                    :disabled="child.disabled"
                  >
                    <component
                      v-if="child.icon"
                      :is="child.icon"
                      :class="iconClasses"
                      aria-hidden="true"
                    />
                    <span :class="textClasses">{{ child.label }}</span>
                    <Badge
                      v-if="child.badge"
                      variant="primary"
                      size="sm"
                      :class="badgeClasses"
                    >
                      {{ child.badge }}
                    </Badge>
                  </component>
                </div>
              </Transition>
            </div>

            <!-- Single item -->
            <component
              v-else
              :is="getLinkComponent(item)"
              :to="item.to"
              :href="item.href"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener noreferrer' : undefined"
              :class="getNavItemClasses(item, false)"
              :disabled="item.disabled"
            >
              <component
                v-if="item.icon"
                :is="item.icon"
                :class="iconClasses"
                aria-hidden="true"
              />
              <span :class="textClasses">{{ item.label }}</span>
              <Badge
                v-if="item.badge"
                variant="primary"
                size="sm"
                :class="badgeClasses"
              >
                {{ item.badge }}
              </Badge>
            </component>
          </template>
        </nav>

        <!-- Footer -->
        <div v-if="$slots.footer" class="border-t border-gray-200 p-4 dark:border-gray-700">
          <slot name="footer" />
        </div>

        <!-- Collapse toggle -->
        <div v-if="collapsible && !overlay" class="border-t border-gray-200 p-2 dark:border-gray-700">
          <button
            type="button"
            :class="collapseButtonClasses"
            @click="$emit('toggle')"
          >
            <ChevronDoubleLeftIcon
              :class="[
                'h-5 w-5 transition-transform',
                collapsed ? 'rotate-180' : ''
              ]"
              aria-hidden="true"
            />
            <span v-if="!collapsed" class="ml-2">Collapse</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { XMarkIcon, ChevronRightIcon, ChevronDoubleLeftIcon } from '@heroicons/vue/24/outline'
import Badge from './Badge.vue'
import type { SidebarProps } from '@/types/navigation.types'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsed: false,
  collapsible: false,
  width: '16rem',
  position: 'left',
  overlay: false
})

defineEmits<{
  'close': []
  'toggle': []
}>()

const expandedSections = reactive<Record<string, boolean>>({})

const isOpen = computed(() => !props.collapsed)

const toggleSection = (sectionLabel: string) => {
  expandedSections[sectionLabel] = !expandedSections[sectionLabel]
}

const getLinkComponent = (item: any) => {
  if (item.to) return 'router-link'
  if (item.href) return 'a'
  return 'button'
}

const sidebarClasses = computed(() => {
  const base = 'flex h-full flex-col bg-white shadow-lg dark:bg-gray-900'
  const position = props.overlay 
    ? 'fixed inset-y-0 left-0 z-50 lg:static lg:z-auto'
    : 'relative'
  const width = props.collapsed ? 'w-16' : `w-64`
  
  return [base, position, width].join(' ')
})

const sectionHeaderClasses = computed(() => {
  const base = 'flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium cursor-pointer transition-colors'
  return `${base} text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800`
})

const getNavItemClasses = (item: any, isChild: boolean) => {
  const base = 'group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors'
  
  if (item.disabled) {
    return `${base} cursor-not-allowed opacity-50 text-gray-400`
  }
  
  if (item.active) {
    return `${base} bg-primary/10 text-primary`
  }
  
  return `${base} text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white`
}

const iconClasses = computed(() => {
  return props.collapsed 
    ? 'h-6 w-6 flex-shrink-0'
    : 'mr-3 h-6 w-6 flex-shrink-0'
})

const textClasses = computed(() => {
  return props.collapsed ? 'sr-only' : ''
})

const badgeClasses = computed(() => {
  return props.collapsed ? 'sr-only' : 'ml-auto'
})

const collapseButtonClasses = computed(() => {
  return 'flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
})

// Initialize expanded sections
props.items.forEach(item => {
  if (item.children && item.children.length > 0) {
    expandedSections[item.label] = false
  }
})
</script>