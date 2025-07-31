#!/bin/bash

# Commit all files with individual commits and version bumps
# Usage: ./scripts/commit-all-files.sh

echo "Starting individual file commits with version bumps..."

# Initial version
version="0.1.0"

# Configuration files
files=(
  "package.json:chore(setup): initialize project dependencies"
  "tsconfig.json:config(typescript): add TypeScript configuration"
  "tsconfig.node.json:config(typescript): add Node TypeScript config"
  "vite.config.ts:config(vite): add Vite bundler configuration"
  "tailwind.config.js:config(tailwind): add custom theme configuration"
  "postcss.config.js:config(postcss): add PostCSS configuration"
  ".eslintrc.cjs:config(eslint): add ESLint rules"
  ".prettierrc.json:config(prettier): add Prettier formatting rules"
  ".prettierignore:config(prettier): add Prettier ignore patterns"
  ".gitignore:chore(git): add Git ignore patterns"
  "index.html:feat(core): add application entry point"
  "src/main.ts:feat(core): add Vue app initialization"
  "src/App.vue:feat(core): add root component"
  "src/style.css:style(global): add Tailwind CSS imports"
  "src/vite-env.d.ts:chore(types): add Vite type definitions"
  "src/store/useThemeStore.ts:feat(store): add dark mode management"
  "src/store/useToastStore.ts:feat(store): add toast notification system"
  "src/router/index.ts:feat(router): add Vue Router configuration"
  "src/components/ThemeToggle.vue:feat(components): add theme toggle button"
  "src/pages/HomePage.vue:feat(pages): add landing page"
  "src/pages/DesignGuidePage.vue:feat(pages): add design guide page"
  "src/pages/ExamplesPage.vue:feat(pages): add examples page"
  "public/vite.svg:chore(assets): add Vite logo"
  "README.md:docs(readme): add project documentation"
  "DESIGN_GUIDE.md:docs(guide): add design system documentation"
  "PROGRESS_TRACKER.md:docs(tracking): add progress tracking"
  "CLAUDE.md:docs(ai): add AI development instructions"
  "WORKFLOW.md:docs(workflow): add development workflow guide"
  "logs/TASK_INDEX.md:docs(logs): add task index"
  "logs/tasks/TASK-001-project-setup.md:docs(logs): add project setup log"
  "logs/daily/2025-07-31.md:docs(logs): add daily log"
  "scripts/commit-all-files.sh:chore(scripts): add commit automation script"
)

# Function to bump version
bump_version() {
  # Extract current version from package.json
  current_version=$(grep '"version"' package.json | sed -E 's/.*"version": "([^"]+)".*/\1/')
  
  # Split version into parts
  IFS='.' read -r major minor patch <<< "$current_version"
  
  # Increment patch version
  patch=$((patch + 1))
  
  # Update version
  new_version="$major.$minor.$patch"
  
  # Update package.json
  sed -i "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" package.json
  
  echo $new_version
}

# Process each file
for file_info in "${files[@]}"; do
  IFS=':' read -r file message <<< "$file_info"
  
  if [ -f "$file" ]; then
    # Stage the file
    git add "$file"
    
    # Commit with version
    git commit -m "$message [v$version]"
    
    # Bump version for next file
    version=$(bump_version)
    
    echo "Committed: $file with version v$version"
  else
    echo "Warning: File not found - $file"
  fi
done

echo "All files committed successfully!"
echo "Final version: v$version"