import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
    build: {
      outDir: 'build',
      emptyOutDir: true,
    },
    plugins: [react()],
  }
})
