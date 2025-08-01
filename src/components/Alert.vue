<template>
  <Transition
    enter-active-class="transition-all ease-out duration-300"
    enter-from-class="opacity-0 transform -translate-y-2"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition-all ease-in duration-200"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform -translate-y-2"
  >
    <div v-if="visible" :class="alertClasses" role="alert">
      <!-- Icon -->
      <div v-if="showIcon" class="flex-shrink-0">
        <component
          :is="iconComponent"
          :class="iconClasses"
          aria-hidden="true"
        />
      </div>

      <!-- Content -->
      <div class="flex-1">
        <div v-if="title" :class="titleClasses">
          {{ title }}
        </div>
        <div v-if="message || $slots.default" :class="messageClasses">
          <slot>
            <p>{{ message }}</p>
          </slot>
        </div>
      </div>

      <!-- Actions -->
      <div v-if="$slots.actions || actionText" class="flex-shrink-0 ml-4">
        <slot name="actions">
          <Button
            v-if="actionText"
            :variant="actionVariant"
            size="sm"
            @click="handleAction"
          >
            {{ actionText }}
          </Button>
        </slot>
      </div>

      <!-- Close button -->
      <div v-if="dismissible" class="flex-shrink-0 ml-4">
        <button
          type="button"
          :class="closeButtonClasses"
          @click="handleClose"
        >
          <span class="sr-only">Dismiss</span>
          <XMarkIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import Button from './Button.vue'

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  message?: string
  dismissible?: boolean
  showIcon?: boolean
  actionText?: string
  actionVariant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  border?: boolean
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'info',
  dismissible: false,
  showIcon: true,
  actionVariant: 'outline',
  border: false
})

const emit = defineEmits<{
  close: []
  action: []
}>()

const visible = ref(true)

const iconComponent = computed(() => {
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon,
  }
  return icons[props.variant]
})

const alertClasses = computed(() => {
  const base = 'flex p-4 rounded-md'
  
  const variants = {
    info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
    success: 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-200',
    warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
    error: 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-200'
  }
  
  const borders = props.border ? {
    info: 'border border-blue-200 dark:border-blue-800',
    success: 'border border-green-200 dark:border-green-800',
    warning: 'border border-yellow-200 dark:border-yellow-800',
    error: 'border border-red-200 dark:border-red-800'
  } : {}
  
  const borderClass = props.border ? borders[props.variant] : ''
  
  return `${base} ${variants[props.variant]} ${borderClass}`
})

const iconClasses = computed(() => {
  const base = 'h-5 w-5'
  const colors = {
    info: 'text-blue-400 dark:text-blue-300',
    success: 'text-green-400 dark:text-green-300',
    warning: 'text-yellow-400 dark:text-yellow-300',
    error: 'text-red-400 dark:text-red-300'
  }
  
  return `${base} ${colors[props.variant]}`
})

const titleClasses = computed(() => {
  const base = 'font-medium text-sm'
  return base
})

const messageClasses = computed(() => {
  const base = 'text-sm'
  const spacing = props.title ? 'mt-1' : ''
  
  return `${base} ${spacing}`
})

const closeButtonClasses = computed(() => {
  const base = 'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    info: 'text-blue-500 hover:bg-blue-100 focus:ring-blue-600 dark:text-blue-400 dark:hover:bg-blue-800',
    success: 'text-green-500 hover:bg-green-100 focus:ring-green-600 dark:text-green-400 dark:hover:bg-green-800',
    warning: 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-800',
    error: 'text-red-500 hover:bg-red-100 focus:ring-red-600 dark:text-red-400 dark:hover:bg-red-800'
  }
  
  return `${base} ${variants[props.variant]}`
})

const handleClose = () => {
  visible.value = false
  emit('close')
}

const handleAction = () => {
  emit('action')
}
</script>