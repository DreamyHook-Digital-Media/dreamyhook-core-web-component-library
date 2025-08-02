<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Accessibility Examples
          </h1>
          <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">
            WCAG compliant components with best practices for inclusive design
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      <!-- Keyboard Navigation -->
      <section>
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Keyboard Navigation
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            All interactive components support full keyboard navigation. Try using Tab, Enter, Space, and Arrow keys.
          </p>
        </div>

        <Card variant="bordered">
          <div class="p-6 space-y-6">
            <!-- Skip Links -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Skip Links
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Skip links help keyboard users navigate quickly. Press Tab to see the skip link.
              </p>
              
              <div class="relative">
                <a
                  href="#main-content"
                  class="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
                >
                  Skip to main content
                </a>
                <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Focus here and press Tab to reveal the skip link
                  </p>
                </div>
              </div>
            </div>

            <!-- Focus Indicators -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Clear Focus Indicators
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                All focusable elements have visible focus indicators. Tab through these elements to see.
              </p>
              
              <div class="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <TextInput placeholder="Text input field" />
                <Select
                  :options="[
                    { value: 'opt1', label: 'Option 1' },
                    { value: 'opt2', label: 'Option 2' }
                  ]"
                  placeholder="Select an option"
                />
                <Toggle v-model="toggleValue" label="Toggle switch" />
              </div>
            </div>

            <!-- Tab Trapping -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Focus Management (Tab Trapping)
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Modals and overlays trap focus within them. Try opening the modal and tabbing through it.
              </p>
              
              <Button variant="primary" @click="showTrapModal = true">
                Open Modal with Focus Trap
              </Button>
              
              <Modal
                v-model:isOpen="showTrapModal"
                title="Focus Trapped Modal"
                size="md"
              >
                <div class="space-y-4">
                  <p class="text-gray-600 dark:text-gray-300">
                    Tab navigation is trapped within this modal. Press Tab to cycle through elements.
                  </p>
                  
                  <FormField label="First Name">
                    <TextInput placeholder="Enter first name" />
                  </FormField>
                  
                  <FormField label="Last Name">
                    <TextInput placeholder="Enter last name" />
                  </FormField>
                  
                  <div class="flex justify-end space-x-3">
                    <Button variant="outline" @click="showTrapModal = false">
                      Cancel
                    </Button>
                    <Button variant="primary" @click="showTrapModal = false">
                      Save
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </Card>
      </section>

      <!-- Screen Reader Support -->
      <section>
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Screen Reader Support
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Components include proper ARIA attributes and semantic HTML for screen reader compatibility.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- ARIA Labels -->
          <Card variant="bordered">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                ARIA Labels & Descriptions
              </h3>
              
              <div class="space-y-4">
                <!-- Icon Button with Label -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Icon buttons with screen reader labels:
                  </p>
                  <div class="flex gap-2">
                    <Button
                      variant="ghost"
                      aria-label="Edit item"
                      title="Edit"
                    >
                      <PencilIcon class="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      aria-label="Delete item"
                      title="Delete"
                    >
                      <TrashIcon class="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      aria-label="Share item"
                      title="Share"
                    >
                      <ShareIcon class="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <!-- Form with ARIA -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Form fields with descriptions and error announcements:
                  </p>
                  <FormField
                    label="Email Address"
                    error="Please enter a valid email"
                    hint="We'll never share your email"
                  >
                    <TextInput
                      type="email"
                      placeholder="user@example.com"
                      error
                      aria-describedby="email-error email-hint"
                      aria-invalid="true"
                    />
                    <span id="email-error" class="sr-only">
                      Error: Please enter a valid email
                    </span>
                    <span id="email-hint" class="sr-only">
                      Hint: We'll never share your email
                    </span>
                  </FormField>
                </div>

                <!-- Progress Indicators -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Progress with ARIA:
                  </p>
                  <div
                    role="progressbar"
                    :aria-valuenow="progressValue"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :aria-label="`Loading progress: ${progressValue}%`"
                    class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700"
                  >
                    <div
                      class="bg-blue-500 h-2 rounded-full transition-all"
                      :style="{ width: `${progressValue}%` }"
                    ></div>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {{ progressValue }}% Complete
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <!-- Live Regions -->
          <Card variant="bordered">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Live Regions & Announcements
              </h3>
              
              <div class="space-y-4">
                <!-- Status Messages -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Status updates announced to screen readers:
                  </p>
                  <div class="space-y-2">
                    <Button
                      variant="primary"
                      @click="announceSuccess"
                    >
                      Announce Success
                    </Button>
                    <Button
                      variant="outline"
                      @click="announceError"
                    >
                      Announce Error
                    </Button>
                  </div>
                  
                  <!-- Live Region -->
                  <div
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    class="sr-only"
                  >
                    {{ liveAnnouncement }}
                  </div>
                  
                  <!-- Visual Status -->
                  <div
                    v-if="liveAnnouncement"
                    class="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md"
                  >
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      Last announcement: {{ liveAnnouncement }}
                    </p>
                  </div>
                </div>

                <!-- Loading States -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Loading states with ARIA:
                  </p>
                  <Button
                    variant="primary"
                    :loading="isLoading"
                    @click="simulateLoading"
                    :aria-busy="isLoading"
                    :aria-label="isLoading ? 'Loading, please wait' : 'Submit form'"
                  >
                    <span :aria-hidden="isLoading">Submit</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <!-- Form Accessibility -->
      <section>
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Accessible Forms
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Forms with proper labeling, error handling, and field associations.
          </p>
        </div>

        <Card variant="bordered">
          <div class="p-6">
            <form @submit.prevent="handleSubmit" class="space-y-6 max-w-2xl">
              <!-- Fieldset for Related Fields -->
              <fieldset class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <legend class="text-lg font-semibold text-gray-900 dark:text-white px-2">
                  Personal Information
                </legend>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <FormField label="First Name" required>
                    <TextInput
                      v-model="form.firstName"
                      id="first-name"
                      :error="!!errors.firstName"
                      :aria-describedby="errors.firstName ? 'first-name-error' : undefined"
                      :aria-invalid="!!errors.firstName"
                    />
                    <span
                      v-if="errors.firstName"
                      id="first-name-error"
                      class="text-sm text-red-600 dark:text-red-400 mt-1"
                    >
                      {{ errors.firstName }}
                    </span>
                  </FormField>
                  
                  <FormField label="Last Name" required>
                    <TextInput
                      v-model="form.lastName"
                      id="last-name"
                      :error="!!errors.lastName"
                      :aria-describedby="errors.lastName ? 'last-name-error' : undefined"
                      :aria-invalid="!!errors.lastName"
                    />
                    <span
                      v-if="errors.lastName"
                      id="last-name-error"
                      class="text-sm text-red-600 dark:text-red-400 mt-1"
                    >
                      {{ errors.lastName }}
                    </span>
                  </FormField>
                </div>
              </fieldset>

              <!-- Radio Group with Legend -->
              <fieldset>
                <legend class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Notification Preferences
                </legend>
                <RadioGroup
                  v-model="form.notifications"
                  :options="notificationOptions"
                  name="notifications"
                />
              </fieldset>

              <!-- Checkbox Group -->
              <fieldset>
                <legend class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Interests
                </legend>
                <div class="space-y-2" role="group" aria-required="true">
                  <Checkbox
                    v-model="form.interests"
                    value="design"
                    label="Design"
                  />
                  <Checkbox
                    v-model="form.interests"
                    value="development"
                    label="Development"
                  />
                  <Checkbox
                    v-model="form.interests"
                    value="marketing"
                    label="Marketing"
                  />
                </div>
              </fieldset>

              <!-- Submit with Validation Summary -->
              <div>
                <div
                  v-if="Object.keys(errors).length > 0"
                  role="alert"
                  class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <h3 class="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
                    Please fix the following errors:
                  </h3>
                  <ul class="list-disc list-inside text-sm text-red-700 dark:text-red-300">
                    <li v-for="(error, field) in errors" :key="field">
                      {{ error }}
                    </li>
                  </ul>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  :disabled="Object.keys(errors).length > 0"
                >
                  Submit Form
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </section>

      <!-- Color Contrast -->
      <section>
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Color Contrast & Visual Design
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            All color combinations meet WCAG AA standards for contrast ratios.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Text Contrast -->
          <Card variant="bordered">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Text Contrast Examples
              </h3>
              
              <div class="space-y-4">
                <!-- Normal Text -->
                <div class="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <p class="text-gray-900 dark:text-white font-medium">
                    Normal text (7:1 contrast ratio)
                  </p>
                  <p class="text-gray-600 dark:text-gray-400">
                    Secondary text (4.5:1 contrast ratio)
                  </p>
                </div>
                
                <!-- Large Text -->
                <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p class="text-2xl text-gray-900 dark:text-white font-medium">
                    Large text (3:1 minimum)
                  </p>
                  <p class="text-lg text-gray-600 dark:text-gray-300">
                    Large secondary text
                  </p>
                </div>
                
                <!-- Interactive Elements -->
                <div class="space-y-2">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Interactive elements with sufficient contrast:
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <!-- Focus Indicators -->
          <Card variant="bordered">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Non-Color Indicators
              </h3>
              
              <div class="space-y-4">
                <!-- Icons with Text -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Status indicators use icons + color:
                  </p>
                  <div class="space-y-2">
                    <Alert variant="success" title="Success">
                      Operation completed successfully
                    </Alert>
                    <Alert variant="error" title="Error">
                      An error occurred during processing
                    </Alert>
                  </div>
                </div>
                
                <!-- Form Validation -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Form errors with multiple indicators:
                  </p>
                  <FormField 
                    label="Password"
                    error="Password must be at least 8 characters"
                  >
                    <TextInput
                      type="password"
                      error
                      placeholder="Enter password"
                    />
                  </FormField>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <!-- Responsive & Touch -->
      <section>
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Touch & Mobile Accessibility
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Components are optimized for touch with appropriate target sizes.
          </p>
        </div>

        <Card variant="bordered">
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Touch Targets -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Touch Target Sizes (44x44px minimum)
                </h3>
                
                <div class="space-y-4">
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Button sizes:
                    </p>
                    <div class="flex items-center gap-2">
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>
                  
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Form controls with adequate spacing:
                    </p>
                    <div class="space-y-3">
                      <Checkbox label="Option 1" />
                      <Checkbox label="Option 2" />
                      <Toggle label="Enable feature" />
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Gesture Alternatives -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Gesture Alternatives
                </h3>
                
                <div class="space-y-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    All gesture-based interactions have button alternatives:
                  </p>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-medium">Swipeable Item</span>
                      <div class="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label="Edit item"
                        >
                          <PencilIcon class="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label="Delete item"
                        >
                          <TrashIcon class="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      Swipe actions also available as buttons
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <!-- Testing Tools -->
      <section>
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Accessibility Testing
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Tools and techniques for testing component accessibility.
          </p>
        </div>

        <Card variant="bordered">
          <div class="p-6">
            <div class="space-y-6">
              <!-- Testing Checklist -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Testing Checklist
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <h4 class="font-medium text-gray-900 dark:text-white">
                      Keyboard Testing
                    </h4>
                    <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li class="flex items-start">
                        <CheckIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        All interactive elements reachable via Tab
                      </li>
                      <li class="flex items-start">
                        <CheckIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        Enter/Space activate buttons
                      </li>
                      <li class="flex items-start">
                        <CheckIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        Escape closes modals/dropdowns
                      </li>
                      <li class="flex items-start">
                        <CheckIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        Arrow keys navigate menus
                      </li>
                    </ul>
                  </div>
                  
                  <div class="space-y-2">
                    <h4 class="font-medium text-gray-900 dark:text-white">
                      Screen Reader Testing
                    </h4>
                    <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li class="flex items-start">
                        <CheckIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        Form labels announced correctly
                      </li>
                      <li class="flex items-start">
                        <CheckIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        Error messages associated with fields
                      </li>
                      <li class="flex items-start">
                        <CheckIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        Status changes announced
                      </li>
                      <li class="flex items-start">
                        <CheckIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        Landmark regions present
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <!-- Recommended Tools -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recommended Testing Tools
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                      axe DevTools
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Browser extension for automated accessibility testing
                    </p>
                  </div>
                  
                  <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                      WAVE
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Web Accessibility Evaluation Tool
                    </p>
                  </div>
                  
                  <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                      NVDA/JAWS
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Screen readers for comprehensive testing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useToastStore } from '@/store/useToastStore'
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon
} from '@heroicons/vue/24/outline'
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  FormField,
  Label,
  Modal,
  RadioGroup,
  Select,
  TextInput,
  Toggle
} from '@/components'

