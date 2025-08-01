<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50" @close="handleClose">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/75 dark:bg-black/85" />
      </TransitionChild>

      <!-- Modal container -->
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel :class="modalClasses">
              <!-- Header -->
              <div v-if="$slots.header || title" class="flex items-start justify-between">
                <div class="flex-1">
                  <slot name="header">
                    <DialogTitle 
                      as="h3" 
                      class="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
                    >
                      {{ title }}
                    </DialogTitle>
                    <p v-if="description" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {{ description }}
                    </p>
                  </slot>
                </div>
                <button
                  v-if="closable"
                  type="button"
                  class="rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-gray-800 dark:hover:bg-gray-700"
                  @click="handleClose"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Divider -->
              <div 
                v-if="($slots.header || title) && ($slots.default || content)"
                class="my-6 border-t border-gray-200 dark:border-gray-700"
              />

              <!-- Body -->
              <div v-if="$slots.default || content" :class="bodyClasses">
                <slot>
                  <div v-if="content" v-html="content" />
                </slot>
              </div>

              <!-- Divider -->
              <div 
                v-if="($slots.default || content) && $slots.footer"
                class="my-6 border-t border-gray-200 dark:border-gray-700"
              />

              <!-- Footer -->
              <div v-if="$slots.footer" class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                <slot name="footer">
                  <div class="flex space-x-2">
                    <Button
                      v-if="showCancel"
                      variant="outline"
                      @click="handleCancel"
                    >
                      {{ cancelText }}
                    </Button>
                    <Button
                      v-if="showConfirm"
                      :variant="confirmVariant"
                      :loading="loading"
                      @click="handleConfirm"
                    >
                      {{ confirmText }}
                    </Button>
                  </div>
                </slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import Button from './Button.vue'

interface ModalProps {
  isOpen: boolean
  title?: string
  description?: string
  content?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  closeOnBackdrop?: boolean
  loading?: boolean
  showCancel?: boolean
  showConfirm?: boolean
  cancelText?: string
  confirmText?: string
  confirmVariant?: 'primary' | 'secondary' | 'outline' | 'ghost'
}

const props = withDefaults(defineProps<ModalProps>(), {
  size: 'md',
  closable: true,
  closeOnBackdrop: true,
  loading: false,
  showCancel: false,
  showConfirm: false,
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  confirmVariant: 'primary'
})

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'close': []
  'cancel': []
  'confirm': []
}>()

const modalClasses = computed(() => {
  const base = 'relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:p-6'
  
  const sizes = {
    sm: 'sm:max-w-sm sm:w-full',
    md: 'sm:max-w-md sm:w-full',
    lg: 'sm:max-w-lg sm:w-full',
    xl: 'sm:max-w-xl sm:w-full',
    full: 'sm:max-w-4xl sm:w-full'
  }
  
  return `${base} ${sizes[props.size]}`
})

const bodyClasses = computed(() => {
  return 'text-sm text-gray-500 dark:text-gray-400'
})

const handleClose = () => {
  if (props.closable && !props.loading) {
    emit('update:isOpen', false)
    emit('close')
  }
}

const handleCancel = () => {
  if (!props.loading) {
    emit('cancel')
    emit('update:isOpen', false)
  }
}

const handleConfirm = () => {
  emit('confirm')
}
</script>