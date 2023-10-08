import { createApp } from 'vue'
import './style.css'
import 'uno.css'
import App from './App.vue'

import { createPinia } from 'pinia'

const pinia = createPinia()

import router from './router'

createApp(App).use(pinia).use(router).mount('#app')
