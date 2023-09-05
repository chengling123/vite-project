import NProgress from 'nprogress'
import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRoutes, notFoundAndNoPower, dynamicRoutes,baseRoutes } from '@/router/route'
import { initBackEndControlRoutes } from '@/router/backEnd'
import { useRoutesList } from '@/stores/routesList'
import { useKeepALiveNames } from '@/stores/keepAliveNames'
import { Session } from '@/utils/storage'
import { storeToRefs } from 'pinia'
export const router = createRouter({
  history: createWebHashHistory(),
  // routes: [	{
	// 	path: '/',
	// 	name: '/',
	// 	component: () => import('@/layout/index.vue'),
		
	// 	meta: {
	// 		isKeepAlive: true,
	// 	},
	// 	children: [
	// 		{
	// 			path: 'chengling',
	// 			name: 'Cheng',
	// 			component: () => import('@/views/home/index.vue'),
	// 			meta: {
	// 				isLink: '',
	// 				isHide: false,
	// 				isKeepAlive: true,
	// 				isAffix: true,
	// 				isIframe: false,
	// 				icon: 'iconfont icon-shouye',
	// 			},
	// 		},
	// 	],
	// }],
  routes: [...notFoundAndNoPower, ...staticRoutes],
})
/**
 * 路由多级嵌套数组处理成一维数组
 * @param arr 传入路由菜单数据数组
 * @returns 返回处理后的一维路由菜单数组
 */
export function formatFlatteningRoutes(arr: any) {
  if (arr.length <= 0) return false
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].children) {
      arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1))
    }
  }
  return arr
}
/**
 * 一维数组处理成多级嵌套数组（只保留二级：也就是二级以上全部处理成只有二级，keep-alive 支持二级缓存）
 * @description isKeepAlive 处理 `name` 值，进行缓存。顶级关闭，全部不缓存
 * @param arr 处理后的一维路由菜单数组
 */
export function formatTwoStageRoutes(arr: any) {
  if (arr.length <= 0) return false
  const newArr: any = []
  const cacheList: Array<string> = []
  arr.forEach((v: any) => {
    if (v.path === '/') {
      newArr.push({
        component: v.component,
        path: v.path,
        name: v.name,
        redirect: v.redirect,
        children: [],
      })
    } else {
      //判断是否是动态路由 xx/:id
      if (v.path.indexOf(':/') > -1) {
        v.meta['isDynamic'] = true
        v.meta['isDynamicPath'] = v.path
      }
      newArr[0].children.push({ ...v })

      if (v.meta.isKeepAlive) {
        cacheList.push(v.name)
        const stores = useKeepALiveNames()
        stores.setCacheKeepAlive(cacheList)
      }
    }
  })
  return arr
}

let isAdded = false


// 路由加载前
router.beforeEach(async (to) => {
  const token = Session.getToken();
	if (to.meta.isAuth !== undefined && !to.meta.isAuth) {
    NProgress.done()
  }else{
    if(!token){
      console.log('无token，跳转登录页面')
    }else{
      
      const storesRoutesList = useRoutesList();
      //为了保证其响应式，以下两种方法都可行，使用storeToRefs函数可以辅助保持数据（state + getter）的响应式解构
      // const routesList=computed(()=>storesRoutesList.routesList)
      const { routesList } = storeToRefs(storesRoutesList)
      if (routesList.value.length === 0) {
        console.log('是否再次进入')
        if (!isAdded) {
        await initBackEndControlRoutes();
        isAdded = true
        return to.fullPath
        }

      }



    }
  }
})
// 路由加载后
router.afterEach(() => {
  NProgress.done()
})

export default router
