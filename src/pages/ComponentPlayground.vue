<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Component Playground
            </h1>
            <Badge variant="primary" size="sm">Interactive</Badge>
          </div>
          
          <div class="flex items-center space-x-3">
            <!-- Theme Toggle -->
            <ThemeToggle />
            
            <!-- Export Code Button -->
            <Button
              variant="outline"
              size="sm"
              @click="exportCodeToModal"
            >
              <CodeBracketIcon class="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <!-- Reset Button -->
            <Button
              variant="ghost"
              size="sm"
              @click="resetPlayground"
            >
              <ArrowPathIcon class="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        <!-- Component Selector Sidebar -->
        <div class="lg:col-span-1 space-y-4">
          <Card variant="bordered" class="h-full">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                Components
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Select a component to customize
              </p>
            </div>
            
            <div class="p-4 space-y-3 overflow-y-auto flex-1">
              <!-- Search Components -->
              <TextInput
                v-model="componentSearch"
                placeholder="Search components..."
                class="mb-4"
              >
                <template #prefix>
                  <MagnifyingGlassIcon class="h-4 w-4 text-gray-400" />
                </template>
              </TextInput>
              
              <!-- Component Categories -->
              <div class="space-y-2">
                <div
                  v-for="category in componentCategories"
                  :key="category.name"
                >
                  <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ category.name }}
                  </h3>
                  <div class="space-y-1">
                    <button
                      v-for="component in filteredComponents(category.components)"
                      :key="component.name"
                      @click="selectComponent(component)"
                      :class="[
                        'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                        selectedComponent?.name === component.name
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      ]"
                    >
                      <div class="flex items-center justify-between">
                        <span>{{ component.name }}</span>
                        <Badge
                          v-if="component.status === 'new'"
                          variant="success"
                          size="sm"
                        >
                          New
                        </Badge>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-3 space-y-4">
          <!-- Component Preview -->
          <Card variant="bordered" class="h-1/2">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ selectedComponent?.name || 'Select a Component' }}
                  </h2>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ selectedComponent?.description || 'Choose a component from the sidebar to start experimenting' }}
                  </p>
                </div>
                
                <div class="flex items-center space-x-2">
                  <!-- Viewport Size Toggles -->
                  <div class="flex items-center space-x-1 border border-gray-200 dark:border-gray-600 rounded-md p-1">
                    <button
                      v-for="viewport in viewportSizes"
                      :key="viewport.name"
                      @click="selectedViewport = viewport.name"
                      :class="[
                        'px-2 py-1 text-xs font-medium rounded transition-colors',
                        selectedViewport === viewport.name
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      ]"
                    >
                      <component :is="viewport.icon" class="h-3 w-3" />
                    </button>
                  </div>
                  
                  <!-- Fullscreen Toggle -->
                  <Button
                    variant="ghost"
                    size="sm"
                    @click="toggleFullscreen"
                  >
                    <ArrowsPointingOutIcon class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <!-- Preview Area -->
            <div class="flex-1 p-4">
              <div
                :class="[
                  'h-full bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-auto transition-all',
                  getViewportClass()
                ]"
              >
                <div class="p-8 h-full flex items-center justify-center">
                  <!-- Dynamic Component Render -->
                  <div v-if="selectedComponent" class="w-full max-w-2xl">
                    <component
                      :is="selectedComponent.component"
                      v-bind="componentProps"
                      @update:modelValue="handleModelUpdate"
                      @click="handleClick"
                      @change="handleChange"
                    >
                      {{ componentContent }}
                      
                      <!-- Dynamic Slots -->
                      <template
                        v-for="slot in selectedComponent.slots"
                        :key="slot.name"
                        #[slot.name]
                      >
                        <span v-html="getSlotContent(slot.name)"></span>
                      </template>
                    </component>
                  </div>
                  
                  <!-- Empty State -->
                  <div v-else class="text-center">
                    <CubeIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No Component Selected
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400">
                      Choose a component from the sidebar to start experimenting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <!-- Controls and Code Editor -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-1/2">
            <!-- Property Controls -->
            <Card variant="bordered" class="h-full">
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Properties
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Customize component props and content
                </p>
              </div>
              
              <div class="p-4 space-y-4 overflow-y-auto flex-1">
                <div v-if="selectedComponent">
                  <!-- Content Editor -->
                  <div v-if="selectedComponent.hasContent" class="space-y-2">
                    <Label>Content</Label>
                    <textarea
                      v-model="componentContent"
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter component content..."
                    />
                  </div>
                  
                  <!-- Dynamic Property Controls -->
                  <div
                    v-for="prop in selectedComponent.props"
                    :key="prop.name"
                    class="space-y-2"
                  >
                    <Label>{{ prop.label }}</Label>
                    
                    <!-- String Input -->
                    <TextInput
                      v-if="prop.type === 'string'"
                      v-model="componentProps[prop.name]"
                      :placeholder="prop.placeholder"
                    />
                    
                    <!-- Number Input -->
                    <TextInput
                      v-else-if="prop.type === 'number'"
                      v-model.number="componentProps[prop.name]"
                      type="number"
                      :placeholder="prop.placeholder"
                    />
                    
                    <!-- Boolean Toggle -->
                    <Toggle
                      v-else-if="prop.type === 'boolean'"
                      v-model="componentProps[prop.name]"
                      :label="prop.description"
                    />
                    
                    <!-- Select Options -->
                    <Select
                      v-else-if="prop.type === 'select'"
                      v-model="componentProps[prop.name]"
                      :options="prop.options"
                      :placeholder="prop.placeholder"
                    />
                    
                    <!-- Color Picker -->
                    <div v-else-if="prop.type === 'color'" class="flex space-x-2">
                      <input
                        v-model="componentProps[prop.name]"
                        type="color"
                        class="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                      />
                      <TextInput
                        v-model="componentProps[prop.name]"
                        class="flex-1"
                      />
                    </div>
                  </div>
                  
                  <!-- Slot Content Editors -->
                  <div
                    v-for="slot in selectedComponent.slots"
                    :key="slot.name"
                    class="space-y-2"
                  >
                    <Label>{{ slot.label }} Slot</Label>
                    <textarea
                      v-model="slotContent[slot.name]"
                      rows="2"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      :placeholder="slot.placeholder"
                    />
                  </div>
                </div>
                
                <!-- Empty State -->
                <div v-else class="text-center py-8">
                  <AdjustmentsHorizontalIcon class="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p class="text-gray-500 dark:text-gray-400">
                    Select a component to see its properties
                  </p>
                </div>
              </div>
            </Card>

            <!-- Generated Code -->
            <Card variant="bordered" class="h-full">
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      Generated Code
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Copy and paste into your project
                    </p>
                  </div>
                  
                  <div class="flex items-center space-x-2">
                    <!-- Code Format Toggle -->
                    <div class="flex items-center space-x-1 border border-gray-200 dark:border-gray-600 rounded-md p-1">
                      <button
                        v-for="format in codeFormats"
                        :key="format.name"
                        @click="selectedCodeFormat = format.name"
                        :class="[
                          'px-2 py-1 text-xs font-medium rounded transition-colors',
                          selectedCodeFormat === format.name
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        ]"
                      >
                        {{ format.label }}
                      </button>
                    </div>
                    
                    <!-- Copy Button -->
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="copyCode"
                    >
                      <ClipboardIcon class="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div class="flex-1 relative">
                <pre
                  ref="codeBlock"
                  class="h-full p-4 bg-gray-900 text-gray-100 text-sm overflow-auto font-mono"
                ><code>{{ generatedCode }}</code></pre>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>

    <!-- Export Modal -->
    <Modal
      v-model:isOpen="showExportModal"
      title="Export Code"
      size="lg"
    >
      <div class="space-y-4">
        <div>
          <Label>Export Format</Label>
          <Select
            v-model="exportFormat"
            :options="[
              { value: 'vue', label: 'Vue Single File Component' },
              { value: 'template', label: 'Template Only' },
              { value: 'script', label: 'Script Setup Only' },
              { value: 'html', label: 'HTML' }
            ]"
          />
        </div>
        
        <div>
          <Label>File Name</Label>
          <TextInput
            v-model="exportFileName"
            placeholder="MyComponent.vue"
          />
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <pre class="text-sm overflow-x-auto"><code>{{ exportCode }}</code></pre>
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
            @click="downloadCode"
          >
            <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </Modal>

    <!-- Fullscreen Modal -->
    <Modal
      v-model:isOpen="showFullscreen"
      size="full"
      :show-close="false"
    >
      <div class="h-full flex flex-col">
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ selectedComponent?.name }} - Fullscreen Preview
          </h2>
          <Button
            variant="ghost"
            @click="showFullscreen = false"
          >
            <XMarkIcon class="h-5 w-5" />
          </Button>
        </div>
        
        <div class="flex-1 p-8 bg-white dark:bg-gray-800">
          <div class="h-full flex items-center justify-center">
            <component
              v-if="selectedComponent"
              :is="selectedComponent.component"
              v-bind="componentProps"
              class="max-w-4xl w-full"
            >
              {{ componentContent }}
              
              <template
                v-for="slot in selectedComponent.slots"
                :key="slot.name"
                #[slot.name]
              >
                <span v-html="getSlotContent(slot.name)"></span>
              </template>
            </component>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useToastStore } from '@/store/useToastStore'
