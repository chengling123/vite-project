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

// 布局配置
declare interface ThemeConfigState {
	themeConfig: {
		isDrawer: boolean;
		primary: string;
		topBar: string;
		topBarColor: string;
		isTopBarColorGradual: boolean;
		menuBar: string;
		menuBarColor: string;
		menuBarActiveColor: string;
		isMenuBarColorGradual: boolean;
		columnsMenuBar: string;
		columnsMenuBarColor: string;
		isColumnsMenuBarColorGradual: boolean;
		isColumnsMenuHoverPreload: boolean;
		isCollapse: boolean;
		isUniqueOpened: boolean;
		isFixedHeader: boolean;
		isFixedHeaderChange: boolean;
		isClassicSplitMenu: boolean;
		isLockScreen: boolean;
		lockScreenTime: number;
		isShowLogo: boolean;
		isShowLogoChange: boolean;
		isBreadcrumb: boolean;
		isTagsview: boolean;
		isBreadcrumbIcon: boolean;
		isTagsviewIcon: boolean;
		isCacheTagsView: boolean;
		isSortableTagsView: boolean;
		isShareTagsView: boolean;
		isFooter: boolean;
		isGrayscale: boolean;
		isInvert: boolean;
		isIsDark: boolean;
		isWartermark: boolean;
		wartermarkText: string;
		tagsStyle: string;
		animation: string;
		columnsAsideStyle: string;
		columnsAsideLayout: string;
		layout: string;
		isRequestRoutes: boolean;
		globalTitle: string;
		globalViceTitle: string;
		globalViceTitleMsg: string;
		globalI18n: string;
		globalComponentSize: string;
		footerAuthor: string;
	};
}


// TagsView 路由列表
declare interface TagsViewRoutesState<T = any> {
	tagsViewRoutes: T[];
	isTagsViewCurrenFull: Boolean;
	favoriteRoutes: T[];
}
