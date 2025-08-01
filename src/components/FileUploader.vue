<template>
  <div>
    <div
      :class="dropzoneClasses"
      @drop="handleDrop"
      @dragover.prevent
      @dragenter.prevent="handleDragEnter"
      @dragleave.prevent="handleDragLeave"
    >
      <input
        ref="fileInput"
        type="file"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        class="sr-only"
        @change="handleFileSelect"
      />
      
      <div v-if="!hasFiles" class="text-center">
        <CloudArrowUpIcon class="mx-auto h-12 w-12 text-gray-400" />
        <div class="mt-4">
          <button
            type="button"
            :disabled="disabled"
            class="text-sm font-medium text-primary hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            @click="$refs.fileInput.click()"
          >
            Upload a file
          </button>
          <p class="mt-1 text-sm text-gray-500">
            or drag and drop
          </p>
        </div>
        <p class="mt-2 text-xs text-gray-500">
          {{ acceptText }}
          <span v-if="maxSize">up to {{ formatFileSize(maxSize) }}</span>
        </p>
      </div>

      <div v-else class="space-y-2">
        <div
          v-for="(file, index) in fileList"
          :key="index"
          class="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="flex items-center space-x-3">
            <DocumentIcon class="h-8 w-8 text-gray-400" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ file.name }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatFileSize(file.size) }}
              </p>
            </div>
          </div>
          <button
            type="button"
            :disabled="disabled"
            class="text-gray-400 hover:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
            @click="removeFile(index)"
          >
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>
        
        <button
          v-if="multiple"
          type="button"
          :disabled="disabled"
          class="mt-2 text-sm font-medium text-primary hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          @click="$refs.fileInput.click()"
        >
          Add more files
        </button>
      </div>
    </div>

    <div v-if="errors.length > 0" class="mt-2 space-y-1">
      <p
        v-for="(error, index) in errors"
        :key="index"
        class="text-sm text-red-600 dark:text-red-400"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import type { FileUploadProps } from '@/types/form-controls.types'

const props = withDefaults(defineProps<FileUploadProps>(), {
  multiple: false,
  disabled: false,
  dragDrop: true,
  maxSize: 10 * 1024 * 1024 // 10MB default
})

const emit = defineEmits<{
  'update:modelValue': [value: File | File[] | null]
}>()

const fileInput = ref<HTMLInputElement>()
const isDragging = ref(false)
const errors = ref<string[]>([])

const fileList = computed(() => {
  if (!props.modelValue) return []
  return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
})

const hasFiles = computed(() => fileList.value.length > 0)

const acceptText = computed(() => {
  if (!props.accept) return 'Any file type'
  return props.accept.split(',').map(type => {
    if (type.startsWith('.')) return type.toUpperCase()
    if (type.includes('/')) return type.split('/')[1].toUpperCase()
    return type
  }).join(', ')
})

const dropzoneClasses = computed(() => {
  const base = 'relative block w-full rounded-lg border-2 border-dashed p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
  
  const state = [
    isDragging.value 
      ? 'border-primary bg-primary/5' 
      : 'border-gray-300 dark:border-gray-600',
    props.disabled && 'cursor-not-allowed opacity-50'
  ].filter(Boolean).join(' ')
  
  return [base, state].join(' ')
})

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const validateFile = (file: File): string | null => {
  if (props.maxSize && file.size > props.maxSize) {
    return `${file.name} exceeds maximum size of ${formatFileSize(props.maxSize)}`
  }
  
  if (props.accept) {
    const acceptedTypes = props.accept.split(',').map(type => type.trim())
    const fileType = file.type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    
    const isAccepted = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return fileExtension === type.toLowerCase()
      }
      if (type.endsWith('/*')) {
        return fileType.startsWith(type.replace('/*', '/'))
      }
      return fileType === type
    })
    
    if (!isAccepted) {
      return `${file.name} is not an accepted file type`
    }
  }
  
  return null
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    addFiles(Array.from(input.files))
  }
  input.value = '' // Reset input
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
  
  if (props.disabled || !event.dataTransfer?.files) return
  
  addFiles(Array.from(event.dataTransfer.files))
}

const handleDragEnter = () => {
  if (!props.disabled && props.dragDrop) {
    isDragging.value = true
  }
}

const handleDragLeave = () => {
  isDragging.value = false
}

const addFiles = (newFiles: File[]) => {
  errors.value = []
  
  const validFiles: File[] = []
  
  newFiles.forEach(file => {
    const error = validateFile(file)
    if (error) {
      errors.value.push(error)
    } else {
      validFiles.push(file)
    }
  })
  
  if (validFiles.length === 0) return
  
  if (props.multiple) {
    const currentFiles = fileList.value
    emit('update:modelValue', [...currentFiles, ...validFiles])
  } else {
    emit('update:modelValue', validFiles[0])
  }
}

const removeFile = (index: number) => {
  if (props.multiple) {
    const newFiles = [...fileList.value]
    newFiles.splice(index, 1)
    emit('update:modelValue', newFiles.length > 0 ? newFiles : null)
  } else {
    emit('update:modelValue', null)
  }
}
</script>