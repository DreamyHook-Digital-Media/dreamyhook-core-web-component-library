<template>
  <div :class="containerClasses">
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt"
      :class="imageClasses"
      @error="handleImageError"
    />
    <div v-else :class="fallbackClasses">
      <span v-if="initials" :class="initialsClasses">{{ initials }}</span>
      <UserIcon v-else :class="iconClasses" />
    </div>
    <div v-if="status" :class="statusClasses"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { UserIcon } from '@heroicons/vue/24/solid'

export interface AvatarProps {
  src?: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'square'
  initials?: string
  status?: 'online' | 'offline' | 'busy' | 'away'
  statusPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
}

const props = withDefaults(defineProps<AvatarProps>(), {
  alt: 'Avatar',
  size: 'md',
  shape: 'circle',
  statusPosition: 'bottom-right'
})

const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}

const sizeClasses = computed(() => {
  const sizes = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }
  return sizes[props.size]
})

const containerClasses = computed(() => {
  return [
    'relative inline-block',
    sizeClasses.value
  ].join(' ')
})

const shapeClasses = computed(() => {
  return props.shape === 'circle' ? 'rounded-full' : 'rounded-lg'
})

const imageClasses = computed(() => {
  return [
    'h-full w-full object-cover',
    shapeClasses.value
  ].join(' ')
})

const fallbackClasses = computed(() => {
  return [
    'flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700',
    shapeClasses.value
  ].join(' ')
})

const initialsClasses = computed(() => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  return [
    sizes[props.size],
    'font-medium text-gray-600 dark:text-gray-300'
  ].join(' ')
})

const iconClasses = computed(() => {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  }
  return [
    sizes[props.size],
    'text-gray-400 dark:text-gray-500'
  ].join(' ')
})

const statusClasses = computed(() => {
  const positions = {
    'top-right': 'top-0 right-0',
    'bottom-right': 'bottom-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-left': 'bottom-0 left-0'
  }
  
  const sizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4'
  }
  
  const colors = {
    online: 'bg-green-400',
    offline: 'bg-gray-400',
    busy: 'bg-red-400',
    away: 'bg-yellow-400'
  }
  
  return [
    'absolute rounded-full ring-2 ring-white dark:ring-gray-900',
    positions[props.statusPosition],
    sizes[props.size],
    colors[props.status!]
  ].join(' ')
})
</script>