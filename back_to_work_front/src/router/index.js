import { createRouter, createMemoryHistory, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import ServicesView from "../views/ServicesView.vue";

const routes = [
    { path: '/', component: HomeView, name: 'home' },
    { path: '/about', component: AboutView,  name: 'about'},
    { path: '/contact', component: ContactView,  name: 'contact'},
    { path: '/service', component: ServicesView,  name: 'service'},


]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router