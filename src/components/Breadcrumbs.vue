<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-4">
      <li v-for="(item, index) in displayItems" :key="index">
        <div class="flex items-center">
          <!-- Separator -->
          <span
            v-if="index > 0"
            class="mr-4 text-gray-400 dark:text-gray-500"
            aria-hidden="true"
          >
            {{ separator }}
          </span>

          <!-- Breadcrumb item -->
          <component
            :is="getLinkComponent(item)"
            :to="item.to"
            :href="item.href"
            :class="getBreadcrumbClasses(item, index === displayItems.length - 1)"
            :aria-current="item.active || index === displayItems.length - 1 ? 'page' : undefined"
          >
            {{ item.label }}
          </component>
        </div>
      </li>

      <!-- Overflow indicator -->
      <li v-if="hasOverflow" class="flex items-center">
        <span class="mr-4 text-gray-400 dark:text-gray-500" aria-hidden="true">
          {{ separator }}
        </span>
        <button
          type="button"
          class="flex items-center text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-300"
          @click="showAllItems"
        >
          <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
          <span class="sr-only">Show all breadcrumbs</span>
        </button>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
import type { BreadcrumbsProps } from '@/types/navigation.types'

const props = withDefaults(defineProps<BreadcrumbsProps>(), {
  separator: '/',
  maxItems: 5
})

const showAll = ref(false)

const displayItems = computed(() => {
  if (!props.maxItems || props.items.length <= props.maxItems || showAll.value) {
    return props.items
  }

  // Show first item, ellipsis, and last few items
  const firstItem = props.items[0]
  const lastItems = props.items.slice(-(props.maxItems - 1))
  
  return [firstItem, ...lastItems]
})

const hasOverflow = computed(() => {
  return props.maxItems && props.items.length > props.maxItems && !showAll.value
})

const showAllItems = () => {
  showAll.value = true
}

const getLinkComponent = (item: any) => {
  if (item.active) return 'span'
  if (item.to) return 'router-link'
  if (item.href) return 'a'
  return 'span'
}

const getBreadcrumbClasses = (item: any, isLast: boolean) => {
  const base = 'text-sm font-medium'
  
  if (item.active || isLast) {
    return `${base} text-gray-900 dark:text-white cursor-default`
  }
  
  if (item.href || item.to) {
    return `${base} text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-300`
  }
  
  return `${base} text-gray-500 dark:text-gray-400`
}
</script>