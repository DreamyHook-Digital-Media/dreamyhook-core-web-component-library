<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Theme Showcase
            </h1>
            <Badge variant="primary" size="sm">Customizable</Badge>
          </div>
          
          <div class="flex items-center space-x-3">
            <!-- Current Theme Display -->
            <div class="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: currentTheme.primary }"></div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ currentTheme.name }}
              </span>
            </div>
            
            <!-- Theme Toggle -->
            <ThemeToggle />
            
            <!-- Export Theme Button -->
            <Button
              variant="outline"
              size="sm"
              @click="exportTheme"
            >
              <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Theme Selector -->
      <section class="mb-12">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Theme
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore different visual themes and color schemes. Each theme maintains accessibility standards while providing unique aesthetics.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <Card
            v-for="theme in availableThemes"
            :key="theme.id"
            :variant="selectedThemeId === theme.id ? 'shadow' : 'bordered'"
            :class="[
              'cursor-pointer transition-all duration-200',
              selectedThemeId === theme.id ? 'ring-2 ring-blue-500 scale-105' : 'hover:shadow-md'
            ]"
            @click="selectTheme(theme)"
          >
            <div class="p-6">
              <!-- Theme Preview Colors -->
              <div class="flex space-x-2 mb-4">
                <div class="w-8 h-8 rounded-full" :style="{ backgroundColor: theme.primary }"></div>
                <div class="w-6 h-6 mt-1 rounded-full" :style="{ backgroundColor: theme.secondary }"></div>
                <div class="w-4 h-4 mt-2 rounded-full" :style="{ backgroundColor: theme.accent }"></div>
              </div>
              
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {{ theme.name }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {{ theme.description }}
              </p>
              
              <!-- Mini Component Preview -->
              <div class="space-y-2">
                <div class="h-6 rounded" :style="{ backgroundColor: theme.primary, opacity: 0.8 }"></div>
                <div class="h-4 w-3/4 rounded" :style="{ backgroundColor: theme.secondary, opacity: 0.6 }"></div>
                <div class="h-3 w-1/2 rounded" :style="{ backgroundColor: theme.accent, opacity: 0.4 }"></div>
              </div>
              
              <div class="mt-4 flex items-center justify-between">
                <Badge :variant="theme.category === 'premium' ? 'warning' : 'secondary'" size="sm">
                  {{ theme.category }}
                </Badge>
                
                <div v-if="selectedThemeId === theme.id" class="text-blue-500">
                  <CheckIcon class="h-5 w-5" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Custom Theme Builder -->
        <Card variant="bordered" class="mb-8">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Custom Theme Builder
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Create your own theme with custom colors
                </p>
              </div>
              
              <Toggle
                v-model="showCustomBuilder"
                label="Enable Builder"
              />
            </div>
            
            <div v-if="showCustomBuilder" class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Primary Color -->
              <div class="space-y-2">
                <Label>Primary Color</Label>
                <div class="flex space-x-2">
                  <input
                    v-model="customTheme.primary"
                    type="color"
                    class="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <TextInput
                    v-model="customTheme.primary"
                    class="flex-1"
                    placeholder="#3B82F6"
                  />
                </div>
              </div>
              
              <!-- Secondary Color -->
              <div class="space-y-2">
                <Label>Secondary Color</Label>
                <div class="flex space-x-2">
                  <input
                    v-model="customTheme.secondary"
                    type="color"
                    class="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <TextInput
                    v-model="customTheme.secondary"
                    class="flex-1"
                    placeholder="#6B7280"
                  />
                </div>
              </div>
              
              <!-- Accent Color -->
              <div class="space-y-2">
                <Label>Accent Color</Label>
                <div class="flex space-x-2">
                  <input
                    v-model="customTheme.accent"
                    type="color"
                    class="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <TextInput
                    v-model="customTheme.accent"
                    class="flex-1"
                    placeholder="#10B981"
                  />
                </div>
              </div>
              
              <!-- Apply Custom Theme -->
              <div class="md:col-span-3 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  @click="resetCustomTheme"
                >
                  Reset
                </Button>
                <Button
                  variant="primary"
                  @click="applyCustomTheme"
                >
                  Apply Theme
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <!-- Component Showcase -->
      <section class="space-y-12">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Components in {{ currentTheme.name }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            See how all components look with the selected theme
          </p>
        </div>

        <!-- Buttons Section -->
        <div class="space-y-6">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Buttons</h3>
          
          <Card variant="bordered">
            <div class="p-6 space-y-6">
              <!-- Button Variants -->
              <div>
                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Variants</h4>
                <div class="flex flex-wrap gap-3">
                  <Button variant="primary" size="md">Primary</Button>
                  <Button variant="secondary" size="md">Secondary</Button>
                  <Button variant="outline" size="md">Outline</Button>
                  <Button variant="ghost" size="md">Ghost</Button>
                </div>
              </div>
              
              <!-- Button Sizes -->
              <div>
                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Sizes</h4>
                <div class="flex items-center gap-3">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                  <Button variant="primary" size="xl">Extra Large</Button>
                </div>
              </div>
              
              <!-- Button States -->
              <div>
                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">States</h4>
                <div class="flex flex-wrap gap-3">
                  <Button variant="primary">Normal</Button>
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Form Controls Section -->
        <div class="space-y-6">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Form Controls</h3>
          
          <Card variant="bordered">
            <div class="p-6 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Text Inputs -->
                <div class="space-y-4">
                  <h4 class="text-lg font-medium text-gray-900 dark:text-white">Text Inputs</h4>
                  
                  <FormField label="Default Input">
                    <TextInput placeholder="Enter text..." />
                  </FormField>
                  
                  <FormField label="Input with Icon">
                    <TextInput placeholder="Search...">
                      <template #prefix>
                        <MagnifyingGlassIcon class="h-4 w-4 text-gray-400" />
                      </template>
                    </TextInput>
                  </FormField>
                  
                  <FormField label="Error State">
                    <TextInput 
                      placeholder="Email address"
                      error="Please enter a valid email address"
                    />
                  </FormField>
                </div>
                
                <!-- Other Controls -->
                <div class="space-y-4">
                  <h4 class="text-lg font-medium text-gray-900 dark:text-white">Other Controls</h4>
                  
                  <FormField label="Select Dropdown">
                    <Select
                      :options="[
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' },
                        { value: 'option3', label: 'Option 3' }
                      ]"
                      placeholder="Choose an option"
                    />
                  </FormField>
                  
                  <div class="space-y-3">
                    <Toggle v-model="demoToggle" label="Enable notifications" />
                    <Toggle v-model="demoToggle2" label="Auto-save drafts" size="sm" />
                  </div>
                  
                  <div class="space-y-2">
                    <Checkbox v-model="demoCheckbox1" label="I agree to the terms" />
                    <Checkbox v-model="demoCheckbox2" label="Subscribe to newsletter" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Badges and Status Section -->
        <div class="space-y-6">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Badges & Status</h3>
          
          <Card variant="bordered">
            <div class="p-6 space-y-6">
              <!-- Badge Variants -->
              <div>
                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Badge Variants</h4>
                <div class="flex flex-wrap gap-3">
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </div>
              
              <!-- Badge Sizes -->
              <div>
                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Badge Sizes</h4>
                <div class="flex items-center gap-3">
                  <Badge variant="primary" size="sm">Small</Badge>
                  <Badge variant="primary" size="md">Medium</Badge>
                  <Badge variant="primary" size="lg">Large</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Cards Section -->
        <div class="space-y-6">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Cards</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <div class="p-6">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Default Card</h4>
                <p class="text-gray-600 dark:text-gray-300">
                  Basic card with default styling and subtle background.
                </p>
              </div>
            </Card>
            
            <Card variant="bordered">
              <div class="p-6">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bordered Card</h4>
                <p class="text-gray-600 dark:text-gray-300">
                  Card with visible border and clean appearance.
                </p>
              </div>
            </Card>
            
            <Card variant="shadow" hoverable>
              <div class="p-6">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Shadow Card</h4>
                <p class="text-gray-600 dark:text-gray-300">
                  Elevated card with shadow and hover effects.
                </p>
              </div>
            </Card>
          </div>
        </div>

        <!-- Stats and Data Section -->
        <div class="space-y-6">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Stats & Data</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Stats
              :value="12543"
              label="Total Users"
              format="number"
              :trend-value="12.5"
              trend="up"
              :icon="UserGroupIcon"
              variant="card"
              color="primary"
            />
            
            <Stats
              :value="284750"
              label="Revenue"
              format="currency"
              :trend-value="8.2"
              trend="up"
              :icon="CurrencyDollarIcon"
              variant="card"
              color="success"
            />
            
            <Stats
              :value="3.2"
              label="Conversion Rate"
              format="percentage"
              :trend-value="2.1"
              trend="down"
              :icon="ChartBarIcon"
              variant="card"
              color="warning"
            />
            
            <Stats
              :value="125.50"
              label="Avg. Order"
              format="currency"
              :trend-value="5.7"
              trend="up"
              :icon="ShoppingCartIcon"
              variant="card"
              color="info"
            />
          </div>
        </div>

        <!-- Alerts and Notifications -->
        <div class="space-y-6">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Alerts & Notifications</h3>
          
          <div class="space-y-4">
            <Alert variant="info" title="Information">
              This is an informational alert with additional context.
            </Alert>
            
            <Alert variant="success" title="Success" dismissible>
              Your changes have been saved successfully.
            </Alert>
            
            <Alert variant="warning" title="Warning">
              Please review your settings before continuing.
            </Alert>
            
            <Alert variant="error" title="Error" dismissible>
              There was an error processing your request.
            </Alert>
          </div>
        </div>
      </section>

      <!-- Theme Comparison -->
      <section class="mt-16">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Theme Comparison
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Compare different themes side by side
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            v-for="(theme, index) in comparisonThemes"
            :key="theme.id"
            class="space-y-4"
          >
            <div class="text-center">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {{ theme.name }}
              </h3>
              <div class="flex justify-center space-x-2">
                <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: theme.primary }"></div>
                <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: theme.secondary }"></div>
                <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: theme.accent }"></div>
              </div>
            </div>
            
            <Card variant="bordered">
              <div class="p-4 space-y-4">
                <!-- Mini component preview for each theme -->
                <div class="flex space-x-2">
                  <div class="h-8 px-3 rounded flex items-center text-white text-sm font-medium" 
                       :style="{ backgroundColor: theme.primary }">
                    Primary
                  </div>
                  <div class="h-8 px-3 rounded flex items-center text-white text-sm font-medium"
                       :style="{ backgroundColor: theme.secondary }">
                    Secondary
                  </div>
                </div>
                
                <div class="space-y-2">
                  <div class="h-3 rounded" :style="{ backgroundColor: theme.primary, opacity: 0.8 }"></div>
                  <div class="h-3 w-4/5 rounded" :style="{ backgroundColor: theme.secondary, opacity: 0.6 }"></div>
                  <div class="h-3 w-3/5 rounded" :style="{ backgroundColor: theme.accent, opacity: 0.4 }"></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>

    <!-- Export Theme Modal -->
    <Modal
      v-model:isOpen="showExportModal"
      title="Export Theme"
      size="lg"
    >
      <div class="space-y-6">
        <div>
          <Label>Export Format</Label>
          <Select
            v-model="exportFormat"
            :options="[
              { value: 'css', label: 'CSS Variables' },
              { value: 'scss', label: 'SCSS Variables' },
              { value: 'tailwind', label: 'Tailwind Config' },
              { value: 'json', label: 'JSON Theme' }
            ]"
          />
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-96 overflow-auto">
          <pre class="text-sm"><code>{{ exportedThemeCode }}</code></pre>
        </div>
        
        <div class="flex justify-end space-x-3">
          <Button
            variant="outline"
            @click="showExportModal = false"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            @click="copyThemeCode"
          >
            <ClipboardIcon class="h-4 w-4 mr-2" />
            Copy Code
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToastStore } from '@/store/useToastStore'
import {
  CheckIcon,
  ArrowDownTrayIcon,
  ClipboardIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ShoppingCartIcon
} from '@heroicons/vue/24/outline'
import {
  Badge,
  Button,
  Card,
  Modal,
  TextInput,
  Toggle,
  Select,
  Label,
  ThemeToggle,
  FormField,
  Checkbox,
  Stats,
  Alert
} from '@/components'

