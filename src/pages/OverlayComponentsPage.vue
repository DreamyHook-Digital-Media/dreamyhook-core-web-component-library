<template>
  <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Overlay Components
      </h1>
      <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Modal dialogs, popovers, tooltips, notifications, and feedback components.
      </p>
    </div>

    <div class="space-y-12">
      <!-- Modals Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Modal Dialogs
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Button @click="showBasicModal = true">
            Basic Modal
          </Button>
          <Button @click="showConfirmModal = true" variant="secondary">
            Confirmation Modal
          </Button>
          <Button @click="showLargeModal = true" variant="outline">
            Large Modal
          </Button>
        </div>

        <!-- Basic Modal -->
        <Modal
          v-model:isOpen="showBasicModal"
          title="Basic Modal"
          description="This is a basic modal dialog example."
        >
          <p class="text-sm text-gray-500 dark:text-gray-400">
            This is the modal content. You can put any content here including forms, text, images, etc.
          </p>
        </Modal>

        <!-- Confirmation Modal -->
        <Modal
          v-model:isOpen="showConfirmModal"
          title="Confirm Action"
          description="Are you sure you want to delete this item?"
          :show-cancel="true"
          :show-confirm="true"
          confirm-text="Delete"
          cancel-text="Cancel"
          @confirm="handleConfirm"
          @cancel="showConfirmModal = false"
        />

        <!-- Large Modal -->
        <Modal
          v-model:isOpen="showLargeModal"
          title="Large Modal"
          size="lg"
        >
          <div class="space-y-4">
            <p>This is a larger modal with more content space.</p>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <TextInput placeholder="Enter first name" />
              </div>
              <div>
                <Label>Last Name</Label>
                <TextInput placeholder="Enter last name" />
              </div>
            </div>
          </div>
        </Modal>
      </section>

      <!-- Popover Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Popovers
        </h2>
        
        <div class="flex flex-wrap gap-4">
          <Popover 
            placement="top"
            title="Top Popover"
            content="This popover appears on top"
            width="md"
          >
            <template #trigger>
              <Button variant="outline">Top Popover</Button>
            </template>
          </Popover>

          <Popover 
            placement="bottom"
            title="Bottom Popover"
            width="md"
          >
            <template #trigger>
              <Button variant="outline">Bottom Popover</Button>
            </template>
            <template #default>
              <div class="space-y-2">
                <p class="text-sm">Custom popover content with rich formatting.</p>
                <Button size="sm" variant="primary">Action</Button>
              </div>
            </template>
          </Popover>

          <Popover 
            placement="right"
            trigger="hover"
            title="Hover Popover"
            content="This shows on hover"
            width="sm"
          >
            <template #trigger>
              <Button variant="outline">Hover Me</Button>
            </template>
          </Popover>
        </div>
      </section>

      <!-- Tooltips Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Tooltips
        </h2>
        
        <div class="flex flex-wrap gap-4">
          <Tooltip content="This is a tooltip on top" placement="top">
            <Button variant="outline">Top Tooltip</Button>
          </Tooltip>

          <Tooltip content="This is a tooltip on bottom" placement="bottom">
            <Button variant="outline">Bottom Tooltip</Button>
          </Tooltip>

          <Tooltip 
            content="Light theme tooltip" 
            placement="right" 
            variant="light"
          >
            <Button variant="outline">Light Tooltip</Button>
          </Tooltip>

          <Tooltip 
            content="Large tooltip with more content" 
            placement="left" 
            size="lg"
            :delay="500"
          >
            <Button variant="outline">Delayed Tooltip</Button>
          </Tooltip>
        </div>
      </section>

      <!-- Toast Notifications Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Toast Notifications
        </h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Button @click="showSuccessToast" variant="outline">
            Success Toast
          </Button>
          <Button @click="showErrorToast" variant="outline">
            Error Toast
          </Button>
          <Button @click="showWarningToast" variant="outline">
            Warning Toast
          </Button>
          <Button @click="showInfoToast" variant="outline">
            Info Toast
          </Button>
        </div>

        <ToastContainer position="top-right" />
      </section>

      <!-- Alert Banners Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Alert Banners
        </h2>
        
        <div class="space-y-4">
          <Alert
            variant="info"
            title="Information"
            message="This is an informational alert with some additional context."
            :dismissible="true"
            border
          />

          <Alert
            variant="success"
            title="Success!"
            message="Your action was completed successfully."
            :dismissible="true"
          />

          <Alert
            variant="warning"
            title="Warning"
            message="Please review your settings before proceeding."
            action-text="Review Settings"
            @action="handleAlertAction"
          />

          <Alert
            variant="error"
            title="Error"
            message="There was an error processing your request."
            action-text="Try Again"
            action-variant="secondary"
            :dismissible="true"
            @action="handleAlertAction"
          />
        </div>
      </section>

      <!-- Skeleton Loading Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Skeleton Loading
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Single Skeletons -->
          <div>
            <h3 class="text-lg font-medium mb-4">Single Skeletons</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Text Skeleton</p>
                <Skeleton width="75%" />
              </div>
              
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Circular Skeleton</p>
                <Skeleton variant="circular" width="64px" height="64px" />
              </div>
              
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Rectangular Skeleton</p>
                <Skeleton variant="rectangular" width="200px" height="120px" />
              </div>
            </div>
          </div>

          <!-- Skeleton Groups -->
          <div>
            <h3 class="text-lg font-medium mb-4">Skeleton Groups</h3>
            <div class="space-y-6">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Avatar + Text</p>
                <SkeletonGroup variant="avatar-text" />
              </div>
              
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Card Layout</p>
                <div class="max-w-sm">
                  <SkeletonGroup variant="card" />
                </div>
              </div>
              
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">List Items</p>
                <SkeletonGroup variant="list" :lines="4" />
              </div>
            </div>
          </div>
        </div>

        <!-- Loading Toggle -->
        <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium">Loading State Demo</h3>
            <Button @click="toggleLoading" variant="outline">
              {{ isLoading ? 'Hide Loading' : 'Show Loading' }}
            </Button>
          </div>
          
          <div v-if="isLoading" class="space-y-4">
            <SkeletonGroup variant="avatar-text" />
            <SkeletonGroup variant="text" :lines="3" />
          </div>
          
          <div v-else class="space-y-4">
            <div class="flex items-center space-x-4">
              <Avatar initials="JD" />
              <div>
                <h4 class="font-medium">John Doe</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p>
              </div>
            </div>
            <p class="text-gray-700 dark:text-gray-300">
              This is the actual content that would be shown after loading is complete.
              It replaces the skeleton loading state seamlessly.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToastStore } from '@/store/useToastStore'
import {
  Alert,
  Avatar,
  Button,
  Label,
  Modal,
  Popover,
  Skeleton,
  SkeletonGroup,
  TextInput,
  Toast,
  ToastContainer,
  Tooltip
} from '@/components'

// Modal states
const showBasicModal = ref(false)
const showConfirmModal = ref(false)
const showLargeModal = ref(false)

// Loading state
const isLoading = ref(false)

// Toast store
const toastStore = useToastStore()

// Modal handlers
const handleConfirm = () => {
  showConfirmModal.value = false
  toastStore.success('Item deleted', 'The item has been successfully deleted.')
}

// Toast handlers
const showSuccessToast = () => {
  toastStore.success('Success!', 'Your action was completed successfully.')
}

const showErrorToast = () => {
  toastStore.error('Error!', 'Something went wrong. Please try again.')
}

const showWarningToast = () => {
  toastStore.warning('Warning!', 'Please review your settings.')
}

const showInfoToast = () => {
  toastStore.info('Information', 'Here is some important information.')
}

// Alert handlers
const handleAlertAction = () => {
  toastStore.info('Action clicked', 'Alert action was triggered.')
}

// Loading toggle
const toggleLoading = () => {
  isLoading.value = !isLoading.value
}
</script>