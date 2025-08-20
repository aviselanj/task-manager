import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/task-manager/',   // 👈 keep this for GitHub Pages deployment
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // 👈 backend server
        changeOrigin: true,
      },
    },
  },
})


