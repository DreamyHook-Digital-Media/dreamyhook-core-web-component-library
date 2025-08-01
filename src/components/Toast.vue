<template>
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="visible"
      :class="toastClasses"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <!-- Icon -->
      <div v-if="showIcon" class="flex-shrink-0">
        <component
          :is="iconComponent"
          :class="iconClasses"
          aria-hidden="true"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 ml-3">
        <div v-if="title" :class="titleClasses">
          {{ title }}
        </div>
        <div v-if="message || $slots.default" :class="messageClasses">
          <slot>
            {{ message }}
          </slot>
        </div>
      </div>

      <!-- Action button -->
      <div v-if="actionText" class="ml-4 flex-shrink-0 flex">
        <button
          type="button"
          :class="actionClasses"
          @click="handleAction"
        >
          {{ actionText }}
        </button>
      </div>

      <!-- Close button -->
      <div v-if="dismissible" class="ml-4 flex-shrink-0 flex">
        <button
          type="button"
          :class="closeClasses"
          @click="handleClose"
        >
          <span class="sr-only">Close</span>
          <XMarkIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

export interface ToastProps {
  id?: string
  variant?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message?: string
  duration?: number
  dismissible?: boolean
  showIcon?: boolean
  actionText?: string
  visible?: boolean
}

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'info',
  duration: 5000,
  dismissible: true,
  showIcon: true,
  visible: true
})

const emit = defineEmits<{
  close: [id?: string]
  action: [id?: string]
}>()

let timeout: NodeJS.Timeout | null = null

const iconComponent = computed(() => {
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon,
  }
  return icons[props.variant]
})

const toastClasses = computed(() => {
  const base = 'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden dark:bg-gray-800'
  const padding = 'p-4'
  const flex = 'flex items-start'
  
  return `${base} ${padding} ${flex}`
})

const iconClasses = computed(() => {
  const base = 'h-6 w-6'
  const colors = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400',
  }
  
  return `${base} ${colors[props.variant]}`
})

const titleClasses = computed(() => {
  return 'text-sm font-medium text-gray-900 dark:text-white'
})

const messageClasses = computed(() => {
  const base = 'text-sm text-gray-500 dark:text-gray-400'
  const spacing = props.title ? 'mt-1' : ''
  
  return `${base} ${spacing}`
})

const actionClasses = computed(() => {
  const base = 'rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
  const colors = {
    success: 'text-green-600 hover:text-green-500 focus:ring-green-500 dark:text-green-400',
    error: 'text-red-600 hover:text-red-500 focus:ring-red-500 dark:text-red-400',
    warning: 'text-yellow-600 hover:text-yellow-500 focus:ring-yellow-500 dark:text-yellow-400',
    info: 'text-blue-600 hover:text-blue-500 focus:ring-blue-500 dark:text-blue-400',
  }
  
  return `${base} ${colors[props.variant]}`
})

const closeClasses = computed(() => {
  return 'rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:text-gray-500 dark:hover:text-gray-400'
})

const handleClose = () => {
  emit('close', props.id)
}

const handleAction = () => {
  emit('action', props.id)
}

const startTimer = () => {
  if (props.duration > 0) {
    timeout = setTimeout(() => {
      handleClose()
    }, props.duration)
  }
}

const clearTimer = () => {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  clearTimer()
})
</script>