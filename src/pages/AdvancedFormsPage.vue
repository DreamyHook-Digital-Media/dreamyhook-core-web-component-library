<template>
  <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Advanced Form Examples
      </h1>
      <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Complex form layouts with validation, multi-step processes, and dynamic fields.
      </p>
    </div>

    <div class="space-y-16">
      <!-- Multi-Step Registration Form -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Multi-Step Registration Form
        </h2>
        
        <Card variant="bordered" class="max-w-4xl">
          <!-- Progress Steps -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-4">
              <div
                v-for="(step, index) in registrationSteps"
                :key="step.id"
                class="flex items-center"
                :class="{ 'flex-1': index < registrationSteps.length - 1 }"
              >
                <div class="flex items-center">
                  <div
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                      currentStep >= index + 1
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    ]"
                  >
                    <CheckIcon v-if="currentStep > index + 1" class="h-5 w-5" />
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                    {{ step.title }}
                  </span>
                </div>
                <div
                  v-if="index < registrationSteps.length - 1"
                  :class="[
                    'flex-1 h-0.5 mx-4',
                    currentStep > index + 1 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  ]"
                />
              </div>
            </div>
          </div>

          <!-- Step Content -->
          <div class="min-h-96">
            <!-- Step 1: Personal Information -->
            <div v-if="currentStep === 1" class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Personal Information
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="First Name" required>
                  <TextInput
                    v-model="registrationForm.firstName"
                    placeholder="Enter your first name"
                    :error="validationErrors.firstName"
                  />
                </FormField>
                
                <FormField label="Last Name" required>
                  <TextInput
                    v-model="registrationForm.lastName"
                    placeholder="Enter your last name"
                    :error="validationErrors.lastName"
                  />
                </FormField>
                
                <FormField label="Email Address" required>
                  <TextInput
                    v-model="registrationForm.email"
                    type="email"
                    placeholder="Enter your email"
                    :error="validationErrors.email"
                  />
                </FormField>
                
                <FormField label="Phone Number">
                  <TextInput
                    v-model="registrationForm.phone"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </FormField>
              </div>

              <FormField label="Date of Birth" required>
                <TextInput
                  v-model="registrationForm.dateOfBirth"
                  type="date"
                  :error="validationErrors.dateOfBirth"
                />
              </FormField>

              <FormField label="Gender">
                <RadioGroup
                  v-model="registrationForm.gender"
                  :options="[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' },
                    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
                  ]"
                />
              </FormField>
            </div>

            <!-- Step 2: Account Details -->
            <div v-if="currentStep === 2" class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Account Details
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Username" required>
                  <TextInput
                    v-model="registrationForm.username"
                    placeholder="Choose a username"
                    :error="validationErrors.username"
                  />
                </FormField>
                
                <FormField label="Account Type" required>
                  <Select
                    v-model="registrationForm.accountType"
                    :options="[
                      { value: 'personal', label: 'Personal' },
                      { value: 'business', label: 'Business' },
                      { value: 'organization', label: 'Organization' }
                    ]"
                    placeholder="Select account type"
                  />
                </FormField>
              </div>

              <FormField label="Password" required>
                <TextInput
                  v-model="registrationForm.password"
                  type="password"
                  placeholder="Create a strong password"
                  :error="validationErrors.password"
                />
                <div class="mt-2 space-y-1">
                  <div class="flex items-center space-x-2">
                    <div
                      :class="[
                        'w-2 h-2 rounded-full',
                        passwordStrength.length ? 'bg-green-500' : 'bg-gray-300'
                      ]"
                    />
                    <span class="text-xs text-gray-600 dark:text-gray-400">
                      At least 8 characters
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div
                      :class="[
                        'w-2 h-2 rounded-full',
                        passwordStrength.hasUppercase ? 'bg-green-500' : 'bg-gray-300'
                      ]"
                    />
                    <span class="text-xs text-gray-600 dark:text-gray-400">
                      One uppercase letter
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div
                      :class="[
                        'w-2 h-2 rounded-full',
                        passwordStrength.hasNumbers ? 'bg-green-500' : 'bg-gray-300'
                      ]"
                    />
                    <span class="text-xs text-gray-600 dark:text-gray-400">
                      One number
                    </span>
                  </div>
                </div>
              </FormField>

              <FormField label="Confirm Password" required>
                <TextInput
                  v-model="registrationForm.confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  :error="validationErrors.confirmPassword"
                />
              </FormField>
            </div>

            <!-- Step 3: Preferences -->
            <div v-if="currentStep === 3" class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Preferences & Interests
              </h3>

              <FormField label="Interests">
                <div class="space-y-2">
                  <Checkbox
                    v-for="interest in availableInterests"
                    :key="interest.value"
                    v-model="registrationForm.interests"
                    :value="interest.value"
                    :label="interest.label"
                  />
                </div>
              </FormField>

              <FormField label="Newsletter Subscription">
                <div class="space-y-3">
                  <Toggle
                    v-model="registrationForm.emailNewsletter"
                    label="Receive email newsletter"
                  />
                  <Toggle
                    v-model="registrationForm.smsNotifications"
                    label="Receive SMS notifications"
                  />
                  <Toggle
                    v-model="registrationForm.marketingEmails"
                    label="Receive marketing emails"
                  />
                </div>
              </FormField>

              <FormField label="Profile Picture">
                <FileUploader
                  v-model="registrationForm.profilePicture"
                  accept="image/*"
                  max-size="5MB"
                  preview
                />
              </FormField>
            </div>

            <!-- Step 4: Review -->
            <div v-if="currentStep === 4" class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Review Your Information
              </h3>

              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <p class="text-gray-900 dark:text-white">
                      {{ registrationForm.firstName }} {{ registrationForm.lastName }}
                    </p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p class="text-gray-900 dark:text-white">{{ registrationForm.email }}</p>
                  </div>
                  <div>
                    <Label>Username</Label>
                    <p class="text-gray-900 dark:text-white">{{ registrationForm.username }}</p>
                  </div>
                  <div>
                    <Label>Account Type</Label>
                    <p class="text-gray-900 dark:text-white">{{ registrationForm.accountType }}</p>
                  </div>
                </div>

                <div v-if="registrationForm.interests.length > 0">
                  <Label>Interests</Label>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <Badge
                      v-for="interest in selectedInterestLabels"
                      :key="interest"
                      variant="secondary"
                    >
                      {{ interest }}
                    </Badge>
                  </div>
                </div>
              </div>

              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div class="flex items-center">
                  <Checkbox
                    v-model="registrationForm.agreeToTerms"
                    :error="validationErrors.agreeToTerms"
                  />
                  <Label class="ml-2">
                    I agree to the 
                    <a href="#" class="text-primary hover:underline">Terms of Service</a>
                    and 
                    <a href="#" class="text-primary hover:underline">Privacy Policy</a>
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              v-if="currentStep > 1"
              variant="outline"
              @click="previousStep"
            >
              Previous
            </Button>
            <div v-else></div>

            <div class="flex space-x-3">
              <Button
                v-if="currentStep < 4"
                variant="primary"
                @click="nextStep"
                :disabled="!isCurrentStepValid"
              >
                Next
              </Button>
              <Button
                v-else
                variant="primary"
                @click="submitRegistration"
                :loading="submitting"
                :disabled="!registrationForm.agreeToTerms"
              >
                Create Account
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <!-- Dynamic Survey Form -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Dynamic Survey Form
        </h2>

        <Card variant="bordered" class="max-w-3xl">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Customer Satisfaction Survey
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Help us improve by answering a few questions about your experience.
              </p>
            </div>

            <!-- Dynamic Questions -->
            <div class="space-y-8">
              <div v-for="(question, index) in surveyQuestions" :key="question.id">
                <!-- Rating Question -->
                <div v-if="question.type === 'rating'" class="space-y-3">
                  <Label>{{ question.text }}</Label>
                  <div class="flex items-center space-x-2">
                    <button
                      v-for="rating in 5"
                      :key="rating"
                      type="button"
                      @click="setSurveyAnswer(question.id, rating)"
                      :class="[
                        'p-1 transition-colors',
                        surveyAnswers[question.id] >= rating
                          ? 'text-yellow-400'
                          : 'text-gray-300 hover:text-yellow-400'
                      ]"
                    >
                      <StarIcon class="h-8 w-8 fill-current" />
                    </button>
                    <span class="ml-3 text-sm text-gray-600 dark:text-gray-400">
                      {{ surveyAnswers[question.id] || 0 }}/5
                    </span>
                  </div>
                </div>

                <!-- Multiple Choice Question -->
                <div v-else-if="question.type === 'multiple-choice'" class="space-y-3">
                  <Label>{{ question.text }}</Label>
                  <RadioGroup
                    :model-value="surveyAnswers[question.id]"
                    :options="question.options"
                    @update:modelValue="(value) => setSurveyAnswer(question.id, value)"
                  />
                </div>

                <!-- Text Question -->
                <div v-else-if="question.type === 'text'" class="space-y-3">
                  <Label>{{ question.text }}</Label>
                  <TextInput
                    :model-value="surveyAnswers[question.id]"
                    :placeholder="question.placeholder"
                    @update:modelValue="(value) => setSurveyAnswer(question.id, value)"
                  />
                </div>

                <!-- Textarea Question -->
                <div v-else-if="question.type === 'textarea'" class="space-y-3">
                  <Label>{{ question.text }}</Label>
                  <textarea
                    :value="surveyAnswers[question.id]"
                    :placeholder="question.placeholder"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    @input="setSurveyAnswer(question.id, $event.target.value)"
                  />
                </div>

                <!-- Conditional Follow-up Questions -->
                <div
                  v-if="question.followUp && shouldShowFollowUp(question)"
                  class="ml-6 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-4"
                >
                  <div v-for="followUp in question.followUp" :key="followUp.id">
                    <Label>{{ followUp.text }}</Label>
                    <TextInput
                      :model-value="surveyAnswers[followUp.id]"
                      :placeholder="followUp.placeholder"
                      @update:modelValue="(value) => setSurveyAnswer(followUp.id, value)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="primary"
                full-width
                @click="submitSurvey"
                :loading="submittingSurvey"
              >
                Submit Survey
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <!-- Advanced Search Form -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Advanced Search & Filters
        </h2>

        <Card variant="bordered" class="max-w-5xl">
          <div class="space-y-6">
            <!-- Quick Search -->
            <div>
              <Label>Quick Search</Label>
              <div class="flex space-x-2">
                <div class="flex-1">
                  <TextInput
                    v-model="searchForm.query"
                    placeholder="Search products, categories, brands..."
                    class="w-full"
                  />
                </div>
                <Button variant="primary">
                  Search
                </Button>
              </div>
            </div>

            <!-- Advanced Filters -->
            <div class="border-t pt-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  Advanced Filters
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="showAdvancedFilters = !showAdvancedFilters"
                >
                  {{ showAdvancedFilters ? 'Hide' : 'Show' }} Filters
                </Button>
              </div>

              <div v-if="showAdvancedFilters" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <!-- Category Filter -->
                  <FormField label="Category">
                    <Select
                      v-model="searchForm.category"
                      :options="categoryOptions"
                      placeholder="All Categories"
                      multiple
                    />
                  </FormField>

                  <!-- Brand Filter -->
                  <FormField label="Brand">
                    <Autocomplete
                      v-model="searchForm.brand"
                      :options="brandOptions"
                      placeholder="Search brands..."
                      multiple
                    />
                  </FormField>

                  <!-- Condition Filter -->
                  <FormField label="Condition">
                    <RadioGroup
                      v-model="searchForm.condition"
                      :options="[
                        { value: 'all', label: 'All' },
                        { value: 'new', label: 'New' },
                        { value: 'used', label: 'Used' },
                        { value: 'refurbished', label: 'Refurbished' }
                      ]"
                    />
                  </FormField>
                </div>

                <!-- Price Range -->
                <div>
                  <Label>Price Range</Label>
                  <div class="grid grid-cols-2 gap-4 mt-2">
                    <TextInput
                      v-model="searchForm.priceMin"
                      type="number"
                      placeholder="Min price"
                    />
                    <TextInput
                      v-model="searchForm.priceMax"
                      type="number"
                      placeholder="Max price"
                    />
                  </div>
                </div>

                <!-- Features -->
                <div>
                  <Label>Features</Label>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    <Checkbox
                      v-for="feature in availableFeatures"
                      :key="feature.value"
                      v-model="searchForm.features"
                      :value="feature.value"
                      :label="feature.label"
                    />
                  </div>
                </div>

                <!-- Date Range -->
                <div class="grid grid-cols-2 gap-4">
                  <FormField label="Available From">
                    <TextInput
                      v-model="searchForm.dateFrom"
                      type="date"
                    />
                  </FormField>
                  <FormField label="Available Until">
                    <TextInput
                      v-model="searchForm.dateTo"
                      type="date"
                    />
                  </FormField>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-between pt-4 border-t">
                  <Button
                    variant="ghost"
                    @click="clearFilters"
                  >
                    Clear All Filters
                  </Button>
                  <div class="flex space-x-3">
                    <Button
                      variant="outline"
                      @click="saveSearch"
                    >
                      Save Search
                    </Button>
                    <Button
                      variant="primary"
                      @click="applyFilters"
                    >
                      Apply Filters ({{ filteredResultsCount }})
                    </Button>
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
import { ref, computed, watch } from 'vue'
import { useToastStore } from '@/store/useToastStore'
import {
  Button,
  Card,
  Checkbox,
  FormField,
  Label,
  RadioGroup,
  Select,
  TextInput,
  Toggle,
  FileUploader,
  Badge,
  Autocomplete
} from '@/components'
import { CheckIcon, StarIcon } from '@heroicons/vue/24/solid'

