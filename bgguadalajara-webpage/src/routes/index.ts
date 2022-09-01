import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { store } from '../store/store';
import { supabase } from '../supabase';
import publicRoutes from './public_rutes';
import userRoutes from './users_rutes';

const Routes:RouteRecordRaw[] = [
  { path: '/LogOut', name: 'LogOut', component: ()=> import('../views/LogOut.vue') },
  { path: '/', component: ()=> import('../views/publicTemplate.vue'), children: publicRoutes  },
  { path: '/', component: ()=> import('../views/userTemplate.vue'), children:  userRoutes },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ()=> import('../views/404.vue') },
]



const router = createRouter({    
    history: createWebHashHistory(),
    routes: Routes
  });

  router.beforeEach((to, from, next) => {
    // get current user info
    const currentUser = supabase.auth.user();
    const requiresAuth = to.matched.some
    (record => record.meta.requiresAuth);
  
    if(requiresAuth && !currentUser) next('sign-in');
    else if(!requiresAuth && currentUser) next("/");
    else next();
  });

export default router;