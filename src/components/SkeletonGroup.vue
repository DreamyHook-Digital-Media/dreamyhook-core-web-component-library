<template>
  <div :class="containerClasses">
    <!-- Avatar + text skeleton -->
    <template v-if="variant === 'avatar-text'">
      <div class="flex items-center space-x-4">
        <Skeleton variant="circular" :width="avatarSize" :height="avatarSize" />
        <div class="flex-1 space-y-2">
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </div>
      </div>
    </template>

    <!-- Card skeleton -->
    <template v-else-if="variant === 'card'">
      <div class="space-y-4">
        <Skeleton variant="rectangular" :height="imageHeight" />
        <div class="space-y-2">
          <Skeleton width="75%" />
          <Skeleton width="90%" />
          <Skeleton width="60%" />
        </div>
      </div>
    </template>

    <!-- Article skeleton -->
    <template v-else-if="variant === 'article'">
      <div class="space-y-4">
        <Skeleton variant="rectangular" height="200px" />
        <div class="space-y-3">
          <Skeleton width="80%" height="24px" />
          <div class="space-y-2">
            <Skeleton width="100%" />
            <Skeleton width="95%" />
            <Skeleton width="85%" />
            <Skeleton width="70%" />
          </div>
        </div>
      </div>
    </template>

    <!-- List skeleton -->
    <template v-else-if="variant === 'list'">
      <div class="space-y-3">
        <div
          v-for="i in lines"
          :key="i"
          class="flex items-center space-x-3"
        >
          <Skeleton variant="circular" width="32px" height="32px" />
          <div class="flex-1 space-y-1">
            <Skeleton :width="getRandomWidth()" />
            <Skeleton :width="getRandomWidth()" />
          </div>
        </div>
      </div>
    </template>

    <!-- Table skeleton -->
    <template v-else-if="variant === 'table'">
      <div class="space-y-2">
        <!-- Header -->
        <div class="grid grid-cols-4 gap-4">
          <Skeleton v-for="i in 4" :key="`header-${i}`" height="32px" />
        </div>
        <!-- Rows -->
        <div
          v-for="i in lines"
          :key="`row-${i}`"
          class="grid grid-cols-4 gap-4"
        >
          <Skeleton v-for="j in 4" :key="`cell-${i}-${j}`" />
        </div>
      </div>
    </template>

    <!-- Text lines skeleton -->
    <template v-else>
      <div :class="textContainerClasses">
        <Skeleton
          v-for="(width, index) in lineWidths"
          :key="index"
          :width="width"
          class="mb-2 last:mb-0"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Skeleton from './Skeleton.vue'

interface SkeletonGroupProps {
  variant?: 'text' | 'avatar-text' | 'card' | 'article' | 'list' | 'table'
  lines?: number
  avatarSize?: string | number
  imageHeight?: string | number
  animation?: 'pulse' | 'wave' | 'none'
  spacing?: 'tight' | 'normal' | 'loose'
}

const props = withDefaults(defineProps<SkeletonGroupProps>(), {
  variant: 'text',
  lines: 3,
  avatarSize: 40,
  imageHeight: 160,
  animation: 'pulse',
  spacing: 'normal'
})

const containerClasses = computed(() => {
  const spacings = {
    tight: 'space-y-1',
    normal: 'space-y-2',
    loose: 'space-y-4'
  }
  
  return spacings[props.spacing]
})

const textContainerClasses = computed(() => {
  return 'space-y-2'
})

const lineWidths = computed(() => {
  const widths = []
  
  for (let i = 0; i < props.lines; i++) {
    if (i === props.lines - 1) {
      // Last line is typically shorter
      widths.push(`${60 + Math.random() * 20}%`)
    } else {
      // Other lines are more varied
      widths.push(`${80 + Math.random() * 20}%`)
    }
  }
  
  return widths
})

const getRandomWidth = () => {
  const widths = ['50%', '60%', '70%', '80%', '90%']
  return widths[Math.floor(Math.random() * widths.length)]
}
</script>