const toastStore = useToastStore()

// Multi-step registration form
const currentStep = ref(1)
const submitting = ref(false)

const registrationSteps = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Account Details' },
  { id: 3, title: 'Preferences' },
  { id: 4, title: 'Review' }
]

const registrationForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  username: '',
  accountType: '',
  password: '',
  confirmPassword: '',
  interests: [],
  emailNewsletter: true,
  smsNotifications: false,
  marketingEmails: false,
  profilePicture: null,
  agreeToTerms: false
})

const validationErrors = ref({})

const availableInterests = [
  { value: 'technology', label: 'Technology' },
  { value: 'sports', label: 'Sports' },
  { value: 'music', label: 'Music' },
  { value: 'travel', label: 'Travel' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'reading', label: 'Reading' }
]

const passwordStrength = computed(() => {
  const password = registrationForm.value.password
  return {
    length: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumbers: /\d/.test(password)
  }
})

const selectedInterestLabels = computed(() => {
  return availableInterests
    .filter(interest => registrationForm.value.interests.includes(interest.value))
    .map(interest => interest.label)
})

const isCurrentStepValid = computed(() => {
  // Simplified validation logic
  switch (currentStep.value) {
    case 1:
      return registrationForm.value.firstName && registrationForm.value.lastName && registrationForm.value.email
    case 2:
      return registrationForm.value.username && registrationForm.value.password && registrationForm.value.confirmPassword
    case 3:
      return true
    case 4:
      return registrationForm.value.agreeToTerms
    default:
      return false
  }
})

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const submitRegistration = async () => {
  submitting.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    toastStore.success('Account Created!', 'Welcome to DreamyHook!')
    // Reset form
    currentStep.value = 1
    registrationForm.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      username: '',
      accountType: '',
      password: '',
      confirmPassword: '',
      interests: [],
      emailNewsletter: true,
      smsNotifications: false,
      marketingEmails: false,
      profilePicture: null,
      agreeToTerms: false
    }
  } catch (error) {
    toastStore.error('Registration Failed', 'Please try again later.')
  } finally {
    submitting.value = false
  }
}