import {
  MagnifyingGlassIcon,
  CodeBracketIcon,
  ArrowPathIcon,
  ArrowsPointingOutIcon,
  ClipboardIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  CubeIcon
} from '@heroicons/vue/24/outline'
import {
  ComputerDesktopIcon,
  DeviceTabletIcon,
  DevicePhoneMobileIcon
} from '@heroicons/vue/24/solid'
import {
  Badge,
  Button,
  Card,
  Modal,
  TextInput,
  Toggle,
  Select,
  Label,
  ThemeToggle
} from '@/components'

const toastStore = useToastStore()

// State
const componentSearch = ref('')
const selectedComponent = ref(null)
const selectedViewport = ref('desktop')
const selectedCodeFormat = ref('vue')
const showExportModal = ref(false)
const showFullscreen = ref(false)
const exportFormat = ref('vue')
const exportFileName = ref('MyComponent.vue')

// Component props and content
const componentProps = ref({})
const componentContent = ref('')
const slotContent = ref({})

// Viewport sizes
const viewportSizes = ref([
  { name: 'desktop', icon: ComputerDesktopIcon, class: 'w-full' },
  { name: 'tablet', icon: DeviceTabletIcon, class: 'w-96 mx-auto' },
  { name: 'mobile', icon: DevicePhoneMobileIcon, class: 'w-80 mx-auto' }
])

