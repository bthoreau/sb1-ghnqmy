/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a237e',
        secondary: '#0d47a1',
        accent: '#2962ff'
      }
    }
  },
  plugins: []
};