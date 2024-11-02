import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import 'normalize.css';
import Notifications from './Notification/Notification.vue'

const app = createApp(App)
app.use(router)
app.component(Notifications)
app.mount('#app')

