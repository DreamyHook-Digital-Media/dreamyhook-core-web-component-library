<template>
  <Listbox 
    :modelValue="modelValue" 
    @update:modelValue="$emit('update:modelValue', $event)"
    :disabled="disabled"
    :multiple="multiple"
    v-slot="{ open }"
  >
    <div class="relative">
      <ListboxButton :class="buttonClasses">
        <span class="block truncate" :class="selectedTextClasses">
          {{ displayValue }}
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <Transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          v-show="open"
          :class="optionsClasses"
        >
          <div v-if="searchable" class="sticky top-0 z-10 bg-white dark:bg-gray-800">
            <div class="relative">
              <MagnifyingGlassIcon
                class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
              <input
                v-model="searchQuery"
                type="text"
                class="w-full border-0 border-b border-gray-200 bg-transparent py-2 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-0 dark:border-gray-700"
                placeholder="Search..."
                @keydown.stop
              />
            </div>
          </div>

          <div v-if="filteredOptions.length === 0" class="px-3 py-2 text-sm text-gray-500">
            No options found
          </div>

          <ListboxOption
            v-for="option in filteredOptions"
            v-slot="{ active, selected }"
            :key="option.value"
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
                  selected ? 'font-medium' : 'font-normal'
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
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import type { SelectProps } from '@/types/select.types'

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: 'Select an option',
  disabled: false,
  multiple: false,
  searchable: false,
  size: 'md',
  error: false
})

defineEmits<{
  'update:modelValue': [value: any]
}>()

const searchQuery = ref('')

const selectedOption = computed(() => {
  if (!props.modelValue) return null
  return props.options.find(opt => opt.value === props.modelValue)
})

const displayValue = computed(() => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    const count = props.modelValue.length
    return count === 0 ? props.placeholder : `${count} selected`
  }
  return selectedOption.value?.label || props.placeholder
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }
  
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(option =>
    option.label.toLowerCase().includes(query)
  )
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'py-1.5 pl-3 pr-10 text-sm',
    md: 'py-2 pl-3 pr-10 text-base',
    lg: 'py-3 pl-4 pr-10 text-lg'
  }
  return sizes[props.size]
})

const buttonClasses = computed(() => {
  const base = 'relative w-full cursor-default rounded-lg border bg-white text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-gray-800'
  
  const state = props.error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-primary focus:ring-primary dark:border-gray-600'
  
  const disabled = props.disabled ? 'cursor-not-allowed opacity-50' : ''
  
  return [base, sizeClasses.value, state, disabled].filter(Boolean).join(' ')
})

const selectedTextClasses = computed(() => {
  return !selectedOption.value && !props.multiple 
    ? 'text-gray-400 dark:text-gray-500' 
    : ''
})

const optionsClasses = computed(() => {
  const maxHeight = props.searchable ? 'max-h-72' : 'max-h-60'
  return `absolute z-10 mt-1 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700 sm:text-sm ${maxHeight}`
})
</script>