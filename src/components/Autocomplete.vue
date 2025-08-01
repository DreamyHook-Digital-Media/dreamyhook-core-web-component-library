<template>
  <Combobox 
    :modelValue="modelValue" 
    @update:modelValue="$emit('update:modelValue', $event)"
    :disabled="disabled"
    :multiple="multiple"
    v-slot="{ open }"
  >
    <div class="relative">
      <div class="relative">
        <ComboboxInput
          :class="inputClasses"
          :displayValue="displayValueFn"
          @change="query = $event.target.value"
          :placeholder="placeholder"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </ComboboxButton>
      </div>

      <Transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ComboboxOptions
          v-show="open"
          :class="optionsClasses"
        >
          <div
            v-if="loading"
            class="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-300"
          >
            <div class="flex items-center">
              <svg
                class="mr-2 h-4 w-4 animate-spin text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </div>
          </div>

          <div
            v-else-if="filteredOptions.length === 0 && query !== ''"
            class="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-300"
          >
            {{ noResultsText }}
          </div>

          <ComboboxOption
            v-for="option in filteredOptions"
            :key="option.value"
            v-slot="{ selected, active }"
            :value="option.value"
            :disabled="option.disabled"
            as="template"
          >
            <li
              :class="[
                'relative cursor-default select-none py-2 pl-10 pr-4',
                active ? 'bg-primary/10 text-primary' : 'text-gray-900 dark:text-gray-100',
                option.disabled && 'opacity-50 cursor-not-allowed'
              ]"
            >
              <span
                :class="[
                  'block truncate',
                  selected ? 'font-medium' : 'font-normal',
                ]"
              >
                {{ option.label }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </Transition>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import type { AutocompleteProps } from '@/types/select.types'

const props = withDefaults(defineProps<AutocompleteProps>(), {
  placeholder: 'Search...',
  disabled: false,
  multiple: false,
  size: 'md',
  error: false,
  loading: false,
  noResultsText: 'No results found'
})

defineEmits<{
  'update:modelValue': [value: any]
}>()

const query = ref('')

const defaultFilter = (query: string, items: typeof props.options) => {
  return query === ''
    ? items
    : items.filter((item) =>
        item.label
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )
}

const filteredOptions = computed(() => {
  const filterFn = props.filterFunction || defaultFilter
  return filterFn(query.value, props.options)
})

const displayValueFn = (value: any) => {
  if (props.displayValue) {
    return props.displayValue(value)
  }
  
  if (props.multiple && Array.isArray(value)) {
    return value.map(v => {
      const option = props.options.find(opt => opt.value === v)
      return option?.label || v
    }).join(', ')
  }
  
  const option = props.options.find(opt => opt.value === value)
  return option?.label || ''
}

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'py-1.5 pl-3 pr-10 text-sm',
    md: 'py-2 pl-3 pr-10 text-base',
    lg: 'py-3 pl-4 pr-10 text-lg'
  }
  return sizes[props.size]
})

const inputClasses = computed(() => {
  const base = 'w-full rounded-lg border bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-gray-800 dark:text-white'
  
  const state = props.error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-primary focus:ring-primary dark:border-gray-600'
  
  const disabled = props.disabled ? 'cursor-not-allowed opacity-50' : ''
  
  return [base, sizeClasses.value, state, disabled].filter(Boolean).join(' ')
})

const optionsClasses = computed(() => {
  return 'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700 sm:text-sm'
})
</script>