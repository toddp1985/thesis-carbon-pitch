import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/thesis-carbon-pitch/' : './',
  plugins: [react(), tailwindcss()],
  server: {
    host: '127.0.0.1',
    port: 43173,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 43174,
    strictPort: true,
  },
})
