import { createApp } from 'vue'
import App from './App.vue'
import CatsUI from '../packages/index'

createApp(App).use(CatsUI).mount('#app')