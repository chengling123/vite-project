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
		path: '/:path(.*)*',
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
export const baseRoutes= [
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
