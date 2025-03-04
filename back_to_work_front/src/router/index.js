import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import ServicesView from "../views/ServicesView.vue";
import RegisterFormComponent from "../components/RegisterFormComponent.vue";
import LoginFormComponent from "../components/LoginFormComponent.vue";

const routes = [
    { path: '/', component: HomeView, name: 'home' },
    { path: '/about', component: AboutView,  name: 'about', meta: { requiresAuth: true }},
    { path: '/contact', component: ContactView,  name: 'contact'},
    { path: '/service', component: ServicesView,  name: 'service'},
    { path: '/login', component: LoginFormComponent,  name: 'login'},
    { path: '/register', component: RegisterFormComponent,  name: 'register'},
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("tokenExpiration");

    const isAuthenticated = token && expiration && Date.now() < parseInt(expiration);

    if (to.meta.requiresAuth && !isAuthenticated) {
      localStorage.setItem("redirectAfterLogin", to.fullPath);
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("user");
      next("/login");
    } else {
      next();
    }
});



export default router