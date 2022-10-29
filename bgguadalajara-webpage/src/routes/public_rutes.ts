import { RouteRecordRaw } from 'vue-router';

const Routes: RouteRecordRaw[] = [
    { path: '/', name:"Home", component: () => import('../views/publics/Home.vue') },
    { path: '/login', name: "Login", component: () => import('../views/publics/Login.vue') },
    { path: '/register', name:"Register", component: () => import('../views/publics/Register.vue') },
    { path: '/restore', name: "Restore", component: () => import('../views/publics/RestorePassword.vue') },
];
export default Routes;