const toastStore = useToastStore()

// State
const selectedThemeId = ref('default')
const showCustomBuilder = ref(false)
const showExportModal = ref(false)
const exportFormat = ref('css')

// Demo form states
const demoToggle = ref(true)
const demoToggle2 = ref(false)
const demoCheckbox1 = ref(false)
const demoCheckbox2 = ref(true)

// Available themes
const availableThemes = ref([
  {
    id: 'default',
    name: 'Default Blue',
    description: 'Clean and professional blue theme',
    category: 'free',
    primary: '#3B82F6',
    secondary: '#6B7280',
    accent: '#10B981'
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    description: 'Fresh and vibrant green theme',
    category: 'free',
    primary: '#10B981',
    secondary: '#6B7280',
    accent: '#F59E0B'
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    description: 'Elegant and sophisticated purple theme',
    category: 'free',
    primary: '#8B5CF6',
    secondary: '#6B7280',
    accent: '#EF4444'
  },
  {
    id: 'rose',
    name: 'Rose Pink',
    description: 'Warm and inviting rose theme',
    category: 'premium',
    primary: '#F43F5E',
    secondary: '#6B7280',
    accent: '#06B6D4'
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    description: 'Bold and energetic orange theme',
    category: 'premium',
    primary: '#F97316',
    secondary: '#6B7280',
    accent: '#8B5CF6'
  },
  {
    id: 'teal',
    name: 'Ocean Teal',
    description: 'Calm and refreshing teal theme',
    category: 'free',
    primary: '#14B8A6',
    secondary: '#6B7280',
    accent: '#F59E0B'
  },
  {
    id: 'indigo',
    name: 'Deep Indigo',
    description: 'Modern and sleek indigo theme',
    category: 'premium',
    primary: '#6366F1',
    secondary: '#6B7280',
    accent: '#10B981'
  },
  {
    id: 'slate',
    name: 'Modern Slate',
    description: 'Minimalist and clean slate theme',
    category: 'free',
    primary: '#475569',
    secondary: '#64748B',
    accent: '#0EA5E9'
  }
])

