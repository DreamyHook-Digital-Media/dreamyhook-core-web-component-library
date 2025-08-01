<template>
  <div :class="containerClasses">
    <!-- Icon -->
    <div v-if="icon || $slots.icon" :class="iconContainerClasses">
      <slot name="icon">
        <component
          v-if="icon"
          :is="icon"
          :class="iconClasses"
          aria-hidden="true"
        />
      </slot>
    </div>

    <!-- Content -->
    <div class="flex-1">
      <!-- Value and trend row -->
      <div class="flex items-baseline justify-between">
        <div class="flex items-baseline space-x-2">
          <!-- Main value -->
          <p :class="valueClasses">
            {{ formattedValue }}
          </p>
          
          <!-- Unit -->
          <span v-if="unit" :class="unitClasses">
            {{ unit }}
          </span>
        </div>

        <!-- Trend indicator -->
        <div v-if="showTrend && (trend || trendValue)" class="flex items-center">
          <component
            v-if="trendIcon"
            :is="trendIcon"
            :class="trendIconClasses"
            aria-hidden="true"
          />
          <span :class="trendTextClasses">
            {{ trendText }}
          </span>
        </div>
      </div>

      <!-- Label -->
      <p v-if="label" :class="labelClasses">
        {{ label }}
      </p>

      <!-- Description -->
      <p v-if="description" :class="descriptionClasses">
        {{ description }}
      </p>

      <!-- Progress bar -->
      <div v-if="showProgress && (progress !== undefined)" class="mt-3">
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>Progress</span>
          <span>{{ Math.round(progress) }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            :class="progressBarClasses"
            :style="{ width: `${Math.min(100, Math.max(0, progress))}%` }"
          />
        </div>
      </div>

      <!-- Additional content -->
      <div v-if="$slots.default" class="mt-3">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon
} from '@heroicons/vue/24/outline'

interface StatsProps {
  value: number | string
  label?: string
  description?: string
  unit?: string
  icon?: any
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: number
  trendLabel?: string
  showTrend?: boolean
  showProgress?: boolean
  progress?: number
  format?: 'number' | 'currency' | 'percentage' | 'decimal'
  variant?: 'default' | 'card' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error'
}

const props = withDefaults(defineProps<StatsProps>(), {
  showTrend: true,
  showProgress: false,
  format: 'number',
  variant: 'default',
  size: 'md',
  color: 'default'
})

const containerClasses = computed(() => {
  const base = 'flex items-start space-x-4'
  
  const variants = {
    default: '',
    card: 'p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700',
    minimal: 'p-4'
  }
  
  return `${base} ${variants[props.variant]}`
})

const iconContainerClasses = computed(() => {
  const base = 'flex-shrink-0 rounded-lg p-3'
  
  const colors = {
    default: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
    primary: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
    success: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400',
    error: 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400'
  }
  
  return `${base} ${colors[props.color]}`
})

const iconClasses = computed(() => {
  const sizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }
  
  return sizes[props.size]
})

const valueClasses = computed(() => {
  const base = 'font-bold text-gray-900 dark:text-white'
  
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  }
  
  return `${base} ${sizes[props.size]}`
})

const unitClasses = computed(() => {
  return 'text-sm font-medium text-gray-500 dark:text-gray-400'
})

const labelClasses = computed(() => {
  const base = 'mt-1 font-medium text-gray-900 dark:text-white'
  
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  
  return `${base} ${sizes[props.size]}`
})

const descriptionClasses = computed(() => {
  return 'mt-1 text-sm text-gray-500 dark:text-gray-400'
})

const trendIcon = computed(() => {
  switch (props.trend) {
    case 'up':
      return ArrowUpIcon
    case 'down':
      return ArrowDownIcon
    case 'neutral':
      return MinusIcon
    default:
      return null
  }
})

const trendIconClasses = computed(() => {
  const base = 'h-4 w-4 mr-1'
  
  const colors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-400'
  }
  
  return `${base} ${colors[props.trend || 'neutral']}`
})

const trendTextClasses = computed(() => {
  const base = 'text-sm font-medium'
  
  const colors = {
    up: 'text-green-600 dark:text-green-400',
    down: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-500 dark:text-gray-400'
  }
  
  return `${base} ${colors[props.trend || 'neutral']}`
})

const progressBarClasses = computed(() => {
  const base = 'h-2 rounded-full transition-all duration-300'
  
  const colors = {
    default: 'bg-gray-600',
    primary: 'bg-blue-600',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  }
  
  return `${base} ${colors[props.color]}`
})

const formattedValue = computed(() => {
  const value = props.value
  
  if (typeof value === 'string') return value
  
  switch (props.format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value)
    
    case 'percentage':
      return `${value}%`
    
    case 'decimal':
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 2
      }).format(value)
    
    case 'number':
    default:
      return new Intl.NumberFormat('en-US').format(value)
  }
})

const trendText = computed(() => {
  if (props.trendLabel) return props.trendLabel
  
  if (props.trendValue !== undefined) {
    const sign = props.trend === 'up' ? '+' : props.trend === 'down' ? '' : ''
    return `${sign}${props.trendValue}%`
  }
  
  return ''
})
</script>