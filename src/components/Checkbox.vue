<template>
  <div class="flex items-start">
    <div class="flex h-5 items-center">
      <input
        :id="checkboxId"
        ref="checkboxRef"
        type="checkbox"
        :checked="isChecked"
        :indeterminate="indeterminate"
        :disabled="disabled"
        :name="name"
        :class="checkboxClasses"
        @change="handleChange"
      />
    </div>
    <div v-if="label || description" class="ml-3 text-sm">
      <label
        v-if="label"
        :for="checkboxId"
        :class="[
          'font-medium cursor-pointer',
          disabled 
            ? 'text-gray-400 dark:text-gray-600' 
            : 'text-gray-900 dark:text-gray-100'
        ]"
      >
        {{ label }}
      </label>
      <p
        v-if="description"
        :class="[
          disabled 
            ? 'text-gray-300 dark:text-gray-700' 
            : 'text-gray-500 dark:text-gray-400'
        ]"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { CheckboxProps } from '@/types/form-controls.types'

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  disabled: false,
  indeterminate: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | 'indeterminate']
}>()

const checkboxRef = ref<HTMLInputElement>()
const checkboxId = computed(() => 
  props.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`
)

const isChecked = computed(() => 
  props.modelValue === true || props.modelValue === 'indeterminate'
)

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }
  return sizes[props.size]
})

const checkboxClasses = computed(() => {
  const base = 'rounded border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800'
  
  const state = [
    isChecked.value || props.indeterminate
      ? 'bg-primary border-primary'
      : 'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600',
    props.disabled && 'cursor-not-allowed opacity-50'
  ].filter(Boolean).join(' ')
  
  return [base, sizeClasses.value, state].join(' ')
})

// Handle indeterminate state
watch(() => props.indeterminate, (value) => {
  if (checkboxRef.value) {
    checkboxRef.value.indeterminate = value
  }
})

onMounted(() => {
  if (checkboxRef.value && props.indeterminate) {
    checkboxRef.value.indeterminate = true
  }
})
</script>