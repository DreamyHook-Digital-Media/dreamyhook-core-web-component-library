<template>
  <div class="space-y-1">
    <Label
      v-if="label"
      :for="labelFor"
      :required="required"
      :disabled="disabled"
    >
      {{ label }}
    </Label>
    <div>
      <slot />
    </div>
    <p
      v-if="error"
      :id="`${labelFor}-error`"
      class="text-sm text-red-600 dark:text-red-400"
    >
      {{ error }}
    </p>
    <p
      v-else-if="hint"
      :id="`${labelFor}-hint`"
      class="text-sm text-gray-500 dark:text-gray-400"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Label from './Label.vue'
import type { FormFieldProps } from '@/types/form.types'

const props = withDefaults(defineProps<FormFieldProps & { labelFor?: string }>(), {
  required: false,
  disabled: false
})

const labelFor = computed(() => {
  return props.labelFor || `field-${Math.random().toString(36).substring(2, 9)}`
})
</script>