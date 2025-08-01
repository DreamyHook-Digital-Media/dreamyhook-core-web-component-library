<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div class="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Hero Content -->
          <div class="text-center lg:text-left">
            <Badge variant="primary" size="lg" class="mb-6">
              🚀 Now Available - Version 2.0
            </Badge>
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Build Amazing
              <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Web Apps
              </span>
              Faster
            </h1>
            
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              DreamyHook provides 46+ production-ready components built with Vue 3, TypeScript, and Tailwind CSS. 
              Ship faster with our comprehensive design system.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                variant="primary"
                size="lg"
                @click="showGetStartedModal = true"
              >
                Get Started Free
                <ArrowRightIcon class="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                @click="viewDemos"
              >
                <PlayIcon class="mr-2 h-5 w-5" />
                View Live Demo
              </Button>
            </div>
            
            <!-- Social Proof -->
            <div class="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center">
                <StarIcon class="h-5 w-5 text-yellow-400 fill-current mr-1" />
                <span>4.9/5 Rating</span>
              </div>
              <div class="flex items-center">
                <UserGroupIcon class="h-5 w-5 mr-1" />
                <span>10,000+ Developers</span>
              </div>
              <div class="flex items-center">
                <CodeBracketIcon class="h-5 w-5 mr-1" />
                <span>MIT License</span>
              </div>
            </div>
          </div>
          
          <!-- Hero Visual -->
          <div class="relative">
            <div class="relative mx-auto max-w-lg">
              <!-- Floating Component Cards -->
              <div class="absolute -top-4 -left-4 z-10">
                <Card variant="shadow" class="p-4 transform rotate-3 hover:rotate-6 transition-transform">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckIcon class="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">Button</p>
                      <p class="text-xs text-gray-500">Interactive</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div class="absolute -top-8 -right-8 z-10">
                <Card variant="shadow" class="p-4 transform -rotate-3 hover:-rotate-6 transition-transform">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckIcon class="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">Modal</p>
                      <p class="text-xs text-gray-500">Accessible</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div class="absolute -bottom-4 -left-8 z-10">
                <Card variant="shadow" class="p-4 transform rotate-6 hover:rotate-12 transition-transform">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <CheckIcon class="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">DataTable</p>
                      <p class="text-xs text-gray-500">Sortable</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <!-- Main Visual -->
              <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
                    <Badge variant="success">Live</Badge>
                  </div>
                  <div class="space-y-3">
                    <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                    <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                    <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                  </div>
                  <div class="flex space-x-2">
                    <div class="h-8 bg-blue-500 rounded w-20"></div>
                    <div class="h-8 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Build Modern Apps
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our comprehensive component library includes everything from basic UI elements to complex data visualizations, 
            all built with accessibility and performance in mind.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            v-for="feature in features"
            :key="feature.id"
            variant="bordered"
            hoverable
            class="text-center p-8"
          >
            <div class="mb-6">
              <div class="inline-flex p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
                <component :is="feature.icon" class="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              {{ feature.description }}
            </p>
            <Badge :variant="feature.badgeVariant" size="sm">
              {{ feature.badge }}
            </Badge>
          </Card>
        </div>
      </div>
    </section>

    <!-- Components Showcase -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            46+ Production-Ready Components
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From simple buttons to complex data tables, every component is crafted with attention to detail.
          </p>
        </div>
        
        <!-- Component Categories -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            v-for="category in componentCategories"
            :key="category.id"
            :variant="selectedCategory === category.id ? 'primary' : 'outline'"
            size="sm"
            @click="selectedCategory = category.id"
          >
            {{ category.name }} ({{ category.count }})
          </Button>
        </div>
        
        <!-- Component Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            v-for="component in filteredComponents"
            :key="component.id"
            variant="bordered"
            hoverable
            clickable
            @click="previewComponent(component)"
          >
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-gray-900 dark:text-white">
                  {{ component.name }}
                </h3>
                <Badge
                  :variant="component.status === 'new' ? 'success' : 'secondary'"
                  size="sm"
                >
                  {{ component.status }}
                </Badge>
              </div>
              
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {{ component.description }}
              </p>
              
              <!-- Component Preview -->
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 min-h-20 flex items-center justify-center">
                <component 
                  :is="component.preview" 
                  v-if="component.preview"
                  class="scale-75"
                />
                <div v-else class="text-xs text-gray-400">
                  {{ component.name }} Preview
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by Developers Worldwide
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Join thousands of developers who trust DreamyHook for their projects.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            variant="shadow"
            class="p-8"
          >
            <div class="flex items-center mb-4">
              <div class="flex">
                <StarIcon
                  v-for="star in 5"
                  :key="star"
                  class="h-5 w-5 text-yellow-400 fill-current"
                />
              </div>
            </div>
            
            <blockquote class="text-gray-600 dark:text-gray-300 mb-6">
              "{{ testimonial.quote }}"
            </blockquote>
            
            <div class="flex items-center">
              <Avatar
                :src="testimonial.avatar"
                size="md"
                class="mr-4"
              />
              <div>
                <p class="font-semibold text-gray-900 dark:text-white">
                  {{ testimonial.name }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ testimonial.title }}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Start building for free, upgrade when you need more.
          </p>
          
          <div class="flex items-center justify-center mt-8">
            <span class="text-sm text-gray-600 dark:text-gray-300">Monthly</span>
            <Toggle v-model="yearlyBilling" class="mx-3" />
            <span class="text-sm text-gray-600 dark:text-gray-300">
              Yearly 
              <Badge variant="success" size="sm" class="ml-1">Save 20%</Badge>
            </span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            v-for="plan in pricingPlans"
            :key="plan.id"
            :variant="plan.featured ? 'shadow' : 'bordered'"
            :class="[
              'relative p-8',
              plan.featured ? 'ring-2 ring-blue-500 scale-105' : ''
            ]"
          >
            <div v-if="plan.featured" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge variant="primary" size="lg">
                Most Popular
              </Badge>
            </div>
            
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ plan.name }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                {{ plan.description }}
              </p>
              
              <div class="text-4xl font-bold text-gray-900 dark:text-white">
                ${{ yearlyBilling ? plan.yearlyPrice : plan.monthlyPrice }}
                <span class="text-lg font-normal text-gray-500">
                  /{{ yearlyBilling ? 'year' : 'month' }}
                </span>
              </div>
            </div>
            
            <ul class="space-y-3 mb-8">
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="flex items-center"
              >
                <CheckIcon class="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span class="text-gray-600 dark:text-gray-300">{{ feature }}</span>
              </li>
            </ul>
            
            <Button
              :variant="plan.featured ? 'primary' : 'outline'"
              size="lg"
              full-width
              @click="selectPlan(plan)"
            >
              {{ plan.cta }}
            </Button>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Build Something Amazing?
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Join over 10,000 developers who are already using DreamyHook to build incredible web applications.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="secondary"
            size="xl"
            @click="startFreeTrial"
          >
            Start Free Trial
            <ArrowRightIcon class="ml-2 h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="xl"
            class="text-white border-white hover:bg-white hover:text-blue-600"
            @click="contactSales"
          >
            Talk to Sales
          </Button>
        </div>
        
        <p class="text-sm text-blue-200 mt-6">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to know about DreamyHook.
          </p>
        </div>
        
        <div class="space-y-4">
          <Card
            v-for="faq in faqs"
            :key="faq.id"
            variant="bordered"
            clickable
            @click="toggleFaq(faq.id)"
          >
            <div class="p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ faq.question }}
                </h3>
                <ChevronDownIcon
                  :class="[
                    'h-5 w-5 text-gray-500 transition-transform',
                    expandedFaq === faq.id ? 'rotate-180' : ''
                  ]"
                />
              </div>
              
              <div
                v-if="expandedFaq === faq.id"
                class="mt-4 text-gray-600 dark:text-gray-300"
              >
                {{ faq.answer }}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Stay Updated
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Get notified about new components, features, and best practices.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <TextInput
            v-model="newsletterEmail"
            type="email"
            placeholder="Enter your email"
            class="flex-1"
          />
          <Button
            variant="primary"
            @click="subscribeNewsletter"
            :loading="subscribing"
          >
            Subscribe
          </Button>
        </div>
        
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">
          No spam, unsubscribe at any time.
        </p>
      </div>
    </section>

    <!-- Get Started Modal -->
    <Modal
      v-model:isOpen="showGetStartedModal"
      title="Get Started with DreamyHook"
      size="lg"
    >
      <div class="space-y-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Choose Your Starting Point
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Select the option that best fits your needs.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            variant="bordered"
            hoverable
            clickable
            @click="startWithTemplate"
            class="p-6 text-center"
          >
            <div class="mb-4">
              <div class="inline-flex p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <DocumentIcon class="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
              Start with Template
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Use our pre-built templates to get started quickly.
            </p>
          </Card>
          
          <Card
            variant="bordered"
            hoverable
            clickable
            @click="startFromScratch"
            class="p-6 text-center"
          >
            <div class="mb-4">
              <div class="inline-flex p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <CodeBracketIcon class="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
              Start from Scratch
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Install the library and build your own components.
            </p>
          </Card>
        </div>
        
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Need help deciding? 
            <a href="#" class="text-blue-600 hover:underline">View our documentation</a>
          </p>
        </div>
      </div>
    </Modal>

    <!-- Component Preview Modal -->
    <Modal
      v-model:isOpen="showPreviewModal"
      :title="selectedComponent?.name"
      size="full"
    >
      <div v-if="selectedComponent" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Preview -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Live Preview
            </h3>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 min-h-96 flex items-center justify-center">
              <component 
                :is="selectedComponent.preview" 
                v-if="selectedComponent.preview"
              />
              <div v-else class="text-gray-400">
                {{ selectedComponent.name }} Preview
              </div>
            </div>
          </div>
          
          <!-- Code Example -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Code Example
            </h3>
            <div class="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
              <pre><code>{{ selectedComponent.codeExample }}</code></pre>
            </div>
            
            <div class="mt-4 space-y-2">
              <h4 class="font-medium text-gray-900 dark:text-white">Features:</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li v-for="feature in selectedComponent.features" :key="feature">
                  • {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToastStore } from '@/store/useToastStore'
