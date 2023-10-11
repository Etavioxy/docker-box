import { defineStore } from 'pinia';

const expiresAt = new Date(localStorage.getItem('expiresAt'))
let user = "", token = "";

if ( new Date() < expiresAt ) {
  user = localStorage.getItem('user');
  token = localStorage.getItem('token');
}

console.log('[logged in]', user, token, expiresAt, Date());

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: user || null,
    token: token || null,
    expiresAt: expiresAt || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  }
})
