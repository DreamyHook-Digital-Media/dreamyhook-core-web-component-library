<template>
  <div class="mx-auto max-w-2xl space-y-8">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Update your profile information and preferences
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Personal Information -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
        
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="First Name"
            required
            :error="errors.firstName"
          >
            <TextInput
              v-model="formData.firstName"
              placeholder="Enter your first name"
              :error="!!errors.firstName"
              @blur="touchField('firstName')"
            />
          </FormField>

          <FormField
            label="Last Name"
            required
            :error="errors.lastName"
          >
            <TextInput
              v-model="formData.lastName"
              placeholder="Enter your last name"
              :error="!!errors.lastName"
              @blur="touchField('lastName')"
            />
          </FormField>
        </div>

        <FormField
          label="Email"
          required
          :error="errors.email"
        >
          <TextInput
            v-model="formData.email"
            type="email"
            placeholder="Enter your email"
            :left-icon="EnvelopeIcon"
            :error="!!errors.email"
            @blur="touchField('email')"
          />
        </FormField>

        <FormField
          label="Bio"
          hint="Tell us a little about yourself"
          :error="errors.bio"
        >
          <TextInput
            v-model="formData.bio"
            placeholder="Enter a short bio"
            :error="!!errors.bio"
            @blur="touchField('bio')"
          />
        </FormField>
      </div>

      <Divider />

      <!-- Preferences -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Preferences</h3>

        <FormField
          label="Country"
          required
          :error="errors.country"
        >
          <Select
            v-model="formData.country"
            :options="countryOptions"
            placeholder="Select your country"
            searchable
            :error="!!errors.country"
            @update:modelValue="touchField('country')"
          />
        </FormField>

        <FormField
          label="Interests"
          hint="Select topics you're interested in"
        >
          <Select
            v-model="formData.interests"
            :options="interestOptions"
            placeholder="Select your interests"
            multiple
          />
        </FormField>

        <FormField
          label="Communication Preferences"
        >
          <RadioGroup
            v-model="formData.communicationPreference"
            :options="communicationOptions"
            name="communication"
          />
        </FormField>

        <div class="space-y-3">
          <Toggle
            v-model="formData.emailNotifications"
            label="Email Notifications"
            description="Receive updates and announcements via email"
          />

          <Toggle
            v-model="formData.marketingEmails"
            label="Marketing Emails"
            description="Receive promotional emails and newsletters"
          />

          <Toggle
            v-model="formData.profilePublic"
            label="Public Profile"
            description="Make your profile visible to other users"
          />
        </div>

        <FormField
          label="Newsletter Subscriptions"
        >
          <div class="space-y-2">
            <Checkbox
              v-model="formData.newsletters.tech"
              label="Technology Newsletter"
              description="Weekly updates on the latest in tech"
            />
            <Checkbox
              v-model="formData.newsletters.design"
              label="Design Newsletter"
              description="Monthly design inspiration and tips"
            />
            <Checkbox
              v-model="formData.newsletters.business"
              label="Business Newsletter"
              description="Business insights and trends"
            />
          </div>
        </FormField>
      </div>

      <Divider />

      <!-- Profile Picture -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Profile Picture</h3>
        
        <FormField
          label="Upload Profile Picture"
          hint="Upload a profile picture (max 5MB)"
          :error="errors.profilePicture"
        >
          <FileUploader
            v-model="formData.profilePicture"
            accept="image/*"
            :max-size="5 * 1024 * 1024"
          />
        </FormField>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-3 pt-6">
        <Button
          type="button"
          variant="outline"
          @click="resetForm"
        >
          Reset
        </Button>
        <Button
          type="submit"
          :loading="isSubmitting"
          :disabled="!isValid"
        >
          Save Changes
        </Button>
      </div>
    </form>

    <!-- Debug Information -->
    <div v-if="showDebug" class="mt-8">
      <details class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <summary class="cursor-pointer font-medium">Debug Information</summary>
        <div class="mt-4 space-y-2">
          <div>
            <strong>Form Valid:</strong> {{ isValid }}
          </div>
          <div>
            <strong>Has Errors:</strong> {{ hasErrors }}
          </div>
          <div>
            <strong>Errors:</strong>
            <pre class="mt-1 text-sm">{{ JSON.stringify(errors, null, 2) }}</pre>
          </div>
          <div>
            <strong>Form Data:</strong>
            <pre class="mt-1 text-sm">{{ JSON.stringify(formData, null, 2) }}</pre>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EnvelopeIcon } from '@heroicons/vue/24/outline'
import {
  Button,
  Checkbox,
  Divider,
  FileUploader,
  FormField,
  RadioGroup,
  Select,
  TextInput,
  Toggle
} from '@/components'
import { useFormValidation } from '@/composables/useFormValidation'

const showDebug = ref(false)

// Form data structure
const initialData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  bio: '',
  country: 'us',
  interests: ['tech', 'design'],
  communicationPreference: 'email',
  emailNotifications: true,
  marketingEmails: false,
  profilePublic: true,
  newsletters: {
    tech: true,
    design: false,
    business: false
  },
  profilePicture: null
}

// Use form validation composable
const {
  formData,
  isValid,
  hasErrors,
  errors,
  isSubmitting,
  addField,
  validateAll,
  touchField,
  resetForm: resetFormData
} = useFormValidation(initialData)

// Add validation rules
addField('firstName', [
  { required: true, message: 'First name is required' },
  { minLength: 2, message: 'First name must be at least 2 characters' }
])

addField('lastName', [
  { required: true, message: 'Last name is required' },
  { minLength: 2, message: 'Last name must be at least 2 characters' }
])

addField('email', [
  { required: true, message: 'Email is required' },
  { email: true, message: 'Please enter a valid email address' }
])

addField('bio', [
  { maxLength: 500, message: 'Bio must be less than 500 characters' }
])

addField('country', [
  { required: true, message: 'Please select your country' }
])

// Options
const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' }
]

const interestOptions = [
  { value: 'tech', label: 'Technology' },
  { value: 'design', label: 'Design' },
  { value: 'business', label: 'Business' },
  { value: 'science', label: 'Science' },
  { value: 'arts', label: 'Arts' },
  { value: 'sports', label: 'Sports' }
]

const communicationOptions = [
  {
    value: 'email',
    label: 'Email',
    description: 'Receive updates via email'
  },
  {
    value: 'sms',
    label: 'SMS',
    description: 'Receive updates via text message'
  },
  {
    value: 'none',
    label: 'None',
    description: 'No communication preferences'
  }
]

// Form submission
const handleSubmit = async () => {
  if (!validateAll()) {
    return
  }

  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Profile updated successfully!')
    console.log('Form submitted:', formData)
  } catch (error) {
    console.error('Submission error:', error)
    alert('Error updating profile. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  resetFormData()
  showDebug.value = false
}
</script>