// Custom theme builder
const customTheme = ref({
  primary: '#3B82F6',
  secondary: '#6B7280',
  accent: '#10B981'
})

// Computed
const currentTheme = computed(() => {
  return availableThemes.value.find(theme => theme.id === selectedThemeId.value) || availableThemes.value[0]
})

const comparisonThemes = computed(() => {
  // Show current theme vs a contrasting theme
  const current = currentTheme.value
  const contrasting = availableThemes.value.find(theme => 
    theme.id !== current.id && theme.category !== current.category
  ) || availableThemes.value[1]
  
  return [current, contrasting]
})

const exportedThemeCode = computed(() => {
  const theme = currentTheme.value
  
  switch (exportFormat.value) {
    case 'css':
      return `:root {
  --primary-color: ${theme.primary};
  --secondary-color: ${theme.secondary};
  --accent-color: ${theme.accent};
  
  /* Primary variants */
  --primary-50: ${lighten(theme.primary, 0.9)};
  --primary-100: ${lighten(theme.primary, 0.8)};
  --primary-500: ${theme.primary};
  --primary-900: ${darken(theme.primary, 0.3)};
  
  /* Secondary variants */
  --secondary-50: ${lighten(theme.secondary, 0.9)};
  --secondary-500: ${theme.secondary};
  --secondary-900: ${darken(theme.secondary, 0.3)};
  
  /* Accent variants */
  --accent-50: ${lighten(theme.accent, 0.9)};
  --accent-500: ${theme.accent};
  --accent-900: ${darken(theme.accent, 0.3)};
}`

    case 'scss':
      return `// ${theme.name} Theme Variables
$primary: ${theme.primary};
$secondary: ${theme.secondary};
$accent: ${theme.accent};

// Color palette
$colors: (
  primary: (
    50: ${lighten(theme.primary, 0.9)},
    100: ${lighten(theme.primary, 0.8)},
    500: $primary,
    900: ${darken(theme.primary, 0.3)}
  ),
  secondary: (
    50: ${lighten(theme.secondary, 0.9)},
    500: $secondary,
    900: ${darken(theme.secondary, 0.3)}
  ),
  accent: (
    50: ${lighten(theme.accent, 0.9)},
    500: $accent,
    900: ${darken(theme.accent, 0.3)}
  )
);`

    case 'tailwind':
      return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '${lighten(theme.primary, 0.9)}',
          100: '${lighten(theme.primary, 0.8)}',
          500: '${theme.primary}',
          900: '${darken(theme.primary, 0.3)}'
        },
        secondary: {
          50: '${lighten(theme.secondary, 0.9)}',
          500: '${theme.secondary}',
          900: '${darken(theme.secondary, 0.3)}'
        },
        accent: {
          50: '${lighten(theme.accent, 0.9)}',
          500: '${theme.accent}',
          900: '${darken(theme.accent, 0.3)}'
        }
      }
    }
  }
}`

    case 'json':
      return JSON.stringify({
        name: theme.name,
        description: theme.description,
        colors: {
          primary: theme.primary,
          secondary: theme.secondary,
          accent: theme.accent
        },
        variants: {
          primary: {
            50: lighten(theme.primary, 0.9),
            100: lighten(theme.primary, 0.8),
            500: theme.primary,
            900: darken(theme.primary, 0.3)
          },
          secondary: {
            50: lighten(theme.secondary, 0.9),
            500: theme.secondary,
            900: darken(theme.secondary, 0.3)
          },
          accent: {
            50: lighten(theme.accent, 0.9),
            500: theme.accent,
            900: darken(theme.accent, 0.3)
          }
        }
      }, null, 2)

    default:
      return ''
  }
})

// Methods
const selectTheme = (theme: any) => {
  selectedThemeId.value = theme.id
  toastStore.success('Theme Applied', `${theme.name} theme has been applied`)
}

const applyCustomTheme = () => {
  const customThemeData = {
    id: 'custom',
    name: 'Custom Theme',
    description: 'Your custom color theme',
    category: 'custom',
    ...customTheme.value
  }
  
  // Add or update custom theme in available themes
  const existingIndex = availableThemes.value.findIndex(t => t.id === 'custom')
  if (existingIndex >= 0) {
    availableThemes.value[existingIndex] = customThemeData
  } else {
    availableThemes.value.push(customThemeData)
  }
  
  selectedThemeId.value = 'custom'
  toastStore.success('Custom Theme Applied', 'Your custom theme has been created and applied')
}

const resetCustomTheme = () => {
  customTheme.value = {
    primary: '#3B82F6',
    secondary: '#6B7280',
    accent: '#10B981'
  }
  toastStore.info('Reset', 'Custom theme colors have been reset')
}

const exportTheme = () => {
  showExportModal.value = true
}

const copyThemeCode = async () => {
  try {
    await navigator.clipboard.writeText(exportedThemeCode.value)
    toastStore.success('Copied!', 'Theme code copied to clipboard')
    showExportModal.value = false
  } catch (error) {
    toastStore.error('Copy Failed', 'Unable to copy theme code')
  }
}

// Color manipulation utilities
const lighten = (color: string, amount: number) => {
  // Simple color lightening - in a real app, use a proper color library
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  const newR = Math.min(255, Math.round(r + (255 - r) * amount))
  const newG = Math.min(255, Math.round(g + (255 - g) * amount))
  const newB = Math.min(255, Math.round(b + (255 - b) * amount))
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}

const darken = (color: string, amount: number) => {
  // Simple color darkening
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  const newR = Math.max(0, Math.round(r * (1 - amount)))
  const newG = Math.max(0, Math.round(g * (1 - amount)))
  const newB = Math.max(0, Math.round(b * (1 - amount)))
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}
</script>

<style scoped>
/* Custom scrollbar for export modal */
pre::-webkit-scrollbar {
  width: 6px;
}

pre::-webkit-scrollbar-track {
  background: #f3f4f6;
}

pre::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Dark mode scrollbar */
.dark pre::-webkit-scrollbar-track {
  background: #374151;
}

.dark pre::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark pre::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>