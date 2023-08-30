import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import pinia from '@/stores/index';
import router from './router/index'
createApp(App).use(router).use(pinia).mount('#app')
