import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/totalitywellnessspa/',
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})

