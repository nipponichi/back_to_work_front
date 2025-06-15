import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import ServicesView from "../views/ServicesView.vue";
import RegisterFormComponent from "../components/RegisterFormComponent.vue";
import LoginFormComponent from "../components/LoginFormComponent.vue";
import VerifyEmailComponent from "../components/VerifyEmailComponent.vue";
import ResetPasswordFormComponent from "../components/ResetPasswordFormComponent.vue";
import WorksView from "../views/WorksView.vue";
import AdminView from "../views/AdminView.vue";
import RatesView from "../views/RatesView.vue";
import ResetPasswordView from "../views/ResetPasswordView.vue";
import PaymentSuccess from "../components/PaymentSuccess.vue";

const routes = [
    { path: '/', component: HomeView, name: 'home' },
    { path: '/login', component: LoginFormComponent,  name: 'login'},
    { path: '/register', component: RegisterFormComponent,  name: 'register'},
    { path: '/contact', component: ContactView,  name: 'contact'},
    { path: '/password-reset', component: ResetPasswordView,  name: 'resetPass'},

    { path: '/verify-email', component: VerifyEmailComponent, 
      props: (route) => ({id: route.query.id, hash: route.query.hash, signature: route.query.signature}),
      name: 'verify-email'},
    { path: '/reset-password', component: ResetPasswordFormComponent,
      props: (route) => ({ token: route.query.token, email: decodeURIComponent(route.query.email)}),
      name: 'reset-password'},
    { path: '/about', component: AboutView,  name: 'about', meta: { requiresAuth: true }},
    { path: '/service', component: ServicesView,  name: 'service', meta: { requiresAuth: true }},
    { path: '/work', component:WorksView, name: 'work', meta: { requiresAuth: true }},
    { path: '/admin', component:AdminView, name: 'admin', meta: { requiresAuth: true }},
    { path: '/payment-success', component:PaymentSuccess, name: 'payment', meta: { requiresAuth: true }},
    { path: '/professional', component:RatesView, name: 'professional'}
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
      localStorage.clear();
      next("/login");
    } else {
      next();
    }
});



export default router