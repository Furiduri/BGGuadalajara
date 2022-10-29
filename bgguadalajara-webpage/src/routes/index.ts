import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { store } from '../store/store';
import { supabase } from '../supabase';
import publicRoutes from './public_rutes';
import userRoutes from './users_rutes';

const Routes:RouteRecordRaw[] = [
  { path: '/LogOut', name: 'LogOut', component: ()=> import('../views/LogOut.vue') , },
  { path: '/app', component: ()=> import('../views/userTemplate.vue'), children:  userRoutes, meta: {requiresAuth: true} },
  { path: '/', component: ()=> import('../views/publicTemplate.vue'), children: publicRoutes  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ()=> import('../views/404.vue') },
]



const router = createRouter({    
    history: createWebHashHistory(),
    routes: Routes
  });

  router.beforeEach((to, from, next) => {
    // get current user info
    const currentUser = supabase.auth.user();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
    if(requiresAuth && !currentUser)
      if(to.fullPath != "/") next('/LogOut');
      else next({name:"Home"});
    else next();
  });

export default router;