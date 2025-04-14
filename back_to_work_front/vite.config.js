import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss')({
          config: false // Indica que no usamos tailwind.config.js
        }),
        require('autoprefixer')
      ]
    }
  }
})