// Code formats
const codeFormats = ref([
  { name: 'vue', label: 'Vue' },
  { name: 'html', label: 'HTML' },
  { name: 'jsx', label: 'JSX' }
])

// Component definitions
const componentCategories = ref([
  {
    name: 'Core Elements',
    components: [
      {
        name: 'Button',
        component: Button,
        description: 'Interactive button with multiple variants and states',
        status: 'stable',
        hasContent: true,
        props: [
          {
            name: 'variant',
            label: 'Variant',
            type: 'select',
            options: [
              { value: 'primary', label: 'Primary' },
              { value: 'secondary', label: 'Secondary' },
              { value: 'outline', label: 'Outline' },
              { value: 'ghost', label: 'Ghost' }
            ]
          },
          {
            name: 'size',
            label: 'Size',
            type: 'select',
            options: [
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' },
              { value: 'xl', label: 'Extra Large' }
            ]
          },
          {
            name: 'disabled',
            label: 'Disabled',
            type: 'boolean',
            description: 'Disable the button'
          },
          {
            name: 'loading',
            label: 'Loading',
            type: 'boolean',
            description: 'Show loading state'
          },
          {
            name: 'fullWidth',
            label: 'Full Width',
            type: 'boolean',
            description: 'Make button full width'
          }
        ],
        slots: []
      },
      {
        name: 'Badge',
        component: Badge,
        description: 'Small status descriptor for UI elements',
        hasContent: true,
        props: [
          {
            name: 'variant',
            label: 'Variant',
            type: 'select',
            options: [
              { value: 'primary', label: 'Primary' },
              { value: 'secondary', label: 'Secondary' },
              { value: 'success', label: 'Success' },
              { value: 'warning', label: 'Warning' },
              { value: 'error', label: 'Error' },
              { value: 'info', label: 'Info' }
            ]
          },
          {
            name: 'size',
            label: 'Size',
            type: 'select',
            options: [
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' }
            ]
          }
        ],
        slots: []
      },
      {
        name: 'Card',
        component: Card,
        description: 'Flexible container for grouping related content',
        hasContent: true,
        props: [
          {
            name: 'variant',
            label: 'Variant',
            type: 'select',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'bordered', label: 'Bordered' },
              { value: 'shadow', label: 'Shadow' }
            ]
          },
          {
            name: 'title',
            label: 'Title',
            type: 'string',
            placeholder: 'Card title'
          },
          {
            name: 'hoverable',
            label: 'Hoverable',
            type: 'boolean',
            description: 'Add hover effects'
          },
          {
            name: 'clickable',
            label: 'Clickable',
            type: 'boolean',
            description: 'Add click cursor'
          }
        ],
        slots: [
          { name: 'header', label: 'Header', placeholder: 'Header content' },
          { name: 'footer', label: 'Footer', placeholder: 'Footer content' }
        ]
      }
    ]
  },
  {
    name: 'Form Controls',
    components: [
      {
        name: 'TextInput',
        component: TextInput,
        description: 'Text input field with validation support',
        hasContent: false,
        props: [
          {
            name: 'placeholder',
            label: 'Placeholder',
            type: 'string',
            placeholder: 'Enter placeholder text'
          },
          {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
              { value: 'text', label: 'Text' },
              { value: 'email', label: 'Email' },
              { value: 'password', label: 'Password' },
              { value: 'number', label: 'Number' }
            ]
          },
          {
            name: 'disabled',
            label: 'Disabled',
            type: 'boolean',
            description: 'Disable the input'
          },
          {
            name: 'error',
            label: 'Error Message',
            type: 'string',
            placeholder: 'Error message'
          }
        ],
        slots: [
          { name: 'prefix', label: 'Prefix', placeholder: 'Icon or text' },
          { name: 'suffix', label: 'Suffix', placeholder: 'Icon or text' }
        ]
      },
      {
        name: 'Toggle',
        component: Toggle,
        description: 'Switch toggle for boolean values',
        hasContent: false,
        props: [
          {
            name: 'label',
            label: 'Label',
            type: 'string',
            placeholder: 'Toggle label'
          },
          {
            name: 'size',
            label: 'Size',
            type: 'select',
            options: [
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' }
            ]
          },
          {
            name: 'disabled',
            label: 'Disabled',
            type: 'boolean',
            description: 'Disable the toggle'
          }
        ],
        slots: []
      },
      {
        name: 'Select',
        component: Select,
        description: 'Dropdown select with searchable options',
        hasContent: false,
        props: [
          {
            name: 'placeholder',
            label: 'Placeholder',
            type: 'string',
            placeholder: 'Select an option'
          },
          {
            name: 'multiple',
            label: 'Multiple',
            type: 'boolean',
            description: 'Allow multiple selections'
          },
          {
            name: 'disabled',
            label: 'Disabled',
            type: 'boolean',
            description: 'Disable the select'
          }
        ],
        slots: []
      }
    ]
  }
])

