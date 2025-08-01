<template>
  <Popover as="div" class="relative">
    <PopoverButton 
      ref="triggerRef"
      :class="triggerClasses"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot name="trigger" :open="open">
        <span>{{ triggerText }}</span>
      </slot>
    </PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel 
        v-if="shouldShow"
        :static="trigger === 'hover'"
        :class="panelClasses"
        @mouseenter="handlePanelMouseEnter"
        @mouseleave="handlePanelMouseLeave"
      >
        <!-- Arrow -->
        <div v-if="showArrow" :class="arrowClasses" />
        
        <!-- Header -->
        <div v-if="$slots.header || title" class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
          <slot name="header">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ title }}
            </h3>
          </slot>
        </div>

        <!-- Content -->
        <div :class="contentClasses">
          <slot>
            <div v-if="content" v-html="content" />
          </slot>
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="border-t border-gray-200 px-4 py-3 dark:border-gray-700">
          <slot name="footer" />
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Popover as HeadlessPopover, PopoverButton, PopoverPanel } from '@headlessui/vue'

interface PopoverProps {
  triggerText?: string
  title?: string
  content?: string
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
  trigger?: 'click' | 'hover'
  showArrow?: boolean
  offset?: number
  width?: 'auto' | 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<PopoverProps>(), {
  triggerText: 'Open popover',
  placement: 'bottom',
  trigger: 'click',
  showArrow: true,
  offset: 8,
  width: 'auto',
  disabled: false
})

const Popover = HeadlessPopover

const triggerRef = ref()
const open = ref(false)
const hoverTimeout = ref<NodeJS.Timeout>()

const shouldShow = computed(() => {
  if (props.disabled) return false
  if (props.trigger === 'hover') return open.value
  return true // Let Headless UI handle click behavior
})

const triggerClasses = computed(() => {
  const base = 'inline-flex items-center justify-center focus:outline-none'
  const disabled = props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  
  return `${base} ${disabled}`
})

const panelClasses = computed(() => {
  const base = 'absolute z-50 transform bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700'
  
  const placements = {
    'top': 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    'bottom': 'top-full mt-2 left-1/2 -translate-x-1/2',
    'left': 'right-full mr-2 top-1/2 -translate-y-1/2',
    'right': 'left-full ml-2 top-1/2 -translate-y-1/2',
    'top-start': 'bottom-full mb-2 left-0',
    'top-end': 'bottom-full mb-2 right-0',
    'bottom-start': 'top-full mt-2 left-0',
    'bottom-end': 'top-full mt-2 right-0'
  }
  
  const widths = {
    auto: 'w-auto',
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96'
  }
  
  const placement = placements[props.placement]
  const width = widths[props.width]
  
  return `${base} ${placement} ${width}`
})

const arrowClasses = computed(() => {
  const base = 'absolute w-2 h-2 bg-white transform rotate-45 border dark:bg-gray-800'
  
  const positions = {
    'top': '-bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-gray-200 dark:border-gray-700',
    'bottom': '-top-1 left-1/2 -translate-x-1/2 border-l border-t border-gray-200 dark:border-gray-700',
    'left': '-right-1 top-1/2 -translate-y-1/2 border-t border-r border-gray-200 dark:border-gray-700',
    'right': '-left-1 top-1/2 -translate-y-1/2 border-b border-l border-gray-200 dark:border-gray-700',
    'top-start': '-bottom-1 left-3 border-r border-b border-gray-200 dark:border-gray-700',
    'top-end': '-bottom-1 right-3 border-r border-b border-gray-200 dark:border-gray-700',
    'bottom-start': '-top-1 left-3 border-l border-t border-gray-200 dark:border-gray-700',
    'bottom-end': '-top-1 right-3 border-l border-t border-gray-200 dark:border-gray-700'
  }
  
  return `${base} ${positions[props.placement]}`
})

const contentClasses = computed(() => {
  const base = 'p-4'
  return base
})

const handleMouseEnter = () => {
  if (props.trigger === 'hover' && !props.disabled) {
    clearTimeout(hoverTimeout.value)
    open.value = true
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    hoverTimeout.value = setTimeout(() => {
      open.value = false
    }, 100)
  }
}

const handlePanelMouseEnter = () => {
  if (props.trigger === 'hover') {
    clearTimeout(hoverTimeout.value)
  }
}

const handlePanelMouseLeave = () => {
  if (props.trigger === 'hover') {
    hoverTimeout.value = setTimeout(() => {
      open.value = false
    }, 100)
  }
}
</script>