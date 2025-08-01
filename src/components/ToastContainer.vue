<template>
  <Teleport to="body">
    <div
      v-if="toasts.length > 0"
      :class="containerClasses"
      aria-live="assertive"
    >
      <TransitionGroup
        tag="div"
        name="toast"
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        move-class="transition-all duration-300"
        class="space-y-4"
      >
        <Toast
          v-for="toast in toasts"
          :key="toast.id"
          v-bind="toast"
          @close="removeToast"
          @action="handleToastAction"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useToastStore } from '@/store/useToastStore'
import Toast from './Toast.vue'

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxToasts?: number
}

const props = withDefaults(defineProps<ToastContainerProps>(), {
  position: 'top-right',
  maxToasts: 5
})

const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)

const containerClasses = computed(() => {
  const base = 'fixed z-50 pointer-events-none'
  const spacing = 'p-6'
  
  const positions = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2'
  }
  
  return `${base} ${spacing} ${positions[props.position]}`
})

const removeToast = (id?: string) => {
  if (id) {
    toastStore.removeToast(id)
  }
}

const handleToastAction = (id?: string) => {
  // Emit or handle toast action
  // For now, just remove the toast
  if (id) {
    toastStore.removeToast(id)
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>