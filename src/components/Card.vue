<template>
  <div :class="cardClasses">
    <!-- Loading state -->
    <div v-if="loading" class="animate-pulse">
      <SkeletonGroup :variant="skeletonVariant" />
    </div>

    <!-- Card content -->
    <div v-else>
      <!-- Header -->
      <div v-if="$slots.header || title || subtitle" :class="headerClasses">
        <slot name="header">
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <h3 v-if="title" :class="titleClasses">
                {{ title }}
              </h3>
              <p v-if="subtitle" :class="subtitleClasses">
                {{ subtitle }}
              </p>
            </div>
            <div v-if="$slots.headerActions" class="flex-shrink-0 ml-4">
              <slot name="headerActions" />
            </div>
          </div>
        </slot>
      </div>

      <!-- Media -->
      <div v-if="$slots.media || image" :class="mediaClasses">
        <slot name="media">
          <img
            v-if="image"
            :src="image"
            :alt="imageAlt"
            :class="imageClasses"
            @error="handleImageError"
          />
        </slot>
      </div>

      <!-- Body -->
      <div v-if="$slots.default || content" :class="bodyClasses">
        <slot>
          <div v-if="content" v-html="content" />
        </slot>
      </div>

      <!-- Footer -->
      <div v-if="$slots.footer || $slots.actions" :class="footerClasses">
        <slot name="footer">
          <div v-if="$slots.actions" class="flex items-center justify-end space-x-2">
            <slot name="actions" />
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SkeletonGroup from './SkeletonGroup.vue'

interface CardProps {
  variant?: 'simple' | 'bordered' | 'elevated' | 'media' | 'product' | 'feature'
  title?: string
  subtitle?: string
  content?: string
  image?: string
  imageAlt?: string
  loading?: boolean
  hoverable?: boolean
  clickable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'simple',
  imageAlt: '',
  loading: false,
  hoverable: false,
  clickable: false,
  padding: 'md',
  rounded: 'lg'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  imageError: [event: Event]
}>()

const imageError = ref(false)

const cardClasses = computed(() => {
  const base = 'bg-white dark:bg-gray-800 transition-all duration-200'
  
  const variants = {
    simple: '',
    bordered: 'border border-gray-200 dark:border-gray-700',
    elevated: 'shadow-lg',
    media: 'overflow-hidden',
    product: 'border border-gray-200 dark:border-gray-700 shadow-sm',
    feature: 'border border-gray-200 dark:border-gray-700 shadow-md'
  }
  
  const roundings = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  }
  
  const interactions = {
    hoverable: props.hoverable ? 'hover:shadow-lg hover:-translate-y-1' : '',
    clickable: props.clickable ? 'cursor-pointer' : ''
  }
  
  return [
    base,
    variants[props.variant],
    roundings[props.rounded],
    interactions.hoverable,
    interactions.clickable
  ].filter(Boolean).join(' ')
})

const headerClasses = computed(() => {
  const paddings = {
    none: '',
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4'
  }
  
  const base = 'border-b border-gray-200 dark:border-gray-700'
  return `${base} ${paddings[props.padding]}`
})

const mediaClasses = computed(() => {
  return props.variant === 'media' ? '' : 'relative'
})

const imageClasses = computed(() => {
  const base = 'w-full object-cover'
  const height = props.variant === 'product' ? 'h-48' : 'h-64'
  
  return `${base} ${height}`
})

const bodyClasses = computed(() => {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }
  
  return paddings[props.padding]
})

const footerClasses = computed(() => {
  const paddings = {
    none: '',
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4'
  }
  
  const base = 'border-t border-gray-200 dark:border-gray-700'
  return `${base} ${paddings[props.padding]}`
})

const titleClasses = computed(() => {
  const sizes = {
    simple: 'text-lg font-semibold',
    bordered: 'text-lg font-semibold',
    elevated: 'text-xl font-bold',
    media: 'text-lg font-semibold',
    product: 'text-lg font-semibold',
    feature: 'text-xl font-bold'
  }
  
  const base = 'text-gray-900 dark:text-white truncate'
  return `${base} ${sizes[props.variant]}`
})

const subtitleClasses = computed(() => {
  return 'mt-1 text-sm text-gray-500 dark:text-gray-400'
})

const skeletonVariant = computed(() => {
  if (props.variant === 'media' || props.variant === 'product') {
    return 'card'
  }
  return 'text'
})

const handleImageError = (event: Event) => {
  imageError.value = true
  emit('imageError', event)
}

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>