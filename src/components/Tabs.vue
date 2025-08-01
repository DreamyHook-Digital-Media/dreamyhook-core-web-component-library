<template>
  <div>
    <!-- Tab navigation -->
    <div :class="tabListClasses" role="tablist">
      <button
        v-for="item in items"
        :key="item.id"
        :id="`tab-${item.id}`"
        type="button"
        role="tab"
        :class="getTabClasses(item.id === activeTab)"
        :aria-controls="`panel-${item.id}`"
        :aria-selected="item.id === activeTab"
        :disabled="item.disabled"
        @click="selectTab(item.id)"
      >
        <component
          v-if="item.icon"
          :is="item.icon"
          :class="iconClasses"
          aria-hidden="true"
        />
        <span>{{ item.label }}</span>
        <Badge
          v-if="item.badge"
          variant="primary"
          size="sm"
          :class="badgeClasses"
        >
          {{ item.badge }}
        </Badge>
      </button>
    </div>

    <!-- Tab panels -->
    <div class="mt-4">
      <div
        v-for="item in items"
        :key="`panel-${item.id}`"
        :id="`panel-${item.id}`"
        role="tabpanel"
        :aria-labelledby="`tab-${item.id}`"
        :hidden="item.id !== activeTab"
        tabindex="0"
      >
        <slot :name="item.id" :item="item">
          <div v-if="item.content" v-html="item.content" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import Badge from './Badge.vue'
import type { TabsProps } from '@/types/navigation.types'

const props = withDefaults(defineProps<TabsProps>(), {
  items: () => [],
  variant: 'default',
  size: 'md',
  fullWidth: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [activeTab: string, previousTab: string | null]
}>()

const activeTab = computed({
  get: () => props.modelValue || props.items[0]?.id || '',
  set: (value: string) => emit('update:modelValue', value)
})

const selectTab = (tabId: string) => {
  const previousTab = activeTab.value
  const item = props.items.find(item => item.id === tabId)
  
  if (item && !item.disabled) {
    activeTab.value = tabId
    emit('change', tabId, previousTab)
  }
}

const tabListClasses = computed(() => {
  const base = 'flex'
  const variant = getVariantClasses()
  const width = props.fullWidth ? 'w-full' : ''
  const size = getSizeClasses()
  
  return [base, variant, width, size].filter(Boolean).join(' ')
})

const getVariantClasses = () => {
  switch (props.variant) {
    case 'pills':
      return 'space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800'
    case 'underline':
      return 'border-b border-gray-200 space-x-8 dark:border-gray-700'
    default:
      return 'border-b border-gray-200 space-x-4 dark:border-gray-700'
  }
}

const getSizeClasses = () => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return sizes[props.size]
}

const getTabClasses = (isActive: boolean) => {
  const base = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  
  const size = getTabSizeClasses()
  const width = props.fullWidth ? 'flex-1' : ''
  
  switch (props.variant) {
    case 'pills':
      return [
        base,
        size,
        width,
        'rounded-md',
        isActive 
          ? 'bg-white text-primary shadow-sm dark:bg-gray-900' 
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
      ].filter(Boolean).join(' ')
    
    case 'underline':
      return [
        base,
        size,
        width,
        'border-b-2 pb-2',
        isActive
          ? 'border-primary text-primary'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
      ].filter(Boolean).join(' ')
    
    default:
      return [
        base,
        size,
        width,
        'rounded-t-lg border-b-2 px-4 py-2',
        isActive
          ? 'border-primary text-primary bg-white dark:bg-gray-900'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
      ].filter(Boolean).join(' ')
  }
}

const getTabSizeClasses = () => {
  const sizeMap = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3'
  }
  
  return props.variant === 'underline' 
    ? sizeMap[props.size].replace(/px-\d+/, '') // Remove horizontal padding for underline
    : sizeMap[props.size]
}

const iconClasses = computed(() => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }
  return `${sizes[props.size]} ${props.items.some(item => item.icon) ? 'mr-2' : ''}`
})

const badgeClasses = computed(() => {
  return 'ml-2'
})

// Initialize active tab if not provided
watch(
  () => props.items,
  (newItems) => {
    if (!activeTab.value && newItems.length > 0) {
      activeTab.value = newItems[0].id
    }
  },
  { immediate: true }
)
</script>