import "./style.css";
import 'uno.css'

import { createApp } from "vue";
import { createPinia } from 'pinia';

import App from "./App.vue";

const pinia = createPinia();

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

pinia.use(piniaPluginPersistedstate)

import router from './router'

createApp(App).use(pinia).use(router).mount("#app");
