<template>
  <RadioGroupHeadless
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :disabled="disabled"
  >
    <RadioGroupLabel class="sr-only">{{ name }}</RadioGroupLabel>
    <div :class="containerClasses">
      <RadioGroupOption
        v-for="option in options"
        :key="option.value"
        v-slot="{ checked }"
        :value="option.value"
        :disabled="option.disabled"
        as="template"
      >
        <div
          :class="[
            'flex items-start cursor-pointer',
            option.disabled && 'cursor-not-allowed opacity-50'
          ]"
        >
          <div class="flex h-5 items-center">
            <div
              :class="[
                'h-4 w-4 rounded-full border flex items-center justify-center',
                checked 
                  ? 'border-primary bg-primary' 
                  : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'
              ]"
            >
              <span
                v-if="checked"
                class="h-2 w-2 rounded-full bg-white"
              />
            </div>
          </div>
          <div class="ml-3 text-sm">
            <label
              :class="[
                'font-medium cursor-pointer',
                option.disabled 
                  ? 'text-gray-400 dark:text-gray-600' 
                  : 'text-gray-900 dark:text-gray-100'
              ]"
            >
              {{ option.label }}
            </label>
            <p
              v-if="option.description"
              :class="[
                option.disabled 
                  ? 'text-gray-300 dark:text-gray-700' 
                  : 'text-gray-500 dark:text-gray-400'
              ]"
            >
              {{ option.description }}
            </p>
          </div>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroupHeadless>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  RadioGroup as RadioGroupHeadless,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from '@headlessui/vue'
import type { RadioGroupProps } from '@/types/form-controls.types'

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
  orientation: 'vertical'
})

defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const containerClasses = computed(() => {
  const base = props.orientation === 'horizontal' 
    ? 'flex flex-wrap gap-4' 
    : 'space-y-2'
  
  return base
})
</script>