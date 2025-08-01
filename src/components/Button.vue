<template>
  <component
    :is="componentTag"
    :type="type"
    :disabled="disabled || loading"
    :href="href"
    :class="buttonClasses"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
  >
    <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <svg
        class="h-4 w-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
    <span :class="contentClasses">
      <component
        v-if="leftIcon"
        :is="leftIcon"
        :class="iconClasses"
        aria-hidden="true"
      />
      <slot />
      <component
        v-if="rightIcon"
        :is="rightIcon"
        :class="iconClasses"
        aria-hidden="true"
      />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from '@/types/button.types'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
  as: 'button'
})

const componentTag = computed(() => {
  if (props.href) return 'a'
  return props.as
})

const baseClasses = 'relative inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-indigo-700 focus:ring-primary dark:bg-primary dark:hover:bg-indigo-500',
    secondary: 'bg-secondary text-white hover:bg-amber-600 focus:ring-secondary dark:bg-secondary dark:hover:bg-amber-400',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-primary dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary dark:text-gray-300 dark:hover:bg-gray-800'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-lg rounded-xl'
  }
  return sizes[props.size]
})

const widthClasses = computed(() => {
  return props.fullWidth ? 'w-full' : ''
})

const buttonClasses = computed(() => {
  return [
    baseClasses,
    variantClasses.value,
    sizeClasses.value,
    widthClasses.value
  ].join(' ')
})

const contentClasses = computed(() => {
  return [
    'inline-flex items-center gap-2',
    props.loading && 'invisible'
  ].filter(Boolean).join(' ')
})

const iconClasses = computed(() => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-5 w-5',
    xl: 'h-6 w-6'
  }
  return sizes[props.size]
})
</script>