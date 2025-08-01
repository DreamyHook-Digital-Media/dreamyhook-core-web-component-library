<template>
  <div 
    :class="skeletonClasses"
    :style="customStyles"
    role="status"
    aria-label="Loading..."
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  lines?: number
  animation?: 'pulse' | 'wave' | 'none'
  className?: string
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: 'text',
  animation: 'pulse',
  lines: 1
})

const skeletonClasses = computed(() => {
  const base = 'bg-gray-200 dark:bg-gray-700'
  
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg'
  }
  
  const animations = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: ''
  }
  
  const variant = variants[props.variant]
  const animation = animations[props.animation]
  const custom = props.className || ''
  
  return `${base} ${variant} ${animation} ${custom}`.trim()
})

const customStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.width) {
    styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.height) {
    styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  // Default dimensions for circular variant
  if (props.variant === 'circular' && !props.width && !props.height) {
    styles.width = '40px'
    styles.height = '40px'
  }
  
  // Default dimensions for rectangular variant
  if (props.variant === 'rectangular' && !props.width && !props.height) {
    styles.width = '100%'
    styles.height = '200px'
  }
  
  return styles
})
</script>

<style scoped>
@keyframes wave {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-wave {
  position: relative;
  overflow: hidden;
}

.animate-wave::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: wave 1.6s ease-in-out infinite;
  content: '';
}

.dark .animate-wave::after {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
}
</style>