// Dynamic survey form
const surveyAnswers = ref({})
const submittingSurvey = ref(false)

const surveyQuestions = [
  {
    id: 'satisfaction',
    type: 'rating',
    text: 'How satisfied are you with our service?'
  },
  {
    id: 'recommendation',
    type: 'multiple-choice',
    text: 'Would you recommend us to a friend?',
    options: [
      { value: 'definitely', label: 'Definitely' },
      { value: 'probably', label: 'Probably' },
      { value: 'not-sure', label: 'Not sure' },
      { value: 'probably-not', label: 'Probably not' },
      { value: 'definitely-not', label: 'Definitely not' }
    ],
    followUp: [
      {
        id: 'recommendation-reason',
        text: 'What is the main reason for your answer?',
        placeholder: 'Please explain...'
      }
    ]
  },
  {
    id: 'improvement',
    type: 'textarea',
    text: 'What could we do to improve our service?',
    placeholder: 'Your suggestions are valuable to us...'
  },
  {
    id: 'contact',
    type: 'text',
    text: 'Email address (optional, for follow-up)',
    placeholder: 'your@email.com'
  }
]

const setSurveyAnswer = (questionId: string, value: any) => {
  surveyAnswers.value[questionId] = value
}

const shouldShowFollowUp = (question: any) => {
  return surveyAnswers.value[question.id] && 
         ['definitely-not', 'probably-not', 'not-sure'].includes(surveyAnswers.value[question.id])
}