const toastStore = useToastStore()

// State
const showTrapModal = ref(false)
const toggleValue = ref(false)
const progressValue = ref(65)
const liveAnnouncement = ref('')
const isLoading = ref(false)

// Form state
const form = reactive({
  firstName: '',
  lastName: '',
  notifications: 'email',
  interests: []
})

const errors = reactive({})

const notificationOptions = [
  { value: 'email', label: 'Email notifications' },
  { value: 'sms', label: 'SMS notifications' },
  { value: 'none', label: 'No notifications' }
]

// Methods
const announceSuccess = () => {
  liveAnnouncement.value = 'Success! Your changes have been saved.'
  toastStore.success('Success', 'Changes saved')
}

const announceError = () => {
  liveAnnouncement.value = 'Error! Unable to save changes. Please try again.'
  toastStore.error('Error', 'Unable to save changes')
}

const simulateLoading = async () => {
  isLoading.value = true
  liveAnnouncement.value = 'Processing your request...'
  
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  isLoading.value = false
  liveAnnouncement.value = 'Request completed successfully!'
  toastStore.success('Complete', 'Request processed')
}

const validateForm = () => {
  const newErrors = {}
  
  if (!form.firstName.trim()) {
    newErrors.firstName = 'First name is required'
  }
  
  if (!form.lastName.trim()) {
    newErrors.lastName = 'Last name is required'
  }
  
  Object.assign(errors, newErrors)
  
  // Clear errors that are fixed
  Object.keys(errors).forEach(key => {
    if (!newErrors[key]) {
      delete errors[key]
    }
  })
  
  return Object.keys(newErrors).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    toastStore.success('Form Submitted', 'Your information has been saved')
    liveAnnouncement.value = 'Form submitted successfully!'
  } else {
    liveAnnouncement.value = 'Form contains errors. Please review and fix them.'
  }
}

// Simulate progress
setInterval(() => {
  if (progressValue.value < 100) {
    progressValue.value += 5
  }
}, 2000)
</script>