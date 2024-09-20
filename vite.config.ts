import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  envDir: './env',
  plugins: [uni(), eslintPlugin({ cache: false })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
