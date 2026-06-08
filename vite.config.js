import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Change 'wc2026-pool' to your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/wc2026-pool/',
})
