<template>
  <Switch
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :disabled="disabled"
    :class="containerClasses"
    v-slot="{ checked }"
  >
    <span class="sr-only">{{ label }}</span>
    <span
      :class="[
        checked ? bgColorClasses : 'bg-gray-200 dark:bg-gray-700',
        'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        sizeClasses.track,
        disabled && 'cursor-not-allowed opacity-50'
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          checked ? translateClasses : 'translate-x-0',
          'pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          sizeClasses.thumb
        ]"
      />
    </span>
  </Switch>
  <div v-if="label || description" class="ml-3">
    <label
      v-if="label"
      :for="id"
      :class="[
        'text-sm font-medium',
        disabled ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-gray-100'
      ]"
    >
      {{ label }}
    </label>
    <p
      v-if="description"
      :class="[
        'text-sm',
        disabled ? 'text-gray-300 dark:text-gray-700' : 'text-gray-500 dark:text-gray-400'
      ]"
    >
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Switch } from '@headlessui/vue'
import type { ToggleProps } from '@/types/form-controls.types'

const props = withDefaults(defineProps<ToggleProps>(), {
  modelValue: false,
  disabled: false,
  size: 'md'
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const sizeConfig = {
  sm: {
    track: 'h-5 w-9',
    thumb: 'h-4 w-4',
    translate: 'translate-x-4'
  },
  md: {
    track: 'h-6 w-11',
    thumb: 'h-5 w-5',
    translate: 'translate-x-5'
  },
  lg: {
    track: 'h-7 w-14',
    thumb: 'h-6 w-6',
    translate: 'translate-x-7'
  }
}

const sizeClasses = computed(() => sizeConfig[props.size])
const translateClasses = computed(() => sizeClasses.value.translate)
const bgColorClasses = computed(() => 'bg-primary dark:bg-primary')

const containerClasses = computed(() => {
  return [
    'group flex items-center',
    props.disabled && 'cursor-not-allowed'
  ].filter(Boolean).join(' ')
})
</script>