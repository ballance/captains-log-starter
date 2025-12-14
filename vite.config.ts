import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      buffer: 'buffer',
    },
  },
  define: {
    global: 'globalThis',
  },
  esbuild: {
    // Ignore TypeScript errors during development
    logLevel: 'error',
  },
  server: {
    fs: {
      // Allow serving files from parent directory (to access markdown files)
      allow: ['..'],
    },
  },
})
