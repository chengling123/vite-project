import axios, { AxiosInstance } from 'axios';
// import qs from 'qs'
const service:AxiosInstance=axios.create({
  baseURL:import.meta.env.VITE_APP_BASE_API,
  timeout: 50000, // 全局超时时间
})
// 添加请求拦截器
service.interceptors.request.use( (config)=> {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {

  return response;
}, function (error) {

  return Promise.reject(error);
});
export default service
