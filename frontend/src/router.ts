import * as Router from 'vue-router';
import Home from './views/home.vue';
import LoginSignup from './views/login-signup.vue';
import Image from './views/image.vue';
import Workspace from './views/workspace.vue';

const router = Router.createRouter({
  history: Router.createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginSignup,
      //beforeEnter: (to, from, next) => {
      //  if (store.getters.isLogged) {
      //    return next({ path: "/files" });
      //  }
      //  next();
      //},
    },
    {
      path: "/images",
      name: "Image",
      component: Image,
      meta: {
        requiresAuth: true, //??
      },
    },
    {
      path: "/workspace",
      name: "Workspace",
      component: Workspace,
      meta: {
        requiresAuth: true, //??
      },
    },
  ],
});

import { useAuthStore } from './store';

router.beforeEach((to, from, next) => {
  // 检查路由的 meta 字段中是否设置了 requiresAuth: true
  if (to.meta.requiresAuth) {
    // 检查登录状态
    if (useAuthStore().isAuthenticated) {
      // 已登录，继续导航
      next();
    } else {
      // 未登录，重定向到登录页面
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
    return ;
  }
  // 不需要登录权限，直接导航
  next();
});

export default router;
