// 后端返回原始路由(未处理时)
interface IuseRequestOldRoutes{
	requestOldRoutes: Array<string>;
	name:string
}

// 路由列表
declare interface RoutesListState<T = any> {
	routesList: T[];
	isColumnsMenuHover: Boolean;
	isColumnsNavHover: Boolean;
}

// 路由缓存列表
declare interface KeepAliveNamesState {
	keepAliveNames: string[];
	cachedViews: string[];
}
