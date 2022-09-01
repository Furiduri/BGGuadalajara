import { RouteRecordRaw } from 'vue-router';

const Routes: RouteRecordRaw[] = [
    { path: '/', name: "HomeUser", component: () => import('../views/users/Home.vue'), meta: {requiresAuth: true} },
    { path: '/profile', name: "Profile", component: () => import('../views/users/profile.vue'), meta: {requiresAuth: true} },
];
export default Routes;