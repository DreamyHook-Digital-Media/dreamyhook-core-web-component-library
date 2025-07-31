# DreamyHook Core Web Component Library - Design Guide

## 🎨 Design System Overview

This design guide establishes the visual language and patterns for the DreamyHook Core Web Component Library. All components follow these guidelines to ensure consistency and maintainability.

---

## 📘 Typography

### Font Stack
- **Primary Font:** Inter (with system fallbacks)
- **Monospace:** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

### Type Scale
| Element | Class | Size | Weight | Line Height |
|---------|-------|------|--------|-------------|
| Display | `text-5xl` | 48px | Bold (700) | 1.2 |
| H1 | `text-4xl` | 36px | Bold (700) | 1.25 |
| H2 | `text-3xl` | 30px | Semibold (600) | 1.33 |
| H3 | `text-2xl` | 24px | Semibold (600) | 1.5 |
| H4 | `text-xl` | 20px | Medium (500) | 1.5 |
| H5 | `text-lg` | 18px | Medium (500) | 1.55 |
| Body | `text-base` | 16px | Normal (400) | 1.5 |
| Small | `text-sm` | 14px | Normal (400) | 1.42 |
| Caption | `text-xs` | 12px | Normal (400) | 1.5 |

### Letter Spacing
- **Headings:** `tracking-tight` (-0.025em)
- **Body:** `tracking-normal` (0)
- **Buttons:** `tracking-wide` (0.025em)

---

## 🎨 Color Palette

### Brand Colors
```css
primary: #6366f1      /* Indigo 500 */
secondary: #f59e0b    /* Amber 500 */
accent: #10b981       /* Emerald 500 */
```

### Neutral Colors
```css
neutral-50: #f9fafb
neutral-100: #f3f4f6
neutral-200: #e5e7eb
neutral-300: #d1d5db
neutral-400: #9ca3af
neutral-500: #6b7280
neutral-600: #4b5563
neutral-700: #374151
neutral-800: #1f2937
neutral-900: #111827
```

### Semantic Colors
```css
success: #10b981      /* Emerald 500 */
warning: #f59e0b      /* Amber 500 */
error: #ef4444        /* Red 500 */
info: #3b82f6         /* Blue 500 */
```

### Dark Mode
All colors have dark mode variants using Tailwind's `dark:` prefix. Background and text colors automatically invert.

---

## 📐 Spacing & Layout

### Spacing Scale
Based on 4px unit (Tailwind default):
- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-6`: 24px
- `space-8`: 32px
- `space-12`: 48px
- `space-16`: 64px

### Container
```css
max-width: 1280px (max-w-7xl)
padding: 0 16px (px-4)
margin: 0 auto (mx-auto)
```

### Grid System
- 12-column grid using Tailwind's grid utilities
- Gap: `gap-4` (16px) default
- Responsive breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

---

## 🔲 Borders & Radius

### Border Radius
| Element | Class | Value |
|---------|-------|-------|
| Small | `rounded` | 4px |
| Default | `rounded-md` | 6px |
| Large | `rounded-lg` | 8px |
| Extra Large | `rounded-xl` | 12px |
| Full | `rounded-full` | 9999px |

### Border Width
- Default: `border` (1px)
- Thick: `border-2` (2px)

### Border Colors
- Light mode: `border-gray-200`
- Dark mode: `dark:border-gray-700`

---

## 🌑 Shadows

### Shadow Scale
| Level | Class | Use Case |
|-------|-------|----------|
| Extra Small | `shadow-xs` | Subtle elevation |
| Small | `shadow-sm` | Default buttons |
| Base | `shadow` | Default cards |
| Medium | `shadow-md` | Hover states |
| Large | `shadow-lg` | Modals, dropdowns |
| Extra Large | `shadow-xl` | Floating elements |
| 2XL | `shadow-2xl` | High elevation |

---

## 🎯 Component States

### Interactive States
1. **Default**: Base appearance
2. **Hover**: `hover:` modifiers
3. **Focus**: `focus:` with focus ring
4. **Active**: `active:` pressed state
5. **Disabled**: `disabled:` with reduced opacity

### Focus Styles
```css
focus:outline-none 
focus:ring-2 
focus:ring-primary 
focus:ring-offset-2
```

---

## ♿ Accessibility Guidelines

### Core Principles
1. **Semantic HTML**: Use proper HTML elements
2. **ARIA Labels**: Add where necessary
3. **Keyboard Navigation**: Full keyboard support
4. **Focus Management**: Clear focus indicators
5. **Color Contrast**: WCAG AA compliance minimum

### Required Attributes
- `role` for custom components
- `aria-label` for icon-only buttons
- `aria-describedby` for form errors
- `aria-expanded` for collapsible content

---

## 🔄 Animation & Transitions

### Duration
- Fast: `duration-150`
- Normal: `duration-200`
- Slow: `duration-300`

### Timing Functions
- Default: `ease-in-out`
- Enter: `ease-out`
- Leave: `ease-in`

### Common Transitions
```css
transition-all
transition-colors
transition-opacity
transition-transform
```

---

## 📱 Responsive Design

### Mobile-First Approach
Start with mobile styles, add breakpoint modifiers:
```css
text-sm md:text-base lg:text-lg
```

### Breakpoint Usage
- **sm**: Minor layout adjustments
- **md**: Tablet layouts
- **lg**: Desktop layouts
- **xl**: Wide screens
- **2xl**: Extra wide screens

---

## 🧩 Component Patterns

### Naming Convention
- PascalCase for component files: `ButtonComponent.vue`
- kebab-case for component usage: `<button-component />`
- BEM-style classes when needed: `component__element--modifier`

### Prop Naming
- Boolean props: `is-`, `has-`, `show-`
- Event handlers: `on-`
- Sizes: `size="sm|md|lg|xl"`
- Variants: `variant="primary|secondary|outline"`

### Slot Usage
- Default slot for primary content
- Named slots for specific areas: `header`, `footer`, `icon`
- Scoped slots for data passing

---

## 🎭 Icon Guidelines

### Icon Library
Using Heroicons v2 (24x24 default):
- Outline icons for default states
- Solid icons for active/selected states

### Icon Sizes
- xs: `w-3 h-3` (12px)
- sm: `w-4 h-4` (16px)
- md: `w-5 h-5` (20px)
- lg: `w-6 h-6` (24px)
- xl: `w-8 h-8` (32px)

---

## 📋 Form Design

### Input Heights
- sm: 32px
- md: 40px (default)
- lg: 48px

### Form Layout
- Label above input
- Helper text below input
- Error messages replace helper text
- Required indicator: red asterisk

### Validation States
- Default: gray border
- Focus: primary border
- Error: red border + message
- Success: green border + icon

---

## 🎯 Best Practices

1. **Consistency**: Follow established patterns
2. **Performance**: Use Tailwind's purge for production
3. **Accessibility**: Test with keyboard and screen readers
4. **Documentation**: Comment complex implementations
5. **Testing**: Include visual regression tests

---

## 🚀 Usage Example

```vue
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-4 py-8">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Welcome to DreamyHook
      </h1>
      <p class="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
        Build beautiful, accessible web applications with our component library.
      </p>
      <button class="mt-6 rounded-lg bg-primary px-6 py-3 text-sm font-medium 
                     tracking-wide text-white shadow-sm transition-colors 
                     hover:bg-primary-600 focus:outline-none focus:ring-2 
                     focus:ring-primary focus:ring-offset-2">
        Get Started
      </button>
    </div>
  </div>
</template>
```

---

This design guide is a living document and will evolve as the component library grows.