// Computed
const filteredComponents = (components: any[]) => {
  if (!componentSearch.value) return components
  return components.filter(component =>
    component.name.toLowerCase().includes(componentSearch.value.toLowerCase())
  )
}

const generatedCode = computed(() => {
  if (!selectedComponent.value) return '<!-- Select a component to see generated code -->'
  
  const component = selectedComponent.value
  const props = Object.entries(componentProps.value)
    .filter(([key, value]) => value !== undefined && value !== '' && value !== false)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? key : ''
      }
      if (typeof value === 'string') {
        return `${key}="${value}"`
      }
      return `:${key}="${value}"`
    })
    .filter(Boolean)
    .join(' ')
  
  const propsString = props ? ` ${props}` : ''
  const content = componentContent.value || ''
  const hasSlots = component.slots && component.slots.length > 0
  
  if (selectedCodeFormat.value === 'vue') {
    let code = `<${component.name}${propsString}`
    
    if (!content && !hasSlots) {
      code += ' />'
    } else {
      code += '>'
      
      if (hasSlots) {
        code += '\n'
        component.slots.forEach(slot => {
          const slotContentValue = slotContent.value[slot.name]
          if (slotContentValue) {
            code += `  <template #${slot.name}>\n    ${slotContentValue}\n  </template>\n`
          }
        })
        if (content) {
          code += `  ${content}\n`
        }
        code += `</${component.name}>`
      } else {
        code += content
        code += `</${component.name}>`
      }
    }
    
    return code
  }
  
  if (selectedCodeFormat.value === 'html') {
    return `<div class="dreamyhook-${component.name.toLowerCase()}"${propsString}>${content}</div>`
  }
  
  if (selectedCodeFormat.value === 'jsx') {
    const jsxProps = Object.entries(componentProps.value)
      .filter(([key, value]) => value !== undefined && value !== '' && value !== false)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : ''
        }
        return `${key}={${typeof value === 'string' ? `"${value}"` : value}}`
      })
      .filter(Boolean)
      .join(' ')
    
    return `<${component.name}${jsxProps ? ` ${jsxProps}` : ''}>${content}</${component.name}>`
  }
  
  return ''
})

