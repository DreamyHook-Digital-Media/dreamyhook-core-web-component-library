# Claude AI Development Instructions

## 🤖 About This File

This file contains specific instructions for Claude AI to maintain consistency in development practices, commit conventions, and project workflows.

---

## 📋 Project Overview

**Project:** DreamyHook Core Web Component Library
**Tech Stack:** Vue 3, TypeScript, Tailwind CSS, Headless UI, Pinia, Vite
**Development Timeline:** 7-day phased approach
**Current Phase:** Day 1 Complete (as of 2025-07-31)

---

## 🔄 Git Commit Conventions

### Commit Message Format
```
<type>(<scope>): <subject> [v<version>]

<body>

<footer>
```

### Commit Types
- `feat`: New feature or component
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `config`: Configuration file changes

### Example Commits
```bash
feat(components): add Button component [v0.2.0]
docs(guide): create DESIGN_GUIDE.md [v0.1.1]
config(tailwind): add custom theme colors [v0.1.2]
```

### Version Bumping Strategy
- **Major (x.0.0)**: Breaking changes
- **Minor (0.x.0)**: New features, components, or significant additions
- **Patch (0.0.x)**: Bug fixes, documentation updates, minor changes

Each file addition should bump the patch version (0.0.x).
Each component completion should bump the minor version (0.x.0).

---

## 📁 File Creation Protocol

When creating new files, follow this sequence:

1. Create the file
2. Stage the file: `git add <filename>`
3. Commit with version bump: `git commit -m "type(scope): description [vX.X.X]"`
4. Update package.json version
5. Update PROGRESS_TRACKER.md

---

## 🗂️ Logging System

### Task Log Structure
```
logs/
├── tasks/
│   ├── TASK-001-project-setup.md
│   ├── TASK-002-core-elements.md
│   └── ...
├── daily/
│   ├── 2025-07-31.md
│   └── ...
└── TASK_INDEX.md
```

### Task ID Format
- Format: `TASK-XXX-description`
- Example: `TASK-001-project-setup`

### Log Entry Template
```markdown
# Task: [TASK-XXX] - [Description]
**Date:** YYYY-MM-DD
**Status:** In Progress | Complete
**Version:** vX.X.X

## Objectives
- [ ] Objective 1
- [ ] Objective 2

## Conversation Summary
[Brief summary of AI interactions]

## Files Created/Modified
- `path/to/file.ext` - Description

## Decisions Made
- Decision 1: Reasoning
- Decision 2: Reasoning

## Next Steps
- Next action items
```

---

## 🛠️ Development Workflow

### Daily Workflow
1. Check PROGRESS_TRACKER.md for current day's tasks
2. Create task log entry
3. Implement features/components
4. Commit each file separately with version bump
5. Update progress tracker
6. Close task log with summary

### Component Development Steps
1. Create component file
2. Add TypeScript interfaces/types
3. Implement component logic
4. Add Tailwind styling
5. Create usage example
6. Update examples page
7. Commit and version bump

---

## 📊 Progress Tracking

Always update these files when changes are made:
- `PROGRESS_TRACKER.md` - Mark tasks complete, update percentages
- `package.json` - Bump version number
- `logs/TASK_INDEX.md` - Add new task entries

---

## 🎯 Key Principles

1. **Atomic Commits**: One file per commit (when doing bulk commits)
2. **Version Consistency**: Every commit includes version bump
3. **Documentation First**: Update docs before/with implementation
4. **Progress Visibility**: Keep tracker current
5. **Accessibility**: All components must be WCAG compliant
6. **Type Safety**: Full TypeScript coverage
7. **Dark Mode**: All components support dark mode

---

## 🔍 Code Standards

### Vue Component Structure
```vue
<template>
  <!-- Template with Tailwind classes -->
</template>

<script setup lang="ts">
// Imports
// Types/Interfaces
// Props/Emits
// Composables
// Computed/Refs
// Methods
// Lifecycle
</script>
```

### File Naming
- Components: `PascalCase.vue`
- Composables: `use[Name].ts`
- Utilities: `camelCase.ts`
- Types: `PascalCase.types.ts`

---

## 🚀 Deployment Checklist

Before deploying:
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Documentation updated
- [ ] Version bumped appropriately
- [ ] CHANGELOG updated
- [ ] Examples working
- [ ] Dark mode tested
- [ ] Accessibility checked

---

## 📝 Additional Notes

- Always run `npm run lint` and `npm run format` before commits
- Test dark mode for every component
- Ensure responsive design for all screen sizes
- Keep bundle size minimal
- Follow Tailwind CSS best practices
- Use Headless UI for complex interactive components

---

Last Updated: 2025-07-31