<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Animation & Interaction Examples
          </h1>
          <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Smooth transitions, micro-interactions, and delightful user experiences
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      <!-- Transition Effects -->
      <section>
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Transition Effects
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Smooth state transitions that provide visual feedback and improve user experience.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Fade Transitions -->
          <Card variant="bordered">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Fade & Scale Transitions
              </h3>
              
              <div class="space-y-4">
                <!-- Fade In/Out -->
                <div>
                  <Button
                    variant="primary"
                    @click="showFadeContent = !showFadeContent"
                    class="mb-4"
                  >
                    Toggle Fade Content
                  </Button>
                  
                  <Transition
                    enter-active-class="transition ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <div
                      v-if="showFadeContent"
                      class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                    >
                      <p class="text-blue-800 dark:text-blue-200">
                        This content fades in and out smoothly
                      </p>
                    </div>
                  </Transition>
                </div>

                <!-- Scale Transition -->
                <div>
                  <Button
                    variant="outline"
                    @click="showScaleContent = !showScaleContent"
                    class="mb-4"
                  >
                    Toggle Scale Content
                  </Button>
                  
                  <Transition
                    enter-active-class="transition ease-out duration-300"
                    enter-from-class="opacity-0 scale-90"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-200"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-90"
                  >
                    <div
                      v-if="showScaleContent"
                      class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                    >
                      <p class="text-green-800 dark:text-green-200">
                        This content scales and fades together
                      </p>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </Card>

          <!-- Slide Transitions -->
          <Card variant="bordered">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Slide Transitions
              </h3>
              
              <div class="space-y-4">
                <!-- Slide Down -->
                <div>
                  <Button
                    variant="primary"
                    @click="showSlideDown = !showSlideDown"
                    class="mb-4"
                  >
                    Toggle Slide Down
                  </Button>
                  
                  <Transition
                    enter-active-class="transition ease-out duration-300"
                    enter-from-class="transform -translate-y-4 opacity-0"
                    enter-to-class="transform translate-y-0 opacity-100"
                    leave-active-class="transition ease-in duration-200"
                    leave-from-class="transform translate-y-0 opacity-100"
                    leave-to-class="transform -translate-y-4 opacity-0"
                  >
                    <Alert
                      v-if="showSlideDown"
                      variant="info"
                      title="Sliding Alert"
                      dismissible
                      @dismiss="showSlideDown = false"
                    >
                      This alert slides down from above
                    </Alert>
                  </Transition>
                </div>

                <!-- Slide Right -->
                <div class="overflow-hidden">
                  <Button
                    variant="outline"
                    @click="showSlideRight = !showSlideRight"
                    class="mb-4"
                  >
                    Toggle Slide Right
                  </Button>
                  
                  <Transition
                    enter-active-class="transition ease-out duration-300"
                    enter-from-class="transform -translate-x-full"
                    enter-to-class="transform translate-x-0"
                    leave-active-class="transition ease-in duration-200"
                    leave-from-class="transform translate-x-0"
                    leave-to-class="transform -translate-x-full"
                  >
                    <div
                      v-if="showSlideRight"
                      class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                    >
                      <p class="text-purple-800 dark:text-purple-200">
                        This content slides in from the left
                      </p>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <!-- Micro-interactions -->
      <section>
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Micro-interactions
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Small animations that provide feedback and enhance the user experience.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Hover Effects -->
          <Card variant="bordered">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Hover Effects
              </h3>
              
              <div class="space-y-4">
                <!-- Button Hover -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Button with hover scale:
                  </p>
                  <Button
                    variant="primary"
                    class="transform transition-transform hover:scale-105"
                  >
                    Hover to Scale
                  </Button>
                </div>

                <!-- Card Hover -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Card with hover lift:
                  </p>
                  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transform transition-all hover:-translate-y-1 cursor-pointer">
                    <p class="text-gray-700 dark:text-gray-300">
                      Hover to lift this card
                    </p>
                  </div>
                </div>

                <!-- Icon Hover -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Icon with rotation:
                  </p>
                  <div class="flex space-x-4">
                    <button class="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <ArrowPathIcon class="h-6 w-6 transform transition-transform hover:rotate-180" />
                    </button>
                    <button class="p-2 text-gray-600 hover:text-red-600 transition-colors">
                      <HeartIcon class="h-6 w-6 transform transition-transform hover:scale-125" />
                    </button>
                    <button class="p-2 text-gray-600 hover:text-green-600 transition-colors">
                      <BellIcon class="h-6 w-6 transform transition-transform hover:-rotate-12" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <!-- Click Feedback -->
          <Card variant="bordered">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Click Feedback
              </h3>
              
              <div class="space-y-4">
                <!-- Ripple Effect -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Button with pulse:
                  </p>
                  <Button
                    variant="primary"
                    @click="triggerPulse"
                    :class="{ 'animate-pulse': isPulsing }"
                  >
                    Click for Pulse
                  </Button>
                </div>

                <!-- Like Animation -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Like button animation:
                  </p>
                  <button
                    @click="toggleLike"
                    class="relative p-2"
                  >
                    <HeartIcon
                      :class="[
                        'h-8 w-8 transition-all',
                        isLiked ? 'text-red-500 fill-current scale-110' : 'text-gray-400 hover:text-red-400'
                      ]"
                    />
                    <Transition
                      enter-active-class="transition ease-out duration-300"
                      enter-from-class="opacity-0 scale-50"
                      enter-to-class="opacity-100 scale-150"
                      leave-active-class="transition ease-in duration-200"
                      leave-to-class="opacity-0"
                    >
                      <div
                        v-if="showLikeEffect"
                        class="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        <HeartIcon class="h-8 w-8 text-red-500 fill-current" />
                      </div>
                    </Transition>
                  </button>
                </div>

                <!-- Success Check -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Success animation:
                  </p>
                  <Button
                    variant="outline"
                    @click="triggerSuccess"
                  >
                    <Transition mode="out-in">
                      <span v-if="!showSuccess" key="text">Complete Task</span>
                      <CheckIcon v-else key="check" class="h-5 w-5 text-green-500 animate-bounce" />
                    </Transition>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <!-- Loading States -->
          <Card variant="bordered">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Loading Animations
              </h3>
              
              <div class="space-y-4">
                <!-- Spinner -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Loading spinner:
                  </p>
                  <div class="flex items-center space-x-2">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span class="text-gray-600 dark:text-gray-400">Loading...</span>
                  </div>
                </div>

                <!-- Skeleton -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Skeleton pulse:
                  </p>
                  <div class="space-y-2">
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>

                <!-- Progress -->
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Progress animation:
                  </p>
                  <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      class="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      :style="{ width: `${progressAnimation}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <!-- List Animations -->
      <section>
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            List & Group Animations
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Animate multiple elements with staggered and coordinated effects.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Staggered List -->
          <Card variant="bordered">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Staggered List Animation
              </h3>
              
              <Button
                variant="primary"
                @click="toggleStaggeredList"
                class="mb-4"
              >
                {{ showStaggeredList ? 'Hide' : 'Show' }} List
              </Button>
              
              <TransitionGroup
                name="stagger"
                tag="div"
                class="space-y-2"
              >
                <div
                  v-for="(item, index) in staggeredItems"
                  :key="item.id"
                  v-show="showStaggeredList"
                  :style="{ transitionDelay: `${index * 100}ms` }"
                  class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-gray-700 dark:text-gray-300">{{ item.name }}</span>
                    <Badge :variant="item.variant">{{ item.status }}</Badge>
                  </div>
                </div>
              </TransitionGroup>
            </div>
          </Card>

          <!-- Sortable List -->
          <Card variant="bordered">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Reorderable List
              </h3>
              
              <div class="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  @click="shuffleList"
                >
                  Shuffle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  @click="sortList"
                >
                  Sort
                </Button>
              </div>
              
              <TransitionGroup
                name="flip"
                tag="div"
                class="space-y-2"
              >
                <div
                  v-for="item in sortableItems"
                  :key="item.id"
                  class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-move"
                >
                  <div class="flex items-center space-x-3">
                    <span class="text-2xl">{{ item.emoji }}</span>
                    <span class="text-gray-700 dark:text-gray-300">{{ item.name }}</span>
                  </div>
                </div>
              </TransitionGroup>
            </div>
          </Card>
        </div>
      </section>

      <!-- Complex Interactions -->
      <section>
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Complex Interactions
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Advanced animations combining multiple effects for rich user experiences.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Notification Stack -->
          <Card variant="bordered">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Notification Stack
              </h3>
              
              <Button
                variant="primary"
                @click="addNotification"
                class="mb-4"
              >
                Add Notification
              </Button>
              
              <div class="relative h-64">
                <TransitionGroup
                  name="notification"
                  tag="div"
                  class="space-y-2"
                >
                  <div
                    v-for="notification in notifications"
                    :key="notification.id"
                    class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2">
                        <component
                          :is="notification.icon"
                          :class="[
                            'h-5 w-5',
                            notification.color
                          ]"
                        />
                        <span class="text-sm font-medium text-gray-900 dark:text-white">
                          {{ notification.message }}
                        </span>
                      </div>
                      <button
                        @click="removeNotification(notification.id)"
                        class="text-gray-400 hover:text-gray-600"
                      >
                        <XMarkIcon class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </TransitionGroup>
              </div>
            </div>
          </Card>

          <!-- Card Flip -->
          <Card variant="bordered">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                3D Card Flip
              </h3>
              
              <div class="perspective-1000">
                <div
                  @click="isFlipped = !isFlipped"
                  :class="[
                    'relative w-full h-48 transition-transform duration-700 transform-style-3d cursor-pointer',
                    isFlipped ? 'rotate-y-180' : ''
                  ]"
                >
                  <!-- Front -->
                  <div class="absolute inset-0 w-full h-full backface-hidden">
                    <div class="h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                      <h4 class="text-xl font-bold mb-2">Front Side</h4>
                      <p>Click to flip the card</p>
                      <ArrowPathIcon class="h-8 w-8 mt-4" />
                    </div>
                  </div>
                  
                  <!-- Back -->
                  <div class="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                    <div class="h-full bg-gradient-to-br from-green-500 to-teal-600 rounded-lg p-6 text-white">
                      <h4 class="text-xl font-bold mb-2">Back Side</h4>
                      <p>Great! You flipped it.</p>
                      <CheckIcon class="h-8 w-8 mt-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Gesture Animations -->
        <Card variant="bordered" class="mt-6">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Gesture-based Interactions
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Swipe Card -->
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Swipeable card:
                </p>
                <div
                  class="relative h-32 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg p-4 text-white cursor-grab active:cursor-grabbing"
                  @mousedown="startDrag"
                  @mousemove="onDrag"
                  @mouseup="endDrag"
                  @mouseleave="endDrag"
                  :style="{ transform: `translateX(${dragX}px) rotate(${dragX / 10}deg)` }"
                >
                  <p class="font-medium">Drag me!</p>
                  <p class="text-sm opacity-75">I'll snap back</p>
                </div>
              </div>

              <!-- Expandable -->
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Expandable content:
                </p>
                <div
                  @click="isExpanded = !isExpanded"
                  class="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer"
                >
                  <div class="p-4">
                    <div class="flex items-center justify-between">
                      <span class="font-medium text-gray-900 dark:text-white">
                        Click to expand
                      </span>
                      <ChevronDownIcon
                        :class="[
                          'h-5 w-5 text-gray-500 transition-transform',
                          isExpanded ? 'rotate-180' : ''
                        ]"
                      />
                    </div>
                  </div>
                  <Transition
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="max-h-0"
                    enter-to-class="max-h-96"
                    leave-active-class="transition-all duration-300 ease-in"
                    leave-from-class="max-h-96"
                    leave-to-class="max-h-0"
                  >
                    <div v-if="isExpanded" class="px-4 pb-4">
                      <p class="text-gray-600 dark:text-gray-300">
                        This content expands smoothly when you click the header.
                        The height animation creates a natural reveal effect.
                      </p>
                    </div>
                  </Transition>
                </div>
              </div>

              <!-- Progress Button -->
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Progress button:
                </p>
                <Button
                  variant="primary"
                  @click="startProgress"
                  :disabled="isProgressing"
                  class="relative overflow-hidden"
                >
                  <span :class="{ 'opacity-0': isProgressing }">
                    Upload File
                  </span>
                  <div
                    v-if="isProgressing"
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <span class="text-sm">{{ uploadProgress }}%</span>
                  </div>
                  <div
                    v-if="isProgressing"
                    class="absolute bottom-0 left-0 h-1 bg-white/30 transition-all"
                    :style="{ width: `${uploadProgress}%` }"
                  ></div>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useToastStore } from '@/store/useToastStore'
import {
  ArrowPathIcon,
  HeartIcon,
  BellIcon,
  CheckIcon,
  XMarkIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'
import {
  Alert,
  Badge,
  Button,
  Card
} from '@/components'

const toastStore = useToastStore()

// State
const showFadeContent = ref(false)
const showScaleContent = ref(false)
const showSlideDown = ref(false)
const showSlideRight = ref(false)
const isPulsing = ref(false)
const isLiked = ref(false)
const showLikeEffect = ref(false)
const showSuccess = ref(false)
const progressAnimation = ref(0)
const showStaggeredList = ref(false)
const isFlipped = ref(false)
const isExpanded = ref(false)
const isProgressing = ref(false)
const uploadProgress = ref(0)

// Drag state
const isDragging = ref(false)
const dragX = ref(0)
const startX = ref(0)

// Staggered list items
const staggeredItems = ref([
  { id: 1, name: 'Task 1', status: 'completed', variant: 'success' },
  { id: 2, name: 'Task 2', status: 'in progress', variant: 'warning' },
  { id: 3, name: 'Task 3', status: 'pending', variant: 'secondary' },
  { id: 4, name: 'Task 4', status: 'completed', variant: 'success' }
])

// Sortable items
const sortableItems = ref([
  { id: 1, name: 'Apple', emoji: '🍎' },
  { id: 2, name: 'Banana', emoji: '🍌' },
  { id: 3, name: 'Cherry', emoji: '🍒' },
  { id: 4, name: 'Dragon Fruit', emoji: '🐉' }
])

// Notifications
const notifications = ref([])
let notificationId = 0

// Methods
const triggerPulse = () => {
  isPulsing.value = true
  setTimeout(() => {
    isPulsing.value = false
  }, 1000)
}

const toggleLike = () => {
  isLiked.value = !isLiked.value
  if (isLiked.value) {
    showLikeEffect.value = true
    setTimeout(() => {
      showLikeEffect.value = false
    }, 600)
  }
}

const triggerSuccess = () => {
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 2000)
}

const toggleStaggeredList = () => {
  showStaggeredList.value = !showStaggeredList.value
}

const shuffleList = () => {
  sortableItems.value = [...sortableItems.value].sort(() => Math.random() - 0.5)
}

const sortList = () => {
  sortableItems.value = [...sortableItems.value].sort((a, b) => a.name.localeCompare(b.name))
}

const addNotification = () => {
  const types = [
    { icon: CheckCircleIcon, color: 'text-green-500', message: 'Success! Action completed.' },
    { icon: ExclamationCircleIcon, color: 'text-yellow-500', message: 'Warning: Check your input.' },
    { icon: InformationCircleIcon, color: 'text-blue-500', message: 'Info: New update available.' }
  ]
  
  const type = types[Math.floor(Math.random() * types.length)]
  
  notifications.value.unshift({
    id: ++notificationId,
    ...type
  })
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(notificationId)
  }, 5000)
}

const removeNotification = (id: number) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

// Drag handlers
const startDrag = (e: MouseEvent) => {
  isDragging.value = true
  startX.value = e.clientX - dragX.value
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return
  dragX.value = e.clientX - startX.value
}

const endDrag = () => {
  isDragging.value = false
  // Animate back to center
  const interval = setInterval(() => {
    dragX.value = dragX.value * 0.9
    if (Math.abs(dragX.value) < 1) {
      dragX.value = 0
      clearInterval(interval)
    }
  }, 16)
}

const startProgress = () => {
  isProgressing.value = true
  uploadProgress.value = 0
  
  const interval = setInterval(() => {
    uploadProgress.value += 10
    if (uploadProgress.value >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        isProgressing.value = false
        uploadProgress.value = 0
        toastStore.success('Upload Complete', 'File uploaded successfully')
      }, 500)
    }
  }, 300)
}

// Progress animation
let progressInterval: number
onMounted(() => {
  progressInterval = setInterval(() => {
    progressAnimation.value = (progressAnimation.value + 10) % 110
  }, 500)
})

onUnmounted(() => {
  clearInterval(progressInterval)
})
</script>

<style scoped>
/* Stagger animation */
.stagger-enter-active {
  transition: all 0.3s ease-out;
}

.stagger-leave-active {
  transition: all 0.2s ease-in;
}

.stagger-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}

.stagger-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

/* Flip animation */
.flip-move {
  transition: transform 0.5s ease;
}

/* Notification animation */
.notification-enter-active {
  transition: all 0.3s ease-out;
}

.notification-leave-active {
  transition: all 0.3s ease-in;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.notification-move {
  transition: transform 0.3s ease;
}

/* 3D utilities */
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>