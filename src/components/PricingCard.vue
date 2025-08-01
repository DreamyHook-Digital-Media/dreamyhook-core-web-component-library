<template>
  <div :class="cardClasses">
    <!-- Popular badge -->
    <div v-if="popular" class="absolute -top-3 left-1/2 transform -translate-x-1/2">
      <Badge variant="primary" size="sm">
        {{ popularLabel }}
      </Badge>
    </div>

    <!-- Header -->
    <div class="text-center">
      <!-- Plan name -->
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ name }}
      </h3>
      
      <!-- Description -->
      <p v-if="description" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>
      
      <!-- Price -->
      <div class="mt-6">
        <div class="flex items-baseline justify-center">
          <span v-if="currency" class="text-xl font-medium text-gray-500 dark:text-gray-400">
            {{ currency }}
          </span>
          <span class="text-4xl font-bold text-gray-900 dark:text-white">
            {{ displayPrice }}
          </span>
          <span v-if="period" class="ml-1 text-lg font-medium text-gray-500 dark:text-gray-400">
            /{{ period }}
          </span>
        </div>
        
        <!-- Billing toggle -->
        <div v-if="showBillingToggle" class="mt-4">
          <Toggle
            v-model="isYearly"
            :label="billingToggleLabel"
            @change="handleBillingChange"
          />
        </div>
        
        <!-- Original price (if discounted) -->
        <p v-if="originalPrice && originalPrice !== price" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="line-through">{{ currency }}{{ originalPrice }}</span>
          <span class="ml-2 text-green-600 dark:text-green-400 font-medium">
            Save {{ savingsPercentage }}%
          </span>
        </p>
      </div>
    </div>

    <!-- Features -->
    <div class="mt-8">
      <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-4">
        {{ featuresTitle }}
      </h4>
      <ul class="space-y-3">
        <li
          v-for="(feature, index) in features"
          :key="index"
          class="flex items-start"
        >
          <CheckIcon
            v-if="feature.included !== false"
            class="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5"
            aria-hidden="true"
          />
          <XMarkIcon
            v-else
            class="flex-shrink-0 h-5 w-5 text-gray-300 dark:text-gray-600 mt-0.5"
            aria-hidden="true"
          />
          <span
            :class="[
              'ml-3 text-sm',
              feature.included !== false
                ? 'text-gray-700 dark:text-gray-300'
                : 'text-gray-400 dark:text-gray-500'
            ]"
          >
            {{ feature.text || feature }}
          </span>
        </li>
      </ul>
    </div>

    <!-- Custom content -->
    <div v-if="$slots.default" class="mt-6">
      <slot />
    </div>

    <!-- CTA Button -->
    <div class="mt-8">
      <Button
        :variant="ctaVariant"
        :size="ctaSize"
        :disabled="ctaDisabled"
        :loading="ctaLoading"
        full-width
        @click="handleCtaClick"
      >
        {{ ctaText }}
      </Button>
      
      <!-- Secondary CTA -->
      <Button
        v-if="secondaryCtaText"
        variant="ghost"
        size="sm"
        full-width
        class="mt-2"
        @click="handleSecondaryCtaClick"
      >
        {{ secondaryCtaText }}
      </Button>
    </div>

    <!-- Footer note -->
    <p v-if="footerNote" class="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
      {{ footerNote }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import Badge from './Badge.vue'
import Button from './Button.vue'
import Toggle from './Toggle.vue'

interface PricingFeature {
  text: string
  included?: boolean
}

interface PricingCardProps {
  name: string
  description?: string
  price: number
  originalPrice?: number
  yearlyPrice?: number
  originalYearlyPrice?: number
  currency?: string
  period?: string
  features: (string | PricingFeature)[]
  featuresTitle?: string
  ctaText?: string
  secondaryCtaText?: string
  ctaVariant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  ctaSize?: 'sm' | 'md' | 'lg'
  ctaDisabled?: boolean
  ctaLoading?: boolean
  popular?: boolean
  popularLabel?: string
  footerNote?: string
  showBillingToggle?: boolean
  billingToggleLabel?: string
  variant?: 'default' | 'highlighted'
}

const props = withDefaults(defineProps<PricingCardProps>(), {
  currency: '$',
  period: 'mo',
  featuresTitle: 'Features included',
  ctaText: 'Get started',
  ctaVariant: 'primary',
  ctaSize: 'md',
  ctaDisabled: false,
  ctaLoading: false,
  popular: false,
  popularLabel: 'Most Popular',
  showBillingToggle: false,
  billingToggleLabel: 'Bill yearly (save 20%)',
  variant: 'default'
})

const emit = defineEmits<{
  'cta-click': []
  'secondary-cta-click': []
  'billing-change': [isYearly: boolean]
}>()

const isYearly = ref(false)

const cardClasses = computed(() => {
  const base = 'relative rounded-lg border p-8 shadow-sm flex flex-col'
  
  const variants = {
    default: 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800',
    highlighted: 'border-primary bg-white ring-1 ring-primary dark:border-primary dark:bg-gray-800'
  }
  
  const popularHighlight = props.popular ? 'ring-2 ring-primary' : ''
  
  return `${base} ${variants[props.variant]} ${popularHighlight}`
})

const displayPrice = computed(() => {
  if (isYearly.value && props.yearlyPrice !== undefined) {
    return props.yearlyPrice
  }
  return props.price
})

const currentOriginalPrice = computed(() => {
  if (isYearly.value && props.originalYearlyPrice !== undefined) {
    return props.originalYearlyPrice
  }
  return props.originalPrice
})

const savingsPercentage = computed(() => {
  const original = currentOriginalPrice.value
  const current = displayPrice.value
  
  if (!original || original <= current) return 0
  
  return Math.round(((original - current) / original) * 100)
})

const ctaVariant = computed(() => {
  if (props.popular && props.variant === 'default') {
    return 'primary'
  }
  return props.ctaVariant
})

const handleCtaClick = () => {
  emit('cta-click')
}

const handleSecondaryCtaClick = () => {
  emit('secondary-cta-click')
}

const handleBillingChange = (yearly: boolean) => {
  isYearly.value = yearly
  emit('billing-change', yearly)
}
</script>