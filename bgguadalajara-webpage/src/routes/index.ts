import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import publicRoutes from './public_rutes';

const Routes:RouteRecordRaw[] = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: ()=> import('../views/404.vue') },
    { path: '/', component: ()=> import('../views/publicTemplate.vue'), children: publicRoutes  },
]



const router = createRouter({    
    history: createWebHashHistory(),
    routes: Routes
  });

router.beforeEach(function(to, from, next) {
    window.scrollTo(0, 0);
    next();
});

export default router;