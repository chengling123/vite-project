import { createRouter, createWebHashHistory } from 'vue-router';
import { staticRoutes, notFoundAndNoPower } from '@/router/route';
import { initBackEndControlRoutes } from '@/router/backEnd';
import { useRoutesList } from '@/stores/routesList';
import { Session } from '@/utils/storage';
import { storeToRefs } from 'pinia';
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...notFoundAndNoPower, ...staticRoutes],
})



// 路由加载前
router.beforeEach(async (to, from, next) => {
  const token = Session.getToken();
	if (to.meta.isAuth !== undefined && !to.meta.isAuth) {
		next();
  }else{
    if(!token){
      console.log('无token，跳转登录页面')
    }else{
      const storesRoutesList = useRoutesList();
      //为了保证其响应式，以下两种方法都可行，使用storeToRefs函数可以辅助保持数据（state + getter）的响应式解构
      // const routesList=computed(()=>storesRoutesList.routesList)
      const { routesList } = storeToRefs(storesRoutesList);//不写storeToRefs会丢失响应式
      if (routesList.value.length === 0) {
        await initBackEndControlRoutes();
        next({path:to.path,query:to.query})
      }else{
        next()
      }
      
    }
  }
})
export default router;
