<template>
  <div class="space-y-8">
    <!-- Variants -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Button Variants</h3>
      <div class="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </section>

    <!-- Sizes -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Button Sizes</h3>
      <div class="flex flex-wrap items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
    </section>

    <!-- With Icons -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">With Icons</h3>
      <div class="flex flex-wrap gap-4">
        <Button :left-icon="DownloadIcon">Download</Button>
        <Button :right-icon="ArrowRightIcon">Continue</Button>
        <Button :left-icon="PlusIcon" :right-icon="ChevronDownIcon">Options</Button>
      </div>
    </section>

    <!-- States -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Button States</h3>
      <div class="flex flex-wrap gap-4">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
    </section>

    <!-- Full Width -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Full Width</h3>
      <div class="max-w-sm">
        <Button full-width variant="primary" :left-icon="LockClosedIcon">
          Sign In
        </Button>
      </div>
    </section>

    <!-- As Link -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Button as Link</h3>
      <div class="flex flex-wrap gap-4">
        <Button href="https://github.com" variant="outline" :right-icon="ArrowTopRightOnSquareIcon">
          Open GitHub
        </Button>
      </div>
    </section>

    <!-- Combinations -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Combinations</h3>
      <div class="flex flex-wrap gap-4">
        <Button size="sm" variant="secondary" :left-icon="HeartIcon">Like</Button>
        <Button size="lg" variant="primary" loading>Processing...</Button>
        <Button variant="outline" disabled :right-icon="ChevronRightIcon">Next</Button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components'
import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DownloadIcon,
  HeartIcon,
  LockClosedIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'
</script>