import {
  ArrowRightIcon,
  PlayIcon,
  StarIcon,
  UserGroupIcon,
  CodeBracketIcon,
  CheckIcon,
  ChevronDownIcon,
  DocumentIcon
} from '@heroicons/vue/24/outline'
import {
  CubeIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  BoltIcon,
  SwatchIcon,
  DevicePhoneMobileIcon
} from '@heroicons/vue/24/solid'
import {
  Avatar,
  Badge,
  Button,
  Card,
  Modal,
  TextInput,
  Toggle
} from '@/components'

const toastStore = useToastStore()

// State
const showGetStartedModal = ref(false)
const showPreviewModal = ref(false)
const selectedCategory = ref('all')
const selectedComponent = ref(null)
const yearlyBilling = ref(false)
const expandedFaq = ref(null)
const newsletterEmail = ref('')
const subscribing = ref(false)

// Features
const features = ref([
  {
    id: 1,
    title: '46+ Components',
    description: 'From basic buttons to complex data tables, every component you need.',
    icon: CubeIcon,
    badge: 'Complete',
    badgeVariant: 'success'
  },
  {
    id: 2,
    title: 'TypeScript Ready',
    description: 'Full type safety with comprehensive TypeScript definitions.',
    icon: ShieldCheckIcon,
    badge: 'Type Safe',
    badgeVariant: 'primary'
  },
  {
    id: 3,
    title: 'Dark Mode',
    description: 'Built-in dark mode support across all components.',
    icon: SwatchIcon,
    badge: 'Modern',
    badgeVariant: 'secondary'
  },
  {
    id: 4,
    title: 'Accessible',
    description: 'WCAG compliant components that work for everyone.',
    icon: PuzzlePieceIcon,
    badge: 'WCAG',
    badgeVariant: 'info'
  },
  {
    id: 5,
    title: 'Performance',
    description: 'Optimized for speed with minimal bundle size impact.',
    icon: BoltIcon,
    badge: 'Fast',
    badgeVariant: 'warning'
  },
  {
    id: 6,
    title: 'Responsive',
    description: 'Mobile-first design that works on all screen sizes.',
    icon: DevicePhoneMobileIcon,
    badge: 'Mobile',
    badgeVariant: 'default'
  }
])

