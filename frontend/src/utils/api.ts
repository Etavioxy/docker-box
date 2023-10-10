import axios from 'axios';
import { useAuthStore } from '../store';

async function signup(email, password) {
  const response = await axios.post('/api/user/register', { email, password });
  
  if (response.status === 201) {
    const { user } = response.data;
    console.log(user);
  } else {
    console.error('注册失败');
    throw new Error('注册失败');
  }
}

async function login(email, password) {
  const response = await axios.post('/api/user/login', { email, password });
  
  if (response.status === 200) {
    const { user, token } = response.data;
    console.log(user, token);
    localStorage.setItem('user', user);
    localStorage.setItem('token', token);

    const authStore = useAuthStore();
    authStore.user = user;
    authStore.token = token;
  } else {
    console.error('登录失败');
    throw new Error('登录失败');
  }
}

// 登出函数
async function logout() {
  document.cookie = "auth=; path=/";

  localStorage.removeItem('user');
  localStorage.removeItem('token');
  const authStore = useAuthStore();
  authStore.user = null;
  authStore.token = null;
  //router.push({ path: "/login" });
}

// 在其他需要身份验证的请求中发送令牌
const api_axios = axios.create({
  baseURL: '/api', // 设置基本的 API 地址
});

// 添加请求拦截器
api_axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token || localStorage.getItem('token');
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { signup, login, logout, api_axios};
