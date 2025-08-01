<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Header -->
    <div class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ title }}
            </h1>
            <p v-if="description" class="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {{ description }}
            </p>
            <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-gray-500 dark:text-gray-400">
              <div v-if="effectiveDate">
                <span class="font-medium">Effective:</span> {{ formatDate(effectiveDate) }}
              </div>
              <div v-if="lastUpdated">
                <span class="font-medium">Last updated:</span> {{ formatDate(lastUpdated) }}
              </div>
              <div v-if="version">
                <span class="font-medium">Version:</span> {{ version }}
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div v-if="$slots.actions" class="mt-4 md:mt-0 md:ml-4">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-4 lg:gap-8">
        <!-- Table of Contents -->
        <nav v-if="showToc && sections.length > 0" class="lg:col-span-1 mb-8 lg:mb-0">
          <div class="sticky top-8">
            <h2 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4">
              {{ tocTitle }}
            </h2>
            <ul class="space-y-2">
              <li v-for="section in sections" :key="section.id">
                <a
                  :href="`#${section.id}`"
                  :class="[
                    'block text-sm transition-colors duration-200',
                    activeSection === section.id
                      ? 'text-primary font-medium'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  ]"
                  @click="setActiveSection(section.id)"
                >
                  {{ section.title }}
                </a>
                
                <!-- Subsections -->
                <ul v-if="section.subsections && section.subsections.length > 0" class="mt-2 ml-4 space-y-1">
                  <li v-for="subsection in section.subsections" :key="subsection.id">
                    <a
                      :href="`#${subsection.id}`"
                      class="block text-xs text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                      @click="setActiveSection(subsection.id)"
                    >
                      {{ subsection.title }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Content -->
        <div :class="showToc && sections.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'">
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <!-- Introduction -->
            <div v-if="$slots.introduction" class="mb-8">
              <slot name="introduction" />
            </div>

            <!-- Sections -->
            <div v-for="section in sections" :key="section.id" class="mb-12">
              <h2 :id="section.id" class="scroll-mt-8">
                {{ section.title }}
              </h2>
              
              <div v-if="section.content" v-html="section.content" />
              
              <!-- Section slot -->
              <div v-if="$slots[`section-${section.id}`]">
                <slot :name="`section-${section.id}`" :section="section" />
              </div>

              <!-- Subsections -->
              <div v-if="section.subsections" class="mt-8">
                <div 
                  v-for="subsection in section.subsections"
                  :key="subsection.id"
                  class="mb-6"
                >
                  <h3 :id="subsection.id" class="scroll-mt-8">
                    {{ subsection.title }}
                  </h3>
                  
                  <div v-if="subsection.content" v-html="subsection.content" />
                  
                  <!-- Subsection slot -->
                  <div v-if="$slots[`subsection-${subsection.id}`]">
                    <slot :name="`subsection-${subsection.id}`" :subsection="subsection" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Custom content -->
            <div v-if="$slots.default">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer || showContactInfo" class="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <slot name="footer">
          <div v-if="showContactInfo" class="text-center">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Questions about this document?
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              If you have any questions about {{ title.toLowerCase() }}, please contact us.
            </p>
            <Button
              :href="contactUrl"
              variant="outline"
            >
              {{ contactButtonText }}
            </Button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Button from '@/components/Button.vue'

interface LegalSubsection {
  id: string
  title: string
  content?: string
}

interface LegalSection {
  id: string
  title: string
  content?: string
  subsections?: LegalSubsection[]
}

interface LegalPageProps {
  title: string
  description?: string
  effectiveDate?: string | Date
  lastUpdated?: string | Date
  version?: string
  sections: LegalSection[]
  showToc?: boolean
  tocTitle?: string
  showContactInfo?: boolean
  contactUrl?: string
  contactButtonText?: string
}

const props = withDefaults(defineProps<LegalPageProps>(), {
  showToc: true,
  tocTitle: 'Table of Contents',
  showContactInfo: true,
  contactUrl: '/contact',
  contactButtonText: 'Contact Us'
})

const activeSection = ref('')

const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const setActiveSection = (sectionId: string) => {
  activeSection.value = sectionId
}

const handleScroll = () => {
  const sections = props.sections.flatMap(section => [
    section,
    ...(section.subsections || [])
  ])
  
  for (const section of sections) {
    const element = document.getElementById(section.id)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        activeSection.value = section.id
        break
      }
    }
  }
}

onMounted(() => {
  if (props.showToc) {
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Set initial active section
  }
})

onUnmounted(() => {
  if (props.showToc) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.prose {
  @apply text-gray-700 dark:text-gray-300;
}

.prose h2 {
  @apply text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 first:mt-0;
}

.prose h3 {
  @apply text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3;
}

.prose p {
  @apply mb-4 leading-7;
}

.prose ul {
  @apply mb-4 space-y-2;
}

.prose li {
  @apply leading-7;
}

.prose strong {
  @apply font-semibold text-gray-900 dark:text-white;
}

.prose a {
  @apply text-primary hover:text-primary-dark underline;
}
</style>