// Component Categories
const componentCategories = ref([
  { id: 'all', name: 'All', count: 46 },
  { id: 'core', name: 'Core', count: 8 },
  { id: 'forms', name: 'Forms', count: 7 },
  { id: 'navigation', name: 'Navigation', count: 9 },
  { id: 'overlays', name: 'Overlays', count: 8 },
  { id: 'widgets', name: 'Widgets', count: 10 },
  { id: 'templates', name: 'Templates', count: 4 }
])

// Components
const components = ref([
  {
    id: 1,
    name: 'Button',
    category: 'core',
    description: 'Interactive button with multiple variants and sizes.',
    status: 'stable',
    preview: Button,
    codeExample: '<Button variant="primary" size="lg">Click me</Button>',
    features: ['Multiple variants', 'Loading states', 'Icon support', 'Full accessibility']
  },
  {
    id: 2,
    name: 'Modal',
    category: 'overlays',
    description: 'Accessible modal dialog with backdrop and focus management.',
    status: 'stable',
    preview: null,
    codeExample: '<Modal v-model:isOpen="showModal" title="Example">Content</Modal>',
    features: ['Focus management', 'Backdrop click', 'ESC key support', 'Size variants']
  },
  {
    id: 3,
    name: 'DataTable',
    category: 'widgets',
    description: 'Sortable data table with pagination and selection.',
    status: 'new',
    preview: null,
    codeExample: '<DataTable :columns="columns" :data="data" sortable />',
    features: ['Sorting', 'Pagination', 'Row selection', 'Custom cells']
  },
  {
    id: 4,
    name: 'Card',
    category: 'core',
    description: 'Flexible container for grouping related content.',
    status: 'stable',
    preview: Card,
    codeExample: '<Card variant="bordered" title="Example">Content</Card>',
    features: ['Multiple variants', 'Header/footer slots', 'Hover effects', 'Media support']
  }
])

