import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [uni(), eslintPlugin({ cache: false })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
