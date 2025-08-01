import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  variant: ToastType
  title?: string
  message?: string
  duration?: number
  dismissible?: boolean
  showIcon?: boolean
  actionText?: string
  visible?: boolean
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      id,
      duration: 5000,
      dismissible: true,
      showIcon: true,
      visible: true,
      ...toast
    }
    
    toasts.value.push(newToast)
    
    // Auto-remove if duration is set
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }
    
    return id
  }

  // Convenience methods
  const success = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({
      variant: 'success',
      title,
      message,
      ...options
    })
  }

  const error = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({
      variant: 'error',
      title,
      message,
      duration: 0, // Don't auto-dismiss errors by default
      ...options
    })
  }

  const warning = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({
      variant: 'warning',
      title,
      message,
      ...options
    })
  }

  const info = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({
      variant: 'info',
      title,
      message,
      ...options
    })
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    toasts.value = []
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    warning,
    info
  }
})