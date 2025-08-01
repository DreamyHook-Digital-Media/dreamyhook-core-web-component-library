<template>
  <div class="space-y-8">
    <!-- Basic Form -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Basic Form</h3>
      <form class="max-w-md space-y-4" @submit.prevent="handleSubmit">
        <FormField
          label="Email"
          required
          hint="We'll never share your email with anyone else."
        >
          <TextInput
            v-model="formData.email"
            type="email"
            placeholder="john@example.com"
            :left-icon="EnvelopeIcon"
          />
        </FormField>

        <FormField
          label="Password"
          required
          :error="errors.password"
        >
          <TextInput
            v-model="formData.password"
            type="password"
            placeholder="Enter your password"
            :left-icon="LockClosedIcon"
            :error="!!errors.password"
          />
        </FormField>

        <Button type="submit" variant="primary" full-width>
          Sign In
        </Button>
      </form>
    </section>

    <!-- Input Sizes -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Input Sizes</h3>
      <div class="max-w-md space-y-4">
        <TextInput size="sm" placeholder="Small input" />
        <TextInput size="md" placeholder="Medium input (default)" />
        <TextInput size="lg" placeholder="Large input" />
      </div>
    </section>

    <!-- Input with Icons -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Input with Icons</h3>
      <div class="max-w-md space-y-4">
        <TextInput placeholder="Search..." :left-icon="MagnifyingGlassIcon" />
        <TextInput placeholder="Enter amount" :left-icon="CurrencyDollarIcon" :right-icon="CalculatorIcon" />
        <TextInput placeholder="Phone number" :left-icon="PhoneIcon" type="tel" />
      </div>
    </section>

    <!-- Input States -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Input States</h3>
      <div class="max-w-md space-y-4">
        <FormField label="Normal Input">
          <TextInput placeholder="Normal state" />
        </FormField>

        <FormField label="Disabled Input">
          <TextInput placeholder="Disabled state" disabled />
        </FormField>

        <FormField label="Readonly Input">
          <TextInput value="Readonly value" readonly />
        </FormField>

        <FormField label="Error Input" error="This field is required">
          <TextInput placeholder="Error state" error />
        </FormField>
      </div>
    </section>

    <!-- Labels -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Labels</h3>
      <div class="space-y-2">
        <Label>Normal Label</Label>
        <Label required>Required Label</Label>
        <Label disabled>Disabled Label</Label>
      </div>
    </section>

    <!-- Dividers -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Dividers</h3>
      <div class="space-y-4">
        <Divider />
        <Divider>OR</Divider>
        <Divider variant="dashed">Dashed</Divider>
        <div class="flex items-center gap-4">
          <span>Start</span>
          <Divider orientation="vertical" />
          <span>Middle</span>
          <Divider orientation="vertical" />
          <span>End</span>
        </div>
      </div>
    </section>

    <!-- Avatars -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Avatars</h3>
      <div class="flex flex-wrap items-center gap-4">
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" alt="User" />
        <Avatar initials="JD" />
        <Avatar />
        <Avatar shape="square" initials="JD" />
      </div>
      
      <h4 class="mb-2 mt-4 text-base font-medium text-gray-900 dark:text-white">Sizes</h4>
      <div class="flex flex-wrap items-center gap-4">
        <Avatar size="xs" initials="XS" />
        <Avatar size="sm" initials="SM" />
        <Avatar size="md" initials="MD" />
        <Avatar size="lg" initials="LG" />
        <Avatar size="xl" initials="XL" />
      </div>

      <h4 class="mb-2 mt-4 text-base font-medium text-gray-900 dark:text-white">With Status</h4>
      <div class="flex flex-wrap items-center gap-4">
        <Avatar initials="ON" status="online" />
        <Avatar initials="AW" status="away" />
        <Avatar initials="BU" status="busy" />
        <Avatar initials="OF" status="offline" />
      </div>
    </section>

    <!-- Badges -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Badges</h3>
      
      <h4 class="mb-2 text-base font-medium text-gray-900 dark:text-white">Variants</h4>
      <div class="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>

      <h4 class="mb-2 mt-4 text-base font-medium text-gray-900 dark:text-white">Sizes</h4>
      <div class="flex flex-wrap items-center gap-2">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>

      <h4 class="mb-2 mt-4 text-base font-medium text-gray-900 dark:text-white">With Dot</h4>
      <div class="flex flex-wrap gap-2">
        <Badge dot>Active</Badge>
        <Badge variant="success" dot>Online</Badge>
        <Badge variant="error" dot>Live</Badge>
      </div>

      <h4 class="mb-2 mt-4 text-base font-medium text-gray-900 dark:text-white">Rounded</h4>
      <div class="flex flex-wrap gap-2">
        <Badge rounded>99+</Badge>
        <Badge variant="primary" rounded>New</Badge>
        <Badge variant="secondary" rounded size="lg">v2.0</Badge>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  Avatar,
  Badge,
  Button,
  Divider,
  FormField,
  Label,
  TextInput
} from '@/components'
import {
  CalculatorIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PhoneIcon
} from '@heroicons/vue/24/outline'

const formData = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  password: ''
})

const handleSubmit = () => {
  errors.password = ''
  if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    return
  }
  console.log('Form submitted:', formData)
}
</script>