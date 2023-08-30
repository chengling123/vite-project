import { defineStore } from 'pinia';


/**
 * 后端返回原始路由(未处理时)
 * @/types里面定义的.dt.ts可以直接被引用
 * @methods setCacheKeepAlive 设置接口原始路由数据
 */
export const useRequestOldRoutes = defineStore('requestOldRoutes', {
	state: () :IuseRequestOldRoutes => ({
		requestOldRoutes: [],
		name:''
	}),
	actions: {
		async setRequestOldRoutes(routes: Array<string>) {
			this.requestOldRoutes = routes;
		},
	},
});
