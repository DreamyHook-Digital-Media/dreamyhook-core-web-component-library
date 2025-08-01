<template>
  <div class="relative">
    <div v-if="leftIcon" class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <component
        :is="leftIcon"
        :class="iconClasses"
        aria-hidden="true"
      />
    </div>
    <input
      :id="id"
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :autocomplete="autocomplete"
      :class="inputClasses"
      :aria-invalid="error"
      :aria-describedby="error && errorMessage ? `${id}-error` : undefined"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <div v-if="rightIcon" class="absolute inset-y-0 right-0 flex items-center pr-3">
      <component
        :is="rightIcon"
        :class="iconClasses"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InputProps } from '@/types/form.types'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false
})

defineEmits<{
  'update:modelValue': [value: string | number]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}>()

const baseClasses = 'block w-full rounded-lg border shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  }
  
  let classes = sizes[props.size]
  
  if (props.leftIcon) {
    const leftPadding = {
      sm: 'pl-9',
      md: 'pl-10',
      lg: 'pl-11'
    }
    classes = classes.replace(/pl-\d+/, leftPadding[props.size])
  }
  
  if (props.rightIcon) {
    const rightPadding = {
      sm: 'pr-9',
      md: 'pr-10',
      lg: 'pr-11'
    }
    classes = classes.replace(/pr-\d+/, rightPadding[props.size])
  }
  
  return classes
})

const stateClasses = computed(() => {
  if (props.error) {
    return 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:text-red-400 dark:placeholder-red-600'
  }
  return 'border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400'
})

const inputClasses = computed(() => {
  return [
    baseClasses,
    sizeClasses.value,
    stateClasses.value
  ].join(' ')
})

const iconClasses = computed(() => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }
  const colors = props.error 
    ? 'text-red-400 dark:text-red-500' 
    : 'text-gray-400 dark:text-gray-500'
  
  return [sizes[props.size], colors].join(' ')
})
</script>