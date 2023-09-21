import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  define: {
    'import.meta.env.VITE_API_URL': process.env.VITE_API_URL
  }
})
