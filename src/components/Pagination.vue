<template>
  <div class="flex items-center justify-between">
    <!-- Info section -->
    <div v-if="showInfo" class="flex flex-1 justify-between sm:hidden">
      <p class="text-sm text-gray-700 dark:text-gray-300">
        Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
      </p>
    </div>

    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div v-if="showInfo" class="flex items-center space-x-4">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
        </p>
        
        <!-- Page size selector -->
        <div v-if="showSizeChanger" class="flex items-center space-x-2">
          <label for="pageSize" class="text-sm text-gray-700 dark:text-gray-300">
            Show:
          </label>
          <Select
            :modelValue="itemsPerPage"
            :options="pageSizeSelectOptions"
            size="sm"
            @update:modelValue="handlePageSizeChange"
          />
        </div>
      </div>

      <!-- Pagination controls -->
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <!-- Previous button -->
        <button
          type="button"
          :disabled="currentPage === 1 || disabled"
          :class="getButtonClasses(true, currentPage === 1)"
          @click="goToPage(currentPage - 1)"
        >
          <span class="sr-only">Previous</span>
          <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
        </button>

        <!-- Page numbers -->
        <template v-for="page in visiblePages" :key="page">
          <button
            v-if="typeof page === 'number'"
            type="button"
            :disabled="disabled"
            :class="getPageButtonClasses(page === currentPage)"
            :aria-current="page === currentPage ? 'page' : undefined"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <span
            v-else
            :class="getEllipsisClasses()"
          >
            {{ page }}
          </span>
        </template>

        <!-- Next button -->
        <button
          type="button"
          :disabled="currentPage === totalPages || disabled"
          :class="getButtonClasses(false, currentPage === totalPages)"
          @click="goToPage(currentPage + 1)"
        >
          <span class="sr-only">Next</span>
          <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>

    <!-- Mobile pagination -->
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        type="button"
        :disabled="currentPage === 1 || disabled"
        :class="getMobileButtonClasses(currentPage === 1)"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </button>
      <span class="text-sm text-gray-700 dark:text-gray-300">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        type="button"
        :disabled="currentPage === totalPages || disabled"
        :class="getMobileButtonClasses(currentPage === totalPages)"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import Select from './Select.vue'
import type { PaginationProps } from '@/types/navigation.types'

const props = withDefaults(defineProps<PaginationProps>(), {
  showInfo: true,
  showSizeChanger: false,
  pageSizeOptions: () => [10, 20, 50, 100],
  disabled: false,
  itemsPerPage: 10
})

const emit = defineEmits<{
  'update:currentPage': [page: number]
  'update:itemsPerPage': [size: number]
  'change': [page: number, pageSize: number]
}>()

const startItem = computed(() => {
  return (props.currentPage - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
  const end = props.currentPage * props.itemsPerPage
  return Math.min(end, props.totalItems || end)
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = props.totalPages
  const current = props.currentPage
  
  if (total <= 7) {
    // Show all pages if total is small
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Show first page
    pages.push(1)
    
    if (current > 4) {
      pages.push('...')
    }
    
    // Show pages around current
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (current < total - 3) {
      pages.push('...')
    }
    
    // Show last page
    if (total > 1) {
      pages.push(total)
    }
  }
  
  return pages
})

const pageSizeSelectOptions = computed(() => {
  return props.pageSizeOptions.map(size => ({
    value: size,
    label: `${size} per page`
  }))
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
    emit('change', page, props.itemsPerPage)
  }
}

const handlePageSizeChange = (newSize: number) => {
  emit('update:itemsPerPage', newSize)
  emit('change', 1, newSize) // Reset to page 1 when changing page size
}

const getButtonClasses = (isPrevious: boolean, isDisabled: boolean) => {
  const base = 'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:text-gray-400 dark:hover:bg-gray-800'
  const position = isPrevious 
    ? 'rounded-l-md' 
    : 'rounded-r-md'
  const disabled = isDisabled 
    ? 'cursor-not-allowed opacity-50' 
    : 'hover:text-gray-400'
  const border = 'border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'
  
  return [base, position, disabled, border].join(' ')
}

const getPageButtonClasses = (isActive: boolean) => {
  const base = 'relative inline-flex items-center px-4 py-2 text-sm font-medium focus:z-20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
  
  if (isActive) {
    return `${base} z-10 bg-primary border-primary text-white`
  }
  
  return `${base} bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700`
}

const getEllipsisClasses = () => {
  return 'relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300'
}

const getMobileButtonClasses = (isDisabled: boolean) => {
  const base = 'relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
  
  return isDisabled 
    ? `${base} cursor-not-allowed opacity-50`
    : base
}
</script>