// Testimonials
const testimonials = ref([
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Senior Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    quote: 'DreamyHook saved us months of development time. The components are well-designed and easy to customize.'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    title: 'CTO, TechStart',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    quote: 'The TypeScript support is excellent. Our team productivity increased by 40% after switching to DreamyHook.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    quote: 'Finally, a component library that designers and developers both love. The consistency is perfect.'
  }
])

// Pricing Plans
const pricingPlans = ref([
  {
    id: 'free',
    name: 'Open Source',
    description: 'Perfect for personal projects and learning.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    featured: false,
    cta: 'Get Started Free',
    features: [
      'All 46 components',
      'MIT License',
      'Community support',
      'Basic documentation',
      'TypeScript definitions'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For professional developers and small teams.',
    monthlyPrice: 29,
    yearlyPrice: 290,
    featured: true,
    cta: 'Start Pro Trial',
    features: [
      'Everything in Free',
      'Premium templates',
      'Priority support',
      'Advanced examples',
      'Figma design system',
      'Custom themes'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large teams and organizations.',
    monthlyPrice: 99,
    yearlyPrice: 990,
    featured: false,
    cta: 'Contact Sales',
    features: [
      'Everything in Pro',
      'Custom components',
      'Dedicated support',
      'SLA guarantee',
      'Training sessions',
      'White-label license'
    ]
  }
])

// FAQs
const faqs = ref([
  {
    id: 1,
    question: 'Is DreamyHook really free?',
    answer: 'Yes! DreamyHook is open source under MIT license. You can use all components for free in any project, commercial or personal.'
  },
  {
    id: 2,
    question: 'Do I need to know Vue 3 to use DreamyHook?',
    answer: 'Yes, DreamyHook is built specifically for Vue 3. Basic knowledge of Vue 3 Composition API is recommended.'
  },
  {
    id: 3,
    question: 'Can I customize the components?',
    answer: 'Absolutely! All components use Tailwind CSS classes and accept custom props. You can easily customize colors, sizes, and styling.'
  },
  {
    id: 4,
    question: 'Is TypeScript support included?',
    answer: 'Yes, all components come with full TypeScript definitions and are built with type safety in mind.'
  },
  {
    id: 5,
    question: 'How do I get support?',
    answer: 'Free users get community support through GitHub issues. Pro and Enterprise users get priority email support and dedicated assistance.'
  }
])

// Computed
const filteredComponents = computed(() => {
  if (selectedCategory.value === 'all') {
    return components.value
  }
  return components.value.filter(component => component.category === selectedCategory.value)
})

// Methods
const viewDemos = () => {
  toastStore.info('Demo Navigation', 'Redirecting to live component demos...')
}

const previewComponent = (component: any) => {
  selectedComponent.value = component
  showPreviewModal.value = true
}

const selectPlan = (plan: any) => {
  toastStore.success('Plan Selected', `${plan.name} plan selected! Redirecting to checkout...`)
}

const startFreeTrial = () => {
  toastStore.success('Trial Started', 'Welcome to your 14-day free trial!')
}

const contactSales = () => {
  toastStore.info('Contact Sales', 'Opening sales contact form...')
}

const toggleFaq = (faqId: number) => {
  expandedFaq.value = expandedFaq.value === faqId ? null : faqId
}

const subscribeNewsletter = async () => {
  if (!newsletterEmail.value) {
    toastStore.error('Email Required', 'Please enter your email address.')
    return
  }
  
  subscribing.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    toastStore.success('Subscribed!', 'Thank you for subscribing to our newsletter.')
    newsletterEmail.value = ''
  } catch (error) {
    toastStore.error('Subscription Failed', 'Please try again later.')
  } finally {
    subscribing.value = false
  }
}

const startWithTemplate = () => {
  showGetStartedModal.value = false
  toastStore.info('Template Setup', 'Setting up your project with a template...')
}

const startFromScratch = () => {
  showGetStartedModal.value = false
  toastStore.info('Installation Guide', 'Opening installation documentation...')
}
</script>

<style scoped>
.bg-grid-pattern {
  background-image: url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23000' fill-opacity='0.05'%3e%3ccircle cx='7' cy='7' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e");
}
</style>