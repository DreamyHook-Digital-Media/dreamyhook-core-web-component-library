/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',      // Indigo
        secondary: '#f59e0b',    // Amber
        accent: '#10b981',       // Emerald
        neutral: '#374151',      // Gray 700
        base: '#f9fafb',         // Background
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}