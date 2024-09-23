import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import page from '@/components/page/index.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  app.component('page', page)
  return {
    app
  }
}
