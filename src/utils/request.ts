import axios from 'axios';

import { Session } from '@/utils/storage';
const service=axios.create({
  baseURL:'/pyue',
  timeout: 50000, // 全局超时时间
})
// 添加请求拦截器
service.interceptors.request.use( (config)=> {
  
  const token=Session.getToken()
  if(token && !config.headers.skipToken){
    //  感叹号它用于确保config.headers中的键不为空
    config.headers![CommonHeaderEnum.AUTHORIZATION] = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  if(response.data.code===1) throw response.data;

  return response.data;
}, function (error) {

  return Promise.reject(error);
});



// 常用header
export enum CommonHeaderEnum {
	'TENANT_ID' = 'TENANT-ID',
	'ENC_FLAG' = 'Enc-Flag',
	'AUTHORIZATION' = 'Authorization',
}

export default service