const exportCode = computed(() => {
  if (!selectedComponent.value) return ''
  
  const component = selectedComponent.value
  
  if (exportFormat.value === 'vue') {
    return `<template>
  ${generatedCode.value}
</template>

<${'script'} setup lang="ts">
import { ${component.name} } from '@dreamyhook/core'
</${'script'}>`
  }
  
  if (exportFormat.value === 'template') {
    return generatedCode.value
  }
  
  if (exportFormat.value === 'script') {
    return `<${'script'} setup lang="ts">
import { ${component.name} } from '@dreamyhook/core'
</${'script'}>`
  }
  
  if (exportFormat.value === 'html') {
    return `<!DOCTYPE html>
<html>
<head>
  <title>DreamyHook Component</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
  ${generatedCode.value}
</body>
</html>`
  }
  
  return generatedCode.value
})

// Methods
const selectComponent = (component: any) => {
  selectedComponent.value = component
  
  // Reset props and content
  componentProps.value = {}
  componentContent.value = component.hasContent ? `${component.name} Content` : ''
  slotContent.value = {}
  
  // Initialize default props
  component.props.forEach(prop => {
    if (prop.type === 'boolean') {
      componentProps.value[prop.name] = false
    } else if (prop.type === 'select' && prop.options.length > 0) {
      componentProps.value[prop.name] = prop.options[0].value
    } else {
      componentProps.value[prop.name] = ''
    }
  })
  
  // Initialize slot content
  component.slots.forEach(slot => {
    slotContent.value[slot.name] = slot.placeholder || `${slot.label} content`
  })
}

const getViewportClass = () => {
  const viewport = viewportSizes.value.find(v => v.name === selectedViewport.value)
  return viewport?.class || 'w-full'
}

const getSlotContent = (slotName: string) => {
  return slotContent.value[slotName] || ''
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(generatedCode.value)
    toastStore.success('Copied!', 'Code copied to clipboard')
  } catch (error) {
    toastStore.error('Copy Failed', 'Unable to copy code to clipboard')
  }
}

const exportCodeToModal = () => {
  showExportModal.value = true
  exportFileName.value = `${selectedComponent.value?.name || 'Component'}.vue`
}

const downloadCode = () => {
  const blob = new Blob([exportCode.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = exportFileName.value
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  
  showExportModal.value = false
  toastStore.success('Downloaded!', `${exportFileName.value} has been downloaded`)
}

const resetPlayground = () => {
  selectedComponent.value = null
  componentProps.value = {}
  componentContent.value = ''
  slotContent.value = {}
  componentSearch.value = ''
  selectedViewport.value = 'desktop'
  selectedCodeFormat.value = 'vue'
  
  toastStore.info('Reset', 'Playground has been reset')
}

const toggleFullscreen = () => {
  showFullscreen.value = true
}

const handleModelUpdate = (value: any) => {
  // Handle v-model updates from components
  console.log('Model update:', value)
}

const handleClick = () => {
  toastStore.info('Component Clicked', 'Button click event triggered')
}

const handleChange = (value: any) => {
  console.log('Component changed:', value)
}

// Initialize with first component
nextTick(() => {
  if (componentCategories.value[0]?.components[0]) {
    selectComponent(componentCategories.value[0].components[0])
  }
})
</script>

<style scoped>
/* Custom scrollbar for code blocks */
pre::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

pre::-webkit-scrollbar-track {
  background: #374151;
}

pre::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>