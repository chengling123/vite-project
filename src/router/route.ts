import { RouteRecordRaw } from 'vue-router';
export const dynamicRoutes = [
	{
		path: '/home',
		name: 'router.home',
		component: () => import('@/views/home/index.vue'),
		meta: {
			isLink: '',
			isHide: false,
			isKeepAlive: true,
			isAffix: true,
			isIframe: false,
			icon: 'iconfont icon-shouye',
		},
	},
	
];

/**
 * 定义静态路由（默认路由）
 */
export const staticRoutes= [
	{
		path: '/login',
		name: 'staticRoutes.login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			isAuth: false,
		},
	},
];


/**
 * 定义404、401界面
 */
export const notFoundAndNoPower = [
	{
		path: '/:pa33th(.*)*',
		name: 'staticRoutes.notFound',
		component: () => import('@/views/error/404.vue'),
		meta: {
			isHide: true,
		},
	}
];

/**
 *  基础性路由
 *
 * 所有节点都是挂载此节点下
 */
export const baseRoutes: Array<RouteRecordRaw>= [
	{
		path: '/',
		name: '/',
		component: () => import('@/layout/index.vue'),
		redirect: '/home',
		meta: {
			isKeepAlive: true,
		},
		children: [],
	},
];


