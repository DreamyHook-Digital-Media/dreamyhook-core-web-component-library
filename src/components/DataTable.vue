<template>
  <div class="flex flex-col">
    <!-- Header -->
    <div v-if="title || $slots.header" class="mb-4">
      <slot name="header">
        <h3 v-if="title" class="text-lg font-medium text-gray-900 dark:text-white">
          {{ title }}
        </h3>
      </slot>
    </div>

    <!-- Table container -->
    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <!-- Table header -->
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <!-- Selection column -->
            <th v-if="selectable" class="relative w-12 px-6 sm:w-16 sm:px-8">
              <Checkbox
                v-if="selectableType === 'multiple'"
                :checked="isAllSelected"
                :indeterminate="isIndeterminate"
                @change="toggleAll"
              />
            </th>

            <!-- Data columns -->
            <th
              v-for="column in columns"
              :key="column.key"
              :class="getHeaderClasses(column)"
              @click="handleSort(column)"
            >
              <div class="flex items-center space-x-1">
                <span>{{ column.label }}</span>
                <div v-if="column.sortable" class="flex flex-col">
                  <ChevronUpIcon
                    :class="getSortIconClasses(column, 'asc')"
                    class="h-3 w-3"
                  />
                  <ChevronDownIcon
                    :class="getSortIconClasses(column, 'desc')"
                    class="h-3 w-3 -mt-0.5"
                  />
                </div>
              </div>
            </th>

            <!-- Actions column -->
            <th v-if="$slots.actions" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <!-- Table body -->
        <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          <!-- Loading state -->
          <tr v-if="loading">
            <td :colspan="totalColumns" class="px-6 py-4">
              <div class="space-y-3">
                <SkeletonGroup
                  v-for="i in Math.min(pageSize, 5)"
                  :key="i"
                  variant="table"
                  :lines="1"
                />
              </div>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-else-if="!data || data.length === 0">
            <td :colspan="totalColumns" class="px-6 py-8 text-center">
              <slot name="empty">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ emptyMessage }}
                </div>
              </slot>
            </td>
          </tr>

          <!-- Data rows -->
          <tr
            v-else
            v-for="(row, index) in paginatedData"
            :key="getRowKey(row, index)"
            :class="getRowClasses(row, index)"
            @click="handleRowClick(row, index)"
          >
            <!-- Selection column -->
            <td v-if="selectable" class="relative w-12 px-6 sm:w-16 sm:px-8">
              <Checkbox
                v-if="selectableType === 'multiple'"
                :checked="isRowSelected(row)"
                @change="toggleRow(row)"
              />
              <input
                v-else
                type="radio"
                :name="radioGroupName"
                :checked="isRowSelected(row)"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600"
                @change="selectSingle(row)"
              />
            </td>

            <!-- Data columns -->
            <td
              v-for="column in columns"
              :key="column.key"
              :class="getCellClasses(column)"
            >
              <slot
                :name="`cell-${column.key}`"
                :row="row"
                :column="column"
                :value="getColumnValue(row, column.key)"
              >
                {{ formatCellValue(getColumnValue(row, column.key), column) }}
              </slot>
            </td>

            <!-- Actions column -->
            <td v-if="$slots.actions" class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <slot name="actions" :row="row" :index="index" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="paginated && !loading" class="mt-4">
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-items="filteredData.length"
        :page-size="pageSize"
        :show-page-size="true"
        :page-sizes="[10, 25, 50, 100]"
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import Checkbox from './Checkbox.vue'
import Pagination from './Pagination.vue'
import SkeletonGroup from './SkeletonGroup.vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  format?: 'text' | 'number' | 'currency' | 'date' | 'boolean'
}

interface DataTableProps {
  columns: Column[]
  data?: any[]
  loading?: boolean
  title?: string
  selectable?: boolean
  selectableType?: 'single' | 'multiple'
  selectedRows?: any[]
  rowKey?: string
  paginated?: boolean
  pageSize?: number
  currentPage?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  emptyMessage?: string
  clickableRows?: boolean
}

const props = withDefaults(defineProps<DataTableProps>(), {
  data: () => [],
  loading: false,
  selectable: false,
  selectableType: 'multiple',
  selectedRows: () => [],
  rowKey: 'id',
  paginated: true,
  pageSize: 10,
  currentPage: 1,
  sortOrder: 'asc',
  emptyMessage: 'No data available',
  clickableRows: false
})

const emit = defineEmits<{
  'update:selectedRows': [rows: any[]]
  'update:currentPage': [page: number]
  'update:pageSize': [size: number]
  'update:sortBy': [key: string]
  'update:sortOrder': [order: 'asc' | 'desc']
  'rowClick': [row: any, index: number]
  'sort': [column: Column, order: 'asc' | 'desc']
}>()

const internalSelectedRows = ref([...props.selectedRows])
const internalCurrentPage = ref(props.currentPage)
const internalPageSize = ref(props.pageSize)
const internalSortBy = ref(props.sortBy || '')
const internalSortOrder = ref(props.sortOrder)

const radioGroupName = `datatable-${Math.random().toString(36).substr(2, 9)}`

const totalColumns = computed(() => {
  let count = props.columns.length
  if (props.selectable) count++
  return count
})

