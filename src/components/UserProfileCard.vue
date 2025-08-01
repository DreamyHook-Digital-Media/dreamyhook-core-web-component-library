<template>
  <div :class="cardClasses">
    <!-- Header/Cover -->
    <div v-if="coverImage || showCover" :class="coverClasses">
      <img
        v-if="coverImage"
        :src="coverImage"
        :alt="`${user.name}'s cover`"
        class="w-full h-full object-cover"
        @error="handleCoverError"
      />
      <div v-else class="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-600" />
    </div>

    <!-- Profile Content -->
    <div :class="contentClasses">
      <!-- Avatar and basic info -->
      <div class="flex items-start justify-between">
        <div class="flex items-center space-x-4">
          <!-- Avatar -->
          <div :class="avatarWrapperClasses">
            <Avatar
              :src="user.avatar"
              :initials="user.initials || getInitials(user.name)"
              :size="avatarSize"
              :status="user.status"
            />
            
            <!-- Online indicator -->
            <div
              v-if="showOnlineStatus && user.isOnline"
              class="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full dark:border-gray-800"
            />
          </div>

          <!-- Basic info -->
          <div class="flex-1 min-w-0">
            <h3 :class="nameClasses">
              {{ user.name }}
            </h3>
            
            <p v-if="user.role || user.title" :class="roleClasses">
              {{ user.role || user.title }}
            </p>
            
            <p v-if="user.location" :class="locationClasses">
              <MapPinIcon class="h-4 w-4 inline mr-1" />
              {{ user.location }}
            </p>
          </div>
        </div>

        <!-- Actions dropdown or buttons -->
        <div v-if="$slots.actions" class="flex-shrink-0">
          <slot name="actions" :user="user" />
        </div>
      </div>

      <!-- Bio -->
      <div v-if="user.bio" class="mt-4">
        <p :class="bioClasses">
          {{ truncatedBio }}
          <button
            v-if="user.bio.length > bioLimit && !showFullBio"
            class="text-primary hover:text-primary-dark text-sm font-medium ml-1"
            @click="toggleBio"
          >
            Show more
          </button>
          <button
            v-else-if="showFullBio"
            class="text-primary hover:text-primary-dark text-sm font-medium ml-1"
            @click="toggleBio"
          >
            Show less
          </button>
        </p>
      </div>

      <!-- Stats -->
      <div v-if="stats && stats.length > 0" class="mt-6">
        <div :class="statsContainerClasses">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center"
          >
            <div class="text-xl font-bold text-gray-900 dark:text-white">
              {{ formatStatValue(stat.value) }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- Social links -->
      <div v-if="socialLinks && socialLinks.length > 0" class="mt-6">
        <div class="flex justify-center space-x-4">
          <a
            v-for="link in socialLinks"
            :key="link.platform"
            :href="link.url"
            :title="link.platform"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <component
              v-if="link.icon"
              :is="link.icon"
              class="h-5 w-5"
            />
            <span v-else class="text-sm">{{ link.platform }}</span>
          </a>
        </div>
      </div>

      <!-- Skills/Tags -->
      <div v-if="skills && skills.length > 0" class="mt-6">
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="skill in skills.slice(0, maxSkills)"
            :key="skill"
            variant="secondary"
            size="sm"
          >
            {{ skill }}
          </Badge>
          <Badge
            v-if="skills.length > maxSkills"
            variant="secondary"
            size="sm"
            class="cursor-pointer"
            @click="toggleSkills"
          >
            +{{ skills.length - maxSkills }}
          </Badge>
        </div>
      </div>

      <!-- Custom content -->
      <div v-if="$slots.default" class="mt-6">
        <slot :user="user" />
      </div>

      <!-- Action buttons -->
      <div v-if="showActionButtons" class="mt-6 flex space-x-3">
        <Button
          variant="primary"
          size="sm"
          full-width
          @click="handlePrimaryAction"
        >
          {{ primaryActionText }}
        </Button>
        
        <Button
          v-if="secondaryActionText"
          variant="outline"
          size="sm"
          full-width
          @click="handleSecondaryAction"
        >
          {{ secondaryActionText }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { MapPinIcon } from '@heroicons/vue/24/outline'
import Avatar from './Avatar.vue'
import Badge from './Badge.vue'
import Button from './Button.vue'

interface SocialLink {
  platform: string
  url: string
  icon?: any
}

interface UserStat {
  label: string
  value: number | string
}

interface User {
  name: string
  role?: string
  title?: string
  bio?: string
  avatar?: string
  initials?: string
  location?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
  isOnline?: boolean
}

interface UserProfileCardProps {
  user: User
  coverImage?: string
  showCover?: boolean
  socialLinks?: SocialLink[]
  stats?: UserStat[]
  skills?: string[]
  maxSkills?: number
  bioLimit?: number
  variant?: 'default' | 'compact' | 'detailed'
  showOnlineStatus?: boolean
  showActionButtons?: boolean
  primaryActionText?: string
  secondaryActionText?: string
}

const props = withDefaults(defineProps<UserProfileCardProps>(), {
  showCover: true,
  maxSkills: 5,
  bioLimit: 120,
  variant: 'default',
  showOnlineStatus: true,
  showActionButtons: true,
  primaryActionText: 'Follow',
  secondaryActionText: 'Message'
})

const emit = defineEmits<{
  'primary-action': [user: User]
  'secondary-action': [user: User]
  'cover-error': [event: Event]
}>()

const showFullBio = ref(false)
const showAllSkills = ref(false)

const cardClasses = computed(() => {
  const base = 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'
  
  const variants = {
    default: '',
    compact: 'max-w-sm',
    detailed: 'max-w-md'
  }
  
  return `${base} ${variants[props.variant]}`
})

const coverClasses = computed(() => {
  const heights = {
    default: 'h-32',
    compact: 'h-24',
    detailed: 'h-40'
  }
  
  return `relative ${heights[props.variant]} bg-gray-200 dark:bg-gray-700`
})

const contentClasses = computed(() => {
  const padding = {
    default: 'p-6',
    compact: 'p-4',
    detailed: 'p-6'
  }
  
  const marginTop = (props.coverImage || props.showCover) ? '-mt-8' : ''
  
  return `relative ${padding[props.variant]} ${marginTop}`
})

const avatarWrapperClasses = computed(() => {
  return 'relative'
})

const avatarSize = computed(() => {
  const sizes = {
    default: 'lg',
    compact: 'md',
    detailed: 'xl'
  }
  
  return sizes[props.variant] as 'sm' | 'md' | 'lg' | 'xl'
})

const nameClasses = computed(() => {
  const sizes = {
    default: 'text-xl',
    compact: 'text-lg',
    detailed: 'text-2xl'
  }
  
  return `${sizes[props.variant]} font-bold text-gray-900 dark:text-white`
})

const roleClasses = computed(() => {
  return 'text-sm text-gray-600 dark:text-gray-400 mt-1'
})

const locationClasses = computed(() => {
  return 'text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center'
})

const bioClasses = computed(() => {
  return 'text-sm text-gray-700 dark:text-gray-300 leading-relaxed'
})

const statsContainerClasses = computed(() => {
  const base = 'grid gap-4 border-t border-b border-gray-200 dark:border-gray-700 py-4'
  const cols = Math.min(props.stats?.length || 0, 4)
  
  return `${base} grid-cols-${cols}`
})

const truncatedBio = computed(() => {
  if (!props.user.bio) return ''
  
  if (showFullBio.value || props.user.bio.length <= props.bioLimit) {
    return props.user.bio
  }
  
  return props.user.bio.slice(0, props.bioLimit) + '...'
})

const displayedSkills = computed(() => {
  if (!props.skills) return []
  
  return showAllSkills.value 
    ? props.skills 
    : props.skills.slice(0, props.maxSkills)
})

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatStatValue = (value: number | string) => {
  if (typeof value === 'string') return value
  
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M'
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K'
  }
  
  return value.toString()
}

const toggleBio = () => {
  showFullBio.value = !showFullBio.value
}

const toggleSkills = () => {
  showAllSkills.value = !showAllSkills.value
}

const handlePrimaryAction = () => {
  emit('primary-action', props.user)
}

const handleSecondaryAction = () => {
  emit('secondary-action', props.user)
}

const handleCoverError = (event: Event) => {
  emit('cover-error', event)
}
</script>