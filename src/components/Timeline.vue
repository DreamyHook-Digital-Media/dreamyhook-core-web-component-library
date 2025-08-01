<template>
  <div class="flow-root">
    <ul role="list" class="-mb-8">
      <li
        v-for="(item, index) in items"
        :key="getItemKey(item, index)"
        class="relative"
      >
        <!-- Timeline line -->
        <div
          v-if="index < items.length - 1"
          class="absolute left-4 top-12 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
          aria-hidden="true"
        />

        <div class="relative flex items-start space-x-3">
          <!-- Timeline icon -->
          <div class="relative">
            <slot
              :name="`icon-${item.type || 'default'}`"
              :item="item"
              :index="index"
            >
              <div :class="getIconClasses(item)">
                <component
                  v-if="item.icon"
                  :is="item.icon"
                  class="h-4 w-4"
                  aria-hidden="true"
                />
                <div
                  v-else
                  class="h-2 w-2 rounded-full bg-current"
                />
              </div>
            </slot>
          </div>

          <!-- Timeline content -->
          <div class="flex-1 min-w-0">
            <div :class="getContentClasses(item)">
              <!-- Header -->
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <!-- Title -->
                  <h4 v-if="item.title" :class="getTitleClasses(item)">
                    {{ item.title }}
                  </h4>
                  
                  <!-- Meta information -->
                  <div v-if="item.author || item.timestamp" class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <span v-if="item.author">{{ item.author }}</span>
                    <span v-if="item.author && item.timestamp">•</span>
                    <time v-if="item.timestamp" :datetime="item.timestamp">
                      {{ formatTimestamp(item.timestamp) }}
                    </time>
                  </div>
                </div>

                <!-- Actions -->
                <div v-if="$slots.actions" class="flex-shrink-0 ml-4">
                  <slot name="actions" :item="item" :index="index" />
                </div>
              </div>

              <!-- Description -->
              <div v-if="item.description || $slots[`content-${index}`]" class="mt-2">
                <slot :name="`content-${index}`" :item="item" :index="index">
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    {{ item.description }}
                  </p>
                </slot>
              </div>

              <!-- Media -->
              <div v-if="item.media || $slots[`media-${index}`]" class="mt-3">
                <slot :name="`media-${index}`" :item="item" :index="index">
                  <div v-if="item.media" class="flex space-x-2">
                    <img
                      v-for="(media, mediaIndex) in item.media"
                      :key="mediaIndex"
                      :src="media.url"
                      :alt="media.alt || ''"
                      class="h-20 w-20 rounded-lg object-cover"
                    />
                  </div>
                </slot>
              </div>

              <!-- Tags -->
              <div v-if="item.tags && item.tags.length > 0" class="mt-3">
                <div class="flex flex-wrap gap-1">
                  <Badge
                    v-for="tag in item.tags"
                    :key="tag"
                    variant="secondary"
                    size="sm"
                  >
                    {{ tag }}
                  </Badge>
                </div>
              </div>

              <!-- Custom content -->
              <div v-if="$slots[`item-${index}`]" class="mt-3">
                <slot :name="`item-${index}`" :item="item" :index="index" />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Badge from './Badge.vue'

interface TimelineMedia {
  url: string
  alt?: string
  type?: 'image' | 'video'
}

interface TimelineItem {
  id?: string | number
  type?: 'default' | 'success' | 'warning' | 'error' | 'info'
  icon?: any
  title?: string
  description?: string
  author?: string
  timestamp?: string | Date
  media?: TimelineMedia[]
  tags?: string[]
  data?: any
}

interface TimelineProps {
  items: TimelineItem[]
  variant?: 'default' | 'compact'
  showConnector?: boolean
}

const props = withDefaults(defineProps<TimelineProps>(), {
  variant: 'default',
  showConnector: true
})

const getItemKey = (item: TimelineItem, index: number) => {
  return item.id || index
}

const getIconClasses = (item: TimelineItem) => {
  const base = 'flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-900'
  
  const variants = {
    default: 'bg-gray-400 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  }
  
  return `${base} ${variants[item.type || 'default']}`
}

const getContentClasses = (item: TimelineItem) => {
  const base = 'rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800'
  
  if (props.variant === 'compact') {
    return 'pb-4'
  }
  
  return base
}

const getTitleClasses = (item: TimelineItem) => {
  const base = 'text-sm font-medium text-gray-900 dark:text-white'
  
  const variants = {
    default: '',
    success: 'text-green-800 dark:text-green-200',
    warning: 'text-yellow-800 dark:text-yellow-200',
    error: 'text-red-800 dark:text-red-200',
    info: 'text-blue-800 dark:text-blue-200'
  }
  
  return `${base} ${variants[item.type || 'default']}`
}

const formatTimestamp = (timestamp: string | Date) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  
  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    return `${diffMinutes}m ago`
  } else if (diffHours < 24) {
    return `${Math.floor(diffHours)}h ago`
  } else if (diffDays < 7) {
    return `${Math.floor(diffDays)}d ago`
  } else {
    return date.toLocaleDateString()
  }
}
</script>