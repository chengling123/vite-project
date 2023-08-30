import { useMenuApi } from '@/api/admin/menu';
import { useRequestOldRoutes } from '@/stores/requestOldRoutes';
// 引入 api 请求接口
const menuApi = useMenuApi();

/**
 * 请求后端路由菜单接口
 */
export function getBackEndControlRoutes(){
  return menuApi.getAdminMenu()
}

export async function initBackEndControlRoutes() {
  const res = await getBackEndControlRoutes();
  console.log(res)
  // 无登录权限时，添加判断
  if ((res.data || []).length <= 0) return Promise.resolve(true);
  //存储接口原始路由
  useRequestOldRoutes().setRequestOldRoutes(res.data)
  

}
