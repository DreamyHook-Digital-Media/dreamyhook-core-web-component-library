<template>
  <article :class="cardClasses" @click="handleClick">
    <!-- Featured image -->
    <div v-if="featuredImage || $slots.image" :class="imageContainerClasses">
      <slot name="image">
        <img
          v-if="featuredImage"
          :src="featuredImage"
          :alt="title"
          :class="imageClasses"
          @error="handleImageError"
        />
      </slot>
      
      <!-- Category badge overlay -->
      <div v-if="category" class="absolute top-3 left-3">
        <Badge :variant="categoryVariant" size="sm">
          {{ category }}
        </Badge>
      </div>
    </div>

    <!-- Content -->
    <div :class="contentClasses">
      <!-- Tags -->
      <div v-if="tags && tags.length > 0" class="flex flex-wrap gap-2 mb-3">
        <Badge
          v-for="tag in tags.slice(0, maxTags)"
          :key="tag"
          variant="secondary"
          size="sm"
        >
          {{ tag }}
        </Badge>
        <Badge
          v-if="tags.length > maxTags"
          variant="secondary"
          size="sm"
        >
          +{{ tags.length - maxTags }}
        </Badge>
      </div>

      <!-- Title -->
      <h3 :class="titleClasses">
        <component
          :is="titleTag"
          :href="href"
          :to="to"
          @click="handleTitleClick"
        >
          {{ title }}
        </component>
      </h3>

      <!-- Excerpt -->
      <p v-if="excerpt" :class="excerptClasses">
        {{ truncatedExcerpt }}
      </p>

      <!-- Author and meta info -->
      <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <!-- Author avatar -->
          <Avatar
            v-if="author"
            :src="author.avatar"
            :initials="author.initials || getInitials(author.name)"
            size="sm"
          />
          
          <div class="flex-1 min-w-0">
            <!-- Author name -->
            <p v-if="author" class="text-sm font-medium text-gray-900 dark:text-white truncate">
              {{ author.name }}
            </p>
            
            <!-- Meta information -->
            <div class="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
              <time v-if="publishedAt" :datetime="publishedAt">
                {{ formatDate(publishedAt) }}
              </time>
              
              <span v-if="publishedAt && readTime">•</span>
              
              <span v-if="readTime">
                {{ readTime }} min read
              </span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div v-if="$slots.actions" class="flex-shrink-0">
          <slot name="actions" />
        </div>
      </div>

      <!-- Custom footer content -->
      <div v-if="$slots.footer" class="mt-4">
        <slot name="footer" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Avatar from './Avatar.vue'
import Badge from './Badge.vue'

interface Author {
  name: string
  avatar?: string
  initials?: string
  bio?: string
}

interface BlogPostCardProps {
  title: string
  excerpt?: string
  featuredImage?: string
  author?: Author
  publishedAt?: string | Date
  readTime?: number
  category?: string
  categoryVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  tags?: string[]
  maxTags?: number
  href?: string
  to?: string
  variant?: 'default' | 'horizontal' | 'minimal'
  excerptLength?: number
  clickable?: boolean
}

const props = withDefaults(defineProps<BlogPostCardProps>(), {
  categoryVariant: 'primary',
  maxTags: 3,
  variant: 'default',
  excerptLength: 150,
  clickable: true
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  titleClick: [event: MouseEvent]
  imageError: [event: Event]
}>()

const cardClasses = computed(() => {
  const base = 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200'
  
  const variants = {
    default: 'flex flex-col',
    horizontal: 'flex flex-col sm:flex-row',
    minimal: 'flex flex-col border-0 shadow-none'
  }
  
  const interactive = props.clickable ? 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer' : ''
  
  return `${base} ${variants[props.variant]} ${interactive}`
})

const imageContainerClasses = computed(() => {
  const base = 'relative overflow-hidden'
  
  const variants = {
    default: 'aspect-w-16 aspect-h-9',
    horizontal: 'sm:w-1/3 sm:flex-shrink-0 aspect-w-16 aspect-h-9 sm:aspect-none',
    minimal: 'aspect-w-16 aspect-h-9'
  }
  
  return `${base} ${variants[props.variant]}`
})

const imageClasses = computed(() => {
  const base = 'w-full object-cover transition-transform duration-200'
  const hover = props.clickable ? 'hover:scale-105' : ''
  const height = props.variant === 'horizontal' ? 'sm:h-full' : 'h-48'
  
  return `${base} ${hover} ${height}`
})

const contentClasses = computed(() => {
  const base = 'p-6 flex-1'
  return base
})

const titleClasses = computed(() => {
  const base = 'text-xl font-semibold text-gray-900 dark:text-white mb-2'
  const hover = props.clickable ? 'hover:text-primary' : ''
  
  return `${base} ${hover}`
})

const excerptClasses = computed(() => {
  return 'text-gray-600 dark:text-gray-400 leading-relaxed'
})

const titleTag = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'span'
})

const truncatedExcerpt = computed(() => {
  if (!props.excerpt) return ''
  
  if (props.excerpt.length <= props.excerptLength) {
    return props.excerpt
  }
  
  return props.excerpt.slice(0, props.excerptLength) + '...'
})

const formatDate = (date: string | Date) => {
  const d = new Date(date)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - d.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`
  } else {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}

const handleTitleClick = (event: MouseEvent) => {
  emit('titleClick', event)
}

const handleImageError = (event: Event) => {
  emit('imageError', event)
}
</script>