import * as Router from 'vue-router';
import Home from './views/home.vue';
import LoginSignup from './views/login-signup.vue';
import Image from './views/image.vue';
import Workspace from './views/workspace.vue';
import WorkspaceInstance from './views/workspace-instance.vue'
import WorkspaceUntitled from './views/workspace-untitled.vue'


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
      component: Image,
      meta: {
        requiresAuth: true, //??
      },
    },
    {
      path: "/workspace",
      component: Workspace,
      meta: {
        requiresAuth: true, //??
      },
      children: [
        {
          path: "/workspace",
          component: WorkspaceUntitled,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/workspace/:workspaceId",
          redirect: (to) => ({
            path: '/workspace/'+to.params.workspaceId+'/',
          })
        },
        {
          path: "/workspace/:workspaceId/:path(.*)",
          component: WorkspaceInstance,
          meta: {
            requiresAuth: true,
          },
          props: true,
          beforeEnter: (to, _from, next) => {
            const hasTrailingSlash = /\/$/.test(to.path);
            if (!hasTrailingSlash) {
              next({
                path: to.path + '/',
                query: to.query,
                hash: to.hash,
              });
            } else {
              next();
            }
          }
        },
      ]
    },
  ],
});

import { useAuthStore } from './store';

router.beforeEach((to, _from, next) => {
  // 检查路由的 meta 字段中是否设置了 requiresAuth: true
  if (to.meta.requiresAuth) {
    console.log('require auth')
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
