# Development Workflow Guide

## 🔄 Standard Development Workflow

This document outlines the standard workflow for developing the DreamyHook Core Web Component Library.

---

## 📋 Task Lifecycle

### 1. Task Initiation
```
1. Check PROGRESS_TRACKER.md for next task
2. Create task log: logs/tasks/TASK-XXX-description.md
3. Update logs/TASK_INDEX.md
4. Create daily log if new day: logs/daily/YYYY-MM-DD.md
```

### 2. Development Phase
```
1. Create/modify files as needed
2. Test functionality locally
3. Ensure TypeScript has no errors
4. Run linting and formatting
5. Test dark mode compatibility
6. Verify accessibility
```

### 3. Documentation
```
1. Update component examples
2. Add usage documentation
3. Update PROGRESS_TRACKER.md
4. Document decisions in task log
```

### 4. Version Control
```
1. Initialize git (if not done)
2. Stage files individually
3. Commit with version bump
4. Update package.json version
```

### 5. Task Completion
```
1. Mark task complete in logs
2. Update progress percentages
3. Close task log with summary
4. Plan next steps
```

---

## 🛠️ Component Development Workflow

### Step 1: Component Planning
- Define props interface
- Plan variants/sizes
- Consider accessibility
- Design API surface

### Step 2: Implementation
```vue
<!-- 1. Create component file -->
<template>
  <!-- Semantic HTML -->
</template>

<script setup lang="ts">
// 2. TypeScript interfaces
// 3. Props/emits definition
// 4. Component logic
// 5. Composables if needed
</script>
```

### Step 3: Styling
- Use Tailwind classes
- Support dark mode
- Ensure responsive design
- Follow design system

### Step 4: Testing
- Create usage example
- Test all variants
- Verify accessibility
- Check responsive behavior

### Step 5: Documentation
- Add to examples page
- Document props/slots
- Show usage patterns
- Note best practices

---

## 📝 Commit Workflow

### Individual File Commits
```bash
# For each new file
git add path/to/file.ext
git commit -m "feat(scope): add filename [v0.1.X]"

# Update version in package.json after each commit
npm version patch --no-git-tag-version
```

### Bulk Commit Script (example)
```bash
#!/bin/bash
# commit-all.sh

files=(
  "package.json"
  "tsconfig.json"
  "vite.config.ts"
  # ... list all files
)

version=0.1.0
for file in "${files[@]}"; do
  git add "$file"
  git commit -m "chore(setup): add $file [v$version]"
  version=$(npm version patch --no-git-tag-version | sed 's/v//')
done
```

---

## 📊 Progress Update Workflow

### After Each Component
1. Update PROGRESS_TRACKER.md
   - Mark component complete
   - Update percentages
   - Add completion date

2. Update Examples
   - Add component to examples page
   - Create usage demonstration
   - Test interactivity

3. Version Bump
   - Patch for fixes/docs
   - Minor for new components
   - Major for breaking changes

---

## 🔍 Quality Checklist

Before marking any task complete:

### Code Quality
- [ ] No TypeScript errors
- [ ] ESLint passing
- [ ] Prettier formatted
- [ ] No console.logs

### Functionality
- [ ] Component works as intended
- [ ] All props functioning
- [ ] Events emitting correctly
- [ ] Slots rendering properly

### Styling
- [ ] Follows design system
- [ ] Dark mode working
- [ ] Responsive on all sizes
- [ ] Animations smooth

### Accessibility
- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

### Documentation
- [ ] Props documented
- [ ] Examples created
- [ ] Usage patterns shown
- [ ] Edge cases noted

---

## 🚀 Daily Routine

### Morning
1. Review PROGRESS_TRACKER.md
2. Check previous day's log
3. Plan day's objectives
4. Create/update task logs

### During Development
1. Follow component workflow
2. Commit incrementally
3. Test continuously
4. Update documentation

### End of Day
1. Update progress tracker
2. Complete daily log
3. Push all commits
4. Plan next day

---

## 📁 File Organization

### When Creating New Components
```
src/
├── components/
│   └── ComponentName.vue
├── examples/
│   └── ComponentNameExample.vue
└── types/
    └── component-name.types.ts
```

### Documentation Updates
```
- Update PROGRESS_TRACKER.md
- Update examples page
- Add to component index
- Update README if needed
```

---

## 🎯 Best Practices

1. **Commit Often**: Small, atomic commits
2. **Document First**: Write docs alongside code
3. **Test Continuously**: Don't wait until end
4. **Track Progress**: Keep logs current
5. **Communicate Changes**: Clear commit messages
6. **Version Consistently**: Every change bumps version
7. **Think Accessibility**: From the start, not after

---

## 🔧 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format with Prettier
npm run typecheck       # Check TypeScript

# Git
git status              # Check changes
git add .               # Stage all
git commit -m "..."     # Commit with message
git log --oneline       # View commit history

# Version
npm version patch       # Bump patch version
npm version minor       # Bump minor version
npm version major       # Bump major version
```

---

Last Updated: 2025-07-31