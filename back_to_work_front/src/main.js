import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import '/src/assets/themes/primefaces-nova-light/theme.css';



//import 'primevue/resources/primevue.min.css'; // Estilos base de PrimeVue
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.mount('#app');