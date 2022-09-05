import { RouteRecordRaw } from 'vue-router';

const Routes: RouteRecordRaw[] = [
    { path: '/', name: "dashboard", component: () => import('../views/users/Dashboard.vue'), meta: {requiresAuth: true} },
    { path: '/profile', name: "profile", component: () => import('../views/users/profile.vue'), meta: {requiresAuth: true} },
];
export default Routes;