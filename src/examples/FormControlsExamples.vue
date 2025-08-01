<template>
  <div class="space-y-12">
    <!-- Select Examples -->
    <section>
      <h3 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Select</h3>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FormField label="Basic Select" hint="Choose your favorite fruit">
          <Select
            v-model="selectValue"
            :options="fruitOptions"
            placeholder="Select a fruit"
          />
        </FormField>

        <FormField label="Searchable Select" hint="Type to search">
          <Select
            v-model="searchableValue"
            :options="countryOptions"
            placeholder="Select a country"
            searchable
          />
        </FormField>

        <FormField label="Multiple Select">
          <Select
            v-model="multipleValue"
            :options="colorOptions"
            placeholder="Select colors"
            multiple
          />
        </FormField>

        <FormField label="Disabled Select">
          <Select
            :options="fruitOptions"
            placeholder="Disabled"
            disabled
          />
        </FormField>
      </div>
    </section>

    <!-- Autocomplete Examples -->
    <section>
      <h3 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Autocomplete</h3>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FormField label="Basic Autocomplete" hint="Search for a programming language">
          <Autocomplete
            v-model="autocompleteValue"
            :options="languageOptions"
            placeholder="Search languages..."
          />
        </FormField>

        <FormField label="Custom Filter">
          <Autocomplete
            v-model="customFilterValue"
            :options="userOptions"
            :filter-function="customUserFilter"
            placeholder="Search by name or email..."
          />
        </FormField>
      </div>
    </section>

    <!-- Toggle Examples -->
    <section>
      <h3 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Toggle</h3>
      <div class="space-y-4">
        <Toggle
          v-model="toggleValue1"
          label="Enable notifications"
          description="Get notified when someone mentions you"
        />
        
        <Toggle
          v-model="toggleValue2"
          label="Email marketing"
          description="Receive emails about new products and features"
          size="sm"
        />
        
        <Toggle
          label="Disabled toggle"
          description="This toggle is disabled"
          disabled
        />
      </div>
    </section>

    <!-- Radio Group Examples -->
    <section>
      <h3 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Radio Group</h3>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FormField label="Plan Selection">
          <RadioGroup
            v-model="radioValue1"
            :options="planOptions"
            name="plan"
          />
        </FormField>

        <FormField label="Notification Method">
          <RadioGroup
            v-model="radioValue2"
            :options="notificationOptions"
            name="notifications"
            orientation="horizontal"
          />
        </FormField>
      </div>
    </section>

    <!-- Checkbox Examples -->
    <section>
      <h3 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Checkbox</h3>
      <div class="space-y-4">
        <Checkbox
          v-model="checkbox1"
          label="I agree to the terms and conditions"
          description="By checking this box, you agree to our terms of service"
        />
        
        <Checkbox
          v-model="checkbox2"
          label="Subscribe to newsletter"
          size="sm"
        />
        
        <Checkbox
          v-model="checkboxIndeterminate"
          label="Select all options"
          :indeterminate="isIndeterminate"
          @update:modelValue="handleSelectAll"
        />
        
        <div class="ml-6 space-y-2">
          <Checkbox
            v-model="subCheckbox1"
            label="Option 1"
            size="sm"
            @update:modelValue="updateIndeterminate"
          />
          <Checkbox
            v-model="subCheckbox2"
            label="Option 2"
            size="sm"
            @update:modelValue="updateIndeterminate"
          />
          <Checkbox
            v-model="subCheckbox3"
            label="Option 3"
            size="sm"
            @update:modelValue="updateIndeterminate"
          />
        </div>
      </div>
    </section>

    <!-- File Upload Examples -->
    <section>
      <h3 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">File Upload</h3>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FormField label="Single File Upload" hint="Upload an image file">
          <FileUploader
            v-model="singleFile"
            accept="image/*"
            :max-size="5 * 1024 * 1024"
          />
        </FormField>

        <FormField label="Multiple Files" hint="Upload multiple documents">
          <FileUploader
            v-model="multipleFiles"
            accept=".pdf,.doc,.docx,.txt"
            multiple
            :max-size="10 * 1024 * 1024"
          />
        </FormField>
      </div>
    </section>

    <!-- Values Display -->
    <section>
      <h3 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Current Values</h3>
      <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <pre class="text-sm">{{ JSON.stringify(allValues, null, 2) }}</pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Autocomplete,
  Checkbox,
  FileUploader,
  FormField,
  RadioGroup,
  Select,
  Toggle
} from '@/components'

// Form values
const selectValue = ref('')
const searchableValue = ref('')
const multipleValue = ref([])
const autocompleteValue = ref('')
const customFilterValue = ref('')
const toggleValue1 = ref(false)
const toggleValue2 = ref(true)
const radioValue1 = ref('')
const radioValue2 = ref('email')
const checkbox1 = ref(false)
const checkbox2 = ref(true)
const checkboxIndeterminate = ref(false)
const subCheckbox1 = ref(false)
const subCheckbox2 = ref(true)
const subCheckbox3 = ref(false)
const singleFile = ref(null)
const multipleFiles = ref([])

// Options
const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' }
]

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' }
]

const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' }
]

const languageOptions = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'py', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' }
]

const userOptions = [
  { value: 'john', label: 'John Doe', email: 'john@example.com' },
  { value: 'jane', label: 'Jane Smith', email: 'jane@example.com' },
  { value: 'bob', label: 'Bob Johnson', email: 'bob@example.com' }
]

const planOptions = [
  {
    value: 'basic',
    label: 'Basic',
    description: '$9/month - Perfect for individuals'
  },
  {
    value: 'pro',
    label: 'Professional',
    description: '$29/month - Best for teams'
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    description: '$99/month - For large organizations'
  }
]

const notificationOptions = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'push', label: 'Push' }
]

// Custom filter function
const customUserFilter = (query: string, items: typeof userOptions) => {
  if (!query) return items
  const lowerQuery = query.toLowerCase()
  return items.filter(item =>
    item.label.toLowerCase().includes(lowerQuery) ||
    item.email.toLowerCase().includes(lowerQuery)
  )
}

// Indeterminate checkbox logic
const isIndeterminate = computed(() => {
  const checkedCount = [subCheckbox1.value, subCheckbox2.value, subCheckbox3.value]
    .filter(Boolean).length
  return checkedCount > 0 && checkedCount < 3
})

const handleSelectAll = (value: boolean) => {
  subCheckbox1.value = value
  subCheckbox2.value = value
  subCheckbox3.value = value
}

const updateIndeterminate = () => {
  const allChecked = subCheckbox1.value && subCheckbox2.value && subCheckbox3.value
  checkboxIndeterminate.value = allChecked
}

// All values for display
const allValues = computed(() => ({
  select: selectValue.value,
  searchableSelect: searchableValue.value,
  multipleSelect: multipleValue.value,
  autocomplete: autocompleteValue.value,
  customFilter: customFilterValue.value,
  toggle1: toggleValue1.value,
  toggle2: toggleValue2.value,
  radio1: radioValue1.value,
  radio2: radioValue2.value,
  checkbox1: checkbox1.value,
  checkbox2: checkbox2.value,
  checkboxIndeterminate: checkboxIndeterminate.value,
  subCheckboxes: {
    option1: subCheckbox1.value,
    option2: subCheckbox2.value,
    option3: subCheckbox3.value
  },
  singleFile: singleFile.value?.name || null,
  multipleFiles: Array.isArray(multipleFiles.value) 
    ? multipleFiles.value.map(f => f.name) 
    : []
}))
</script>