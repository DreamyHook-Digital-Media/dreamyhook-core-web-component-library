<template>
  <div :class="containerClasses" role="separator" :aria-orientation="orientation">
    <div :class="lineClasses"></div>
    <div v-if="$slots.default" :class="contentClasses">
      <slot />
    </div>
    <div v-if="$slots.default" :class="lineClasses"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted'
  spacing?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<DividerProps>(), {
  orientation: 'horizontal',
  variant: 'solid',
  spacing: 'md'
})

const spacingClasses = computed(() => {
  const spacings = {
    sm: props.orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: props.orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: props.orientation === 'horizontal' ? 'my-8' : 'mx-8'
  }
  return spacings[props.spacing]
})

const containerClasses = computed(() => {
  const base = props.orientation === 'horizontal' 
    ? 'flex items-center' 
    : 'inline-flex flex-col items-center self-stretch'
  
  return [base, spacingClasses.value].join(' ')
})

const lineClasses = computed(() => {
  const base = 'bg-gray-200 dark:bg-gray-700'
  
  const orientation = props.orientation === 'horizontal'
    ? 'h-px flex-grow'
    : 'w-px flex-grow self-stretch'
  
  const variants = {
    solid: '',
    dashed: props.orientation === 'horizontal' 
      ? 'bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700'
      : 'bg-gradient-to-b from-transparent via-gray-200 to-transparent dark:via-gray-700',
    dotted: props.orientation === 'horizontal'
      ? 'bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700'
      : 'bg-gradient-to-b from-transparent via-gray-200 to-transparent dark:via-gray-700'
  }
  
  return [base, orientation, variants[props.variant]].filter(Boolean).join(' ')
})

const contentClasses = computed(() => {
  const padding = props.orientation === 'horizontal' ? 'px-3' : 'py-3'
  return [
    padding,
    'text-sm text-gray-500 dark:text-gray-400'
  ].join(' ')
})
</script>