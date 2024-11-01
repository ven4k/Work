import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import 'normalize.css';
import Notifications from '@kyvg/vue3-notification'

createApp(App).use(router).use(Notifications).mount('#app')

