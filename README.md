# DreamyHook Core Web Component Library

A comprehensive, production-ready Vue 3 component library built with TypeScript, Tailwind CSS, and accessibility in mind.

## ✨ Features

- 🎨 **44+ Components** - Complete set of UI components for modern web applications
- 🌙 **Dark Mode** - Built-in dark mode support across all components
- ♿ **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
- 🎯 **TypeScript** - Full TypeScript support with comprehensive type definitions
- 🎨 **Tailwind CSS** - Utility-first styling with customizable design tokens
- 📱 **Responsive** - Mobile-first responsive design
- 🚀 **Performance** - Optimized bundle size with tree-shaking support
- 🧩 **Composable** - Flexible composable architecture with Vue 3 Composition API

## 📦 Installation

```bash
npm install dreamyhook-core-web-component-library
# or
yarn add dreamyhook-core-web-component-library
# or
pnpm add dreamyhook-core-web-component-library
```

## 🚀 Quick Start

### 1. Import Styles

Add the component styles to your main CSS file:

```css
@import 'dreamyhook-core-web-component-library/dist/style.css';
```

### 2. Register Components

**Global Registration:**

```typescript
import { createApp } from 'vue'
import App from './App.vue'

// Import all components
import * as DreamyHookComponents from 'dreamyhook-core-web-component-library'

const app = createApp(App)

// Register all components globally
Object.entries(DreamyHookComponents).forEach(([name, component]) => {
  app.component(name, component)
})

app.mount('#app')
```

**Individual Import:**

```vue
<template>
  <div>
    <Button variant="primary" @click="handleClick">
      Click me
    </Button>
    <Modal v-model:isOpen="showModal" title="Hello World">
      <p>This is a modal dialog!</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Modal } from 'dreamyhook-core-web-component-library'

const showModal = ref(false)

const handleClick = () => {
  showModal.value = true
}
</script>
```

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── composables/      # Vue composition utilities
├── layouts/          # Page layouts
├── pages/            # Application pages
├── router/           # Vue Router configuration
├── store/            # Pinia stores
├── styles/           # Global styles
└── utils/            # Helper functions
```

## 🛠️ Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Code Style

This project uses ESLint and Prettier for code formatting. Configuration files:
- `.eslintrc.cjs` - ESLint configuration
- `.prettierrc.json` - Prettier configuration

## 📚 Documentation

- [Design Guide](./DESIGN_GUIDE.md) - Typography, colors, spacing guidelines
- [Component Examples](/examples) - Live component demonstrations
- [API Documentation](#) - Coming soon

## 🎯 Development Phases

### Day 1: Project Setup ✅
- Vue 3 + Vite setup
- Tailwind CSS configuration
- Dark mode support
- ESLint + Prettier
- Design guide creation

### Day 2: Core Elements
- Button, Input, Label components
- Form field wrappers
- Basic typography components

### Day 3: Forms & Controls
- Select, Toggle, Radio, Checkbox
- File upload
- Form validation

### Day 4: Navigation & Layouts
- Navbar, Sidebar, Tabs
- Breadcrumbs, Pagination
- Layout templates

### Day 5: Overlays & Feedback
- Modal, Popover, Tooltip
- Toast notifications
- Loading states

### Day 6: Complex Components
- Data tables
- Cards and widgets
- Error pages

### Day 7: Documentation & Deploy
- Complete documentation
- SEO optimization
- Production deployment

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ by DreamyHook Team