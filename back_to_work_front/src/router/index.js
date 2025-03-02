import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import ServicesView from "../views/ServicesView.vue";
import RegisterFormComponent from "../components/RegisterFormComponent.vue";
import LoginFormComponent from "../components/LoginFormComponent.vue";

const routes = [
    { path: '/', component: HomeView, name: 'home' },
    { path: '/about', component: AboutView,  name: 'about'},
    { path: '/contact', component: ContactView,  name: 'contact'},
    { path: '/service', component: ServicesView,  name: 'service'},
    { path: '/login', component: LoginFormComponent,  name: 'login'},
    { path: '/register', component: RegisterFormComponent,  name: 'register'},
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router