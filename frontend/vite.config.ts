import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import UnoConfig from './uno.config.ts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    UnoCSS(UnoConfig)
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    }
  }
})
