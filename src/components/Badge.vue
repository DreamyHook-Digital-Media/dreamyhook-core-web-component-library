<template>
  <span :class="badgeClasses">
    <span v-if="dot" :class="dotClasses"></span>
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  dot?: boolean
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  size: 'md',
  rounded: false,
  dot: false
})

const baseClasses = 'inline-flex items-center font-medium'

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  }
  return sizes[props.size]
})

const variantClasses = computed(() => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-primary/10 text-primary dark:bg-primary/20',
    secondary: 'bg-secondary/10 text-secondary dark:bg-secondary/20',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return variants[props.variant]
})

const shapeClasses = computed(() => {
  return props.rounded ? 'rounded-full' : 'rounded-md'
})

const badgeClasses = computed(() => {
  return [
    baseClasses,
    sizeClasses.value,
    variantClasses.value,
    shapeClasses.value
  ].join(' ')
})

const dotClasses = computed(() => {
  const sizes = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-2.5 w-2.5'
  }
  
  const colors = {
    default: 'bg-gray-500',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  }
  
  return [
    sizes[props.size],
    colors[props.variant],
    'rounded-full',
    props.size === 'sm' ? 'mr-1' : 'mr-1.5'
  ].join(' ')
})
</script>