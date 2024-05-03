import axios from 'axios';
import { useAuthStore } from '../pinia/authStore';

async function signup(email:string, password:string) {
  const response = await axios.post('/api/user', { email, password });
  
  if (response.status === 201) {
    const { user } = response.data;
    console.log(user);
  } else {
    console.error('注册失败');
    throw new Error('注册失败');
  }
}

async function login(email:string, password:string) {
  const response = await axios.post('/api/auth', { email, password });

  if (response.status === 200) {
    const { user, token, expiresAt } = response.data;
    console.log(user, token, expiresAt);

    useAuthStore().login(user, token, new Date(expiresAt));
  } else {
    console.error('登录失败');
    throw new Error('登录失败');
  }
}

// 登出函数
async function logout() {
  document.cookie = "auth=; path=/";
  useAuthStore().logout();
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
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api_axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 检查是否为JWT过期或状态码为401
    if (error.response && error.response.status === 401 ) {
      logout();
    }
    return Promise.reject(error);
  }
);

export { signup, login, logout, api_axios };
