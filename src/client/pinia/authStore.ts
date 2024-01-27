// import { defineStore } from 'pinia';
//
// const expiresAt = new Date(localStorage.getItem('expiresAt'))
// let user = "", token = "";
//
// if ( new Date() < expiresAt ) {
//   user = localStorage.getItem('user');
//   token = localStorage.getItem('token');
// }
//
// console.log('[logged in]', user, token, expiresAt, Date());
//
// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     user: user || null,
//     token: token || null,
//     expiresAt: expiresAt || null,
//   }),
//   getters: {
//     isAuthenticated: (state) => !!state.user,
//   }
// })
//

import { defineStore } from 'pinia';

// 定义auth store
export const useAuthStore = defineStore('auth', {
  // 使用persist选项来配置持久化
  persist: {
    // 指定使用localStorage作为存储
    storage: localStorage,
    // 指定要持久化的state路径
    paths: ['user', 'token', 'expiresAt'],
    // 指定一个自定义的key来存储数据
    key: 'auth',
    // 指定一个自定义的函数来恢复数据
    rehydrated: (store: any) => {
      // 如果expiresAt已过期，清空user和token
      if (new Date() > store.expiresAt) {
        store.user = null;
        store.token = null;
      }
      // 打印恢复后的状态
      console.log('[logged in]', store.user, store.token, store.expiresAt, Date());
    },
  },
  // 定义state
  state: () => ({
    user: null as (string | null),
    token: null as (string | null),
    expiresAt: null as (Date | null),
  }),
  // 定义getters
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  // 定义actions
  actions: {
    // 登录操作
    login(user: string, token: string, expiresAt: Date) {
      this.user = user;
      this.token = token;
      this.expiresAt = expiresAt;
    },
    // 登出操作
    logout() {
      this.user = null;
      this.token = null;
      this.expiresAt = null;
    },
  },
});
