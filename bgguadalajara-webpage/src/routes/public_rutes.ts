import { RouteRecordRaw } from 'vue-router';

const Routes: RouteRecordRaw[] = [
    { path: '/', component: () => import('../views/publics/Home.vue') },
    { path: '/login', component: () => import('../views/publics/Login.vue') },
    { path: '/register', component: () => import('../views/publics/Register.vue') },
    { path: '/restore', component: () => import('../views/publics/RestorePassword.vue') },
];
export default Routes;