const filteredData = computed(() => {
  if (!props.data) return []
  
  // Apply sorting
  let result = [...props.data]
  
  if (internalSortBy.value) {
    result.sort((a, b) => {
      const aVal = getColumnValue(a, internalSortBy.value)
      const bVal = getColumnValue(b, internalSortBy.value)
      
      if (aVal === bVal) return 0
      
      const comparison = aVal > bVal ? 1 : -1
      return internalSortOrder.value === 'asc' ? comparison : -comparison
    })
  }
  
  return result
})

const paginatedData = computed(() => {
  if (!props.paginated) return filteredData.value
  
  const start = (internalCurrentPage.value - 1) * internalPageSize.value
  const end = start + internalPageSize.value
  
  return filteredData.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / internalPageSize.value)
})

const isAllSelected = computed(() => {
  return paginatedData.value.length > 0 && 
         paginatedData.value.every(row => isRowSelected(row))
})

const isIndeterminate = computed(() => {
  const selectedCount = paginatedData.value.filter(row => isRowSelected(row)).length
  return selectedCount > 0 && selectedCount < paginatedData.value.length
})

const getRowKey = (row: any, index: number) => {
  return row[props.rowKey] || index
}

const getColumnValue = (row: any, key: string) => {
  return key.split('.').reduce((obj, k) => obj?.[k], row)
}

const formatCellValue = (value: any, column: Column) => {
  if (value === null || value === undefined) return ''
  
  switch (column.format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value)
    case 'number':
      return new Intl.NumberFormat().format(value)
    case 'date':
      return new Date(value).toLocaleDateString()
    case 'boolean':
      return value ? 'Yes' : 'No'
    default:
      return String(value)
  }
}

const isRowSelected = (row: any) => {
  const key = getRowKey(row, 0)
  return internalSelectedRows.value.some(selected => 
    getRowKey(selected, 0) === key
  )
}

const toggleRow = (row: any) => {
  const key = getRowKey(row, 0)
  const index = internalSelectedRows.value.findIndex(selected => 
    getRowKey(selected, 0) === key
  )
  
  if (index > -1) {
    internalSelectedRows.value.splice(index, 1)
  } else {
    internalSelectedRows.value.push(row)
  }
  
  emit('update:selectedRows', internalSelectedRows.value)
}

const selectSingle = (row: any) => {
  internalSelectedRows.value = [row]
  emit('update:selectedRows', internalSelectedRows.value)
}

const toggleAll = () => {
  if (isAllSelected.value) {
    // Deselect all visible rows
    const visibleKeys = paginatedData.value.map(row => getRowKey(row, 0))
    internalSelectedRows.value = internalSelectedRows.value.filter(row => 
      !visibleKeys.includes(getRowKey(row, 0))
    )
  } else {
    // Select all visible rows
    const newSelections = paginatedData.value.filter(row => !isRowSelected(row))
    internalSelectedRows.value.push(...newSelections)
  }
  
  emit('update:selectedRows', internalSelectedRows.value)
}

const handleSort = (column: Column) => {
  if (!column.sortable) return
  
  if (internalSortBy.value === column.key) {
    internalSortOrder.value = internalSortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    internalSortBy.value = column.key
    internalSortOrder.value = 'asc'
  }
  
  emit('update:sortBy', internalSortBy.value)
  emit('update:sortOrder', internalSortOrder.value)
  emit('sort', column, internalSortOrder.value)
}

const handlePageChange = (page: number) => {
  internalCurrentPage.value = page
  emit('update:currentPage', page)
}

const handlePageSizeChange = (size: number) => {
  internalPageSize.value = size
  internalCurrentPage.value = 1 // Reset to first page
  emit('update:pageSize', size)
  emit('update:currentPage', 1)
}

const handleRowClick = (row: any, index: number) => {
  if (props.clickableRows) {
    emit('rowClick', row, index)
  }
}

const getHeaderClasses = (column: Column) => {
  const base = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400'
  const sortable = column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''
  const align = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }
  
  return `${base} ${sortable} ${align[column.align || 'left']}`
}

const getCellClasses = (column: Column) => {
  const base = 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'
  const align = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }
  
  return `${base} ${align[column.align || 'left']}`
}

const getRowClasses = (row: any, index: number) => {
  const base = 'hover:bg-gray-50 dark:hover:bg-gray-800'
  const clickable = props.clickableRows ? 'cursor-pointer' : ''
  const selected = isRowSelected(row) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
  
  return `${base} ${clickable} ${selected}`
}

const getSortIconClasses = (column: Column, direction: 'asc' | 'desc') => {
  const base = 'transition-colors'
  const active = internalSortBy.value === column.key && internalSortOrder.value === direction
  const color = active ? 'text-primary' : 'text-gray-400'
  
  return `${base} ${color}`
}

// Watch for prop changes
watch(() => props.selectedRows, (newVal) => {
  internalSelectedRows.value = [...newVal]
})

watch(() => props.currentPage, (newVal) => {
  internalCurrentPage.value = newVal
})

watch(() => props.pageSize, (newVal) => {
  internalPageSize.value = newVal
})

watch(() => props.sortBy, (newVal) => {
  internalSortBy.value = newVal || ''
})

watch(() => props.sortOrder, (newVal) => {
  internalSortOrder.value = newVal
})
</script>