const submitSurvey = async () => {
  submittingSurvey.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    toastStore.success('Survey Submitted!', 'Thank you for your feedback.')
    surveyAnswers.value = {}
  } catch (error) {
    toastStore.error('Submission Failed', 'Please try again.')
  } finally {
    submittingSurvey.value = false
  }
}

// Advanced search form
const showAdvancedFilters = ref(false)
const searchForm = ref({
  query: '',
  category: [],
  brand: [],
  condition: 'all',
  priceMin: '',
  priceMax: '',
  features: [],
  dateFrom: '',
  dateTo: ''
})

const categoryOptions = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'sports', label: 'Sports & Outdoors' },
  { value: 'books', label: 'Books' }
]

const brandOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'samsung', label: 'Samsung' },
  { value: 'nike', label: 'Nike' },
  { value: 'adidas', label: 'Adidas' },
  { value: 'sony', label: 'Sony' }
]

const availableFeatures = [
  { value: 'free-shipping', label: 'Free Shipping' },
  { value: 'same-day', label: 'Same Day Delivery' },
  { value: 'warranty', label: 'Extended Warranty' },
  { value: 'eco-friendly', label: 'Eco-Friendly' }
]

const filteredResultsCount = computed(() => {
  // Simulate filtered results count
  let count = 1247
  if (searchForm.value.query) count -= 200
  if (searchForm.value.category.length > 0) count -= 100
  if (searchForm.value.brand.length > 0) count -= 50
  return Math.max(0, count)
})

const clearFilters = () => {
  searchForm.value = {
    query: '',
    category: [],
    brand: [],
    condition: 'all',
    priceMin: '',
    priceMax: '',
    features: [],
    dateFrom: '',
    dateTo: ''
  }
  toastStore.info('Filters Cleared', 'All search filters have been reset.')
}

const saveSearch = () => {
  toastStore.success('Search Saved', 'You can access saved searches from your profile.')
}

const applyFilters = () => {
  toastStore.info('Filters Applied', `Found ${filteredResultsCount.value} matching results.`)
}
</script>