import axios from 'axios';
import { useUserStore } from '@/store/index.js';
const userStore = useUserStore();

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL: "http://120.27.234.36:8080", // 确保这里的URL是正确的，没有多余的字符
  headers: {
    'Content-Type': 'application/json',
    'token': userStore.userInfo?.token
  },
  timeout: 50000
});

// 请求拦截器
instance.interceptors.request.use(function (config) {

  config.headers['token'] = userStore.userInfo?.token || '';
  return config;
}, function (error) {

  console.error(error);
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 1) {
      return res.data;
    }

    console.error("Error:", res.data);
    return Promise.reject(res.data);
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      console.log("Unauthorized: Please login again");
    }
    console.error(err);
    return Promise.reject(err);
  }
);

export default instance;
