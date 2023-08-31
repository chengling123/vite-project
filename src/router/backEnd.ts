import { useMenuApi } from '@/api/admin/menu';
import { useRequestOldRoutes } from '@/stores/requestOldRoutes';
import { baseRoutes, notFoundAndNoPower, dynamicRoutes } from '@/router/route';
import { RouteRecordRaw } from 'vue-router';
import { formatTwoStageRoutes, formatFlatteningRoutes, router } from '@/router/index';
import { fileURLToPath } from 'url';
// 引入 api 请求接口
const menuApi = useMenuApi();

const layouModules: any = import.meta.glob('../layout/routerView/*.{vue,tsx}');
const viewsModules: any = import.meta.glob('../views/**/*.{vue,tsx}');
const dynamicViewsModules: Record<string, Function> = Object.assign({}, { ...layouModules }, { ...viewsModules });


/**
 * 请求后端路由菜单接口
 */
export function getBackEndControlRoutes(){
  return menuApi.getAdminMenu()
}


export function backEndComponent(routes:any){
  if(!routes) return
  return routes.map((item:any) => {
    if(item.path && item.path.startsWith('http')){
      if (item.meta.isIframe) {
				item.component = () => import('@/layout/routerView/iframes.vue');
			} else {
				item.component = () => import('@/layout/routerView/link.vue');
			}
			item.path = '/iframes/' + window.btoa(item.path);
    }else if(item.path){
      item.component = dynamicImport(dynamicViewsModules, item.path )
    }
    return item

  })
}

export function dynamicImport(dynamicViewsModules:Record<string,Function>, component:string) {
  const keys=Object.keys(dynamicViewsModules)
  const matchKeys=keys.filter((key)=>{
   //把../views或者../替换成空
    const k=key.replace(/..\/views|../,'')
    //判断路径是否以’/adim,xxx即路由返回的path等等开头
    return k.startsWith(`${component}.vue`) || k.startsWith(`/${component}.vue`);
  })
  //只要找到符合的，比如ext/report的文件compuent路径和返回的路由保持一直，则返回componet=>import('ext/report/index.vue)
  
  if (matchKeys?.length === 1) {
		const matchKey = matchKeys[0];
		return dynamicViewsModules[matchKey];
	}
	if (matchKeys?.length > 1) {
		return false;
	}

}

export function setFilterRouteEnd() {
	let filterRouteEnd: any = formatTwoStageRoutes(formatFlatteningRoutes(baseRoutes));
	// notFoundAndNoPower 防止 404、401 不在 layout 布局中，不设置的话，404、401 界面将全屏显示
	// 关联问题 No match found for location with path 'xxx'
	filterRouteEnd[0].children = [...filterRouteEnd[0].children, ...notFoundAndNoPower];
  filterRouteEnd.forEach((element:any) => {
    
    if(element.path.startsWith('http')){
      element.path='/home'
    }
  });
	return filterRouteEnd;
}



export async function setAddRoute() {
	const res=await setFilterRouteEnd()
  console.log(res)
  res.forEach((route: RouteRecordRaw) => {

		router.addRoute(route);
	});
}


export async function initBackEndControlRoutes() {
  const res = await getBackEndControlRoutes();
  // 无登录权限时，添加判断
  if ((res.data || []).length <= 0) return Promise.resolve(true);
  //存储接口原始路由
  useRequestOldRoutes().setRequestOldRoutes(res.data)

  //处理路由
  baseRoutes[0].children=[...dynamicRoutes,...(await backEndComponent(res.data))]
  // 添加动态路由
	await setAddRoute();

  

}
