<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Navigation -->
    <Navbar
      :items="navItems"
      :logo="logo"
      :logo-text="logoText"
      :logo-href="logoHref"
      :sticky="stickyNav"
      :transparent="transparentNav"
      :show-search="showSearch"
      :search-placeholder="searchPlaceholder"
      @search="handleSearch"
    >
      <template #actions>
        <slot name="nav-actions">
          <div class="flex items-center space-x-4">
            <!-- Auth buttons -->
            <Button
              variant="ghost"
              size="sm"
              href="/login"
            >
              Sign in
            </Button>
            <Button
              variant="primary"
              size="sm"
              href="/register"
            >
              Sign up
            </Button>
            <ThemeToggle />
          </div>
        </slot>
      </template>

      <template #mobile-actions>
        <slot name="mobile-nav-actions">
          <div class="space-y-2">
            <Button
              variant="outline"
              size="sm"
              full-width
              href="/login"
            >
              Sign in
            </Button>
            <Button
              variant="primary"
              size="sm"
              full-width
              href="/register"
            >
              Sign up
            </Button>
          </div>
        </slot>
      </template>
    </Navbar>

    <!-- Main content -->
    <main>
      <!-- Hero section -->
      <div v-if="$slots.hero" class="relative">
        <slot name="hero" />
      </div>

      <!-- Breadcrumbs -->
      <div v-if="breadcrumbs && breadcrumbs.length > 0" class="bg-gray-50 dark:bg-gray-800">
        <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumbs :items="breadcrumbs" />
        </div>
      </div>

      <!-- Page content -->
      <div :class="contentClasses">
        <!-- Page header -->
        <div v-if="$slots.header" class="mb-8">
          <slot name="header" />
        </div>

        <!-- Main content -->
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <Footer
      :sections="footerSections"
      :social-links="socialLinks"
      :copyright="copyright"
      :show-logo="showFooterLogo"
      :logo-text="logoText"
    >
      <template v-if="$slots.footerLogo" #logo>
        <slot name="footer-logo" />
      </template>

      <template v-if="$slots.footerDescription" #description>
        <slot name="footer-description" />
      </template>

      <template v-if="$slots.newsletter" #newsletter>
        <slot name="newsletter" />
      </template>

      <template v-if="$slots.footerBottom" #bottom>
        <slot name="footer-bottom" />
      </template>

      <template v-if="$slots.footerCopyright" #copyright>
        <slot name="footer-copyright" />
      </template>
    </Footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Breadcrumbs,
  Button,
  Footer,
  Navbar,
  ThemeToggle
} from '@/components'
import type { 
  NavItem, 
  BreadcrumbItem, 
  FooterSection, 
  FooterLink 
} from '@/types/navigation.types'

interface PublicLayoutProps {
  // Navigation
  navItems?: NavItem[]
  logo?: string
  logoText?: string
  logoHref?: string
  stickyNav?: boolean
  transparentNav?: boolean
  showSearch?: boolean
  searchPlaceholder?: string
  
  // Content
  breadcrumbs?: BreadcrumbItem[]
  containerized?: boolean
  
  // Footer
  footerSections?: FooterSection[]
  socialLinks?: FooterLink[]
  copyright?: string
  showFooterLogo?: boolean
}

const props = withDefaults(defineProps<PublicLayoutProps>(), {
  navItems: () => [],
  logoHref: '/',
  stickyNav: true,
  transparentNav: false,
  showSearch: false,
  searchPlaceholder: 'Search...',
  containerized: true,
  footerSections: () => [],
  socialLinks: () => [],
  showFooterLogo: true
})

const emit = defineEmits<{
  'search': [query: string]
}>()

const contentClasses = computed(() => {
  const base = 'flex-1'
  const container = props.containerized 
    ? 'mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'
    : 'py-6'
  
  return `${base} ${container}`
})

const handleSearch = (query: string) => {
  emit('search', query)
}
</script>