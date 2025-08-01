<template>
  <div class="relative inline-block">
    <div
      ref="triggerRef"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <slot />
    </div>

    <Teleport to="body">
      <div
        v-show="isVisible"
        ref="tooltipRef"
        :class="tooltipClasses"
        role="tooltip"
        :aria-hidden="!isVisible"
      >
        <!-- Arrow -->
        <div v-if="showArrow" :class="arrowClasses" />
        
        <!-- Content -->
        <div class="relative z-10">
          <slot name="content">
            {{ content }}
          </slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

interface TooltipProps {
  content?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'focus' | 'both'
  delay?: number
  hideDelay?: number
  showArrow?: boolean
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  offset?: number
}

const props = withDefaults(defineProps<TooltipProps>(), {
  content: '',
  placement: 'top',
  trigger: 'hover',
  delay: 100,
  hideDelay: 0,
  showArrow: true,
  variant: 'dark',
  size: 'md',
  disabled: false,
  offset: 8
})

const triggerRef = ref<HTMLElement>()
const tooltipRef = ref<HTMLElement>()
const isVisible = ref(false)
const showTimeout = ref<NodeJS.Timeout>()
const hideTimeout = ref<NodeJS.Timeout>()

const tooltipClasses = computed(() => {
  const base = 'absolute z-50 px-2 py-1 text-sm font-medium rounded shadow-lg pointer-events-none transition-opacity duration-200'
  
  const variants = {
    dark: 'bg-gray-900 text-white dark:bg-gray-700',
    light: 'bg-white text-gray-900 border border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700'
  }
  
  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2'
  }
  
  return `${base} ${variants[props.variant]} ${sizes[props.size]}`
})

const arrowClasses = computed(() => {
  const base = 'absolute w-2 h-2 transform rotate-45'
  
  const variantStyles = {
    dark: 'bg-gray-900 dark:bg-gray-700',
    light: 'bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700'
  }
  
  const positions = {
    top: '-bottom-1 left-1/2 -translate-x-1/2',
    bottom: '-top-1 left-1/2 -translate-x-1/2', 
    left: '-right-1 top-1/2 -translate-y-1/2',
    right: '-left-1 top-1/2 -translate-y-1/2'
  }
  
  return `${base} ${variantStyles[props.variant]} ${positions[props.placement]}`
})

const updateTooltipPosition = async () => {
  if (!triggerRef.value || !tooltipRef.value) return
  
  await nextTick()
  
  const trigger = triggerRef.value.getBoundingClientRect()
  const tooltip = tooltipRef.value.getBoundingClientRect()
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  
  let left = 0
  let top = 0
  
  switch (props.placement) {
    case 'top':
      left = trigger.left + trigger.width / 2 - tooltip.width / 2
      top = trigger.top - tooltip.height - props.offset
      break
    case 'bottom':
      left = trigger.left + trigger.width / 2 - tooltip.width / 2
      top = trigger.bottom + props.offset
      break
    case 'left':
      left = trigger.left - tooltip.width - props.offset
      top = trigger.top + trigger.height / 2 - tooltip.height / 2
      break
    case 'right':
      left = trigger.right + props.offset
      top = trigger.top + trigger.height / 2 - tooltip.height / 2
      break
  }
  
  // Keep tooltip within viewport bounds
  left = Math.max(8, Math.min(left, viewport.width - tooltip.width - 8))
  top = Math.max(8, Math.min(top, viewport.height - tooltip.height - 8))
  
  tooltipRef.value.style.left = `${left}px`
  tooltipRef.value.style.top = `${top}px`
}

const show = () => {
  if (props.disabled) return
  
  clearTimeout(hideTimeout.value)
  
  if (props.delay > 0) {
    showTimeout.value = setTimeout(() => {
      isVisible.value = true
    }, props.delay)
  } else {
    isVisible.value = true
  }
}

const hide = () => {
  clearTimeout(showTimeout.value)
  
  if (props.hideDelay > 0) {
    hideTimeout.value = setTimeout(() => {
      isVisible.value = false
    }, props.hideDelay)
  } else {
    isVisible.value = false
  }
}

const handleMouseEnter = () => {
  if (props.trigger === 'hover' || props.trigger === 'both') {
    show()
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover' || props.trigger === 'both') {
    hide()
  }
}

const handleFocus = () => {
  if (props.trigger === 'focus' || props.trigger === 'both') {
    show()
  }
}

const handleBlur = () => {
  if (props.trigger === 'focus' || props.trigger === 'both') {
    hide()
  }
}

watch(isVisible, (visible) => {
  if (visible) {
    nextTick(() => {
      updateTooltipPosition()
    })
  }
})
</script>