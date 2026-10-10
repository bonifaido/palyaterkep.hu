import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(projectRoot, 'index.html'),
        tool: resolve(projectRoot, 'tool.html'),
        howToUse: resolve(projectRoot, 'how-to-use.html'),
        forCounselors: resolve(projectRoot, 'for-counselors.html')
      }
    }
  }
})
