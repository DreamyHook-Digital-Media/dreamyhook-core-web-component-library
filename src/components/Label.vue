<template>
  <label
    :for="for"
    :class="labelClasses"
  >
    <slot />
    <span v-if="required" class="ml-1 text-red-500" aria-label="required">*</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LabelProps } from '@/types/form.types'

const props = withDefaults(defineProps<LabelProps>(), {
  required: false,
  disabled: false
})

const labelClasses = computed(() => {
  const base = 'block text-sm font-medium'
  const state = props.disabled
    ? 'text-gray-400 dark:text-gray-600'
    : 'text-gray-700 dark:text-gray-300'
  
  return [base, state].join(' ')
})
</script>