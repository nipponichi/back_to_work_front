import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const app = createApp(App)

app.use(PrimeVue)
app.use(router)
app.component(Dialog)
app.component(Button)

app.mount('#app')