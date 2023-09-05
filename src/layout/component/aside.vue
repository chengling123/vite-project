<script setup lang='ts'>
// import { useI18n } from 'vue-i18n';
import {storeToRefs} from 'pinia'
import {reactive,computed,defineAsyncComponent, onBeforeMount} from 'vue'
import { useRoutesList } from '@/stores/routesList';
import { useThemeConfig } from '@/stores/themeConfig';
import { useTagsViewRoutes } from '@/stores/tagsViewRoutes';


// 引入组件
const Logo = defineAsyncComponent(() => import('@/layout/logo/index.vue'));
const Vertical = defineAsyncComponent(() => import('@/layout/navMenu/vertical.vue'));



// 定义变量内容
const storesThemeConfig = useThemeConfig();
const storesTagsViewRoutes = useTagsViewRoutes();
const storesRoutesList = useRoutesList();
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
const { themeConfig } = storeToRefs(storesThemeConfig);
const { routesList } = storeToRefs(storesRoutesList);
const state = reactive<AsideState>({
	menuList: [],
	clientWidth: 0,
});

// 关闭移动端蒙版
const closeLayoutAsideMobileMode = () => {
	const el = document.querySelector('.layout-aside-mobile-mode');
	el?.setAttribute('style', 'animation: error-img-two 0.3s');
	setTimeout(() => {
		el?.parentNode?.removeChild(el);
	}, 300);
	const clientWidth = document.body.clientWidth;
	if (clientWidth < 1000) themeConfig.value.isCollapse = false;
	document.body.setAttribute('class', '');
};


//设置菜单展开收起时的宽度
const setCollapseStyle=computed(()=>{
  const { layout, isCollapse, menuBar } = themeConfig.value;
	console.log('isCollapse',isCollapse)
  const asideBrTheme = ['#FFFFFF', '#FFF', '#fff', '#ffffff'];
	const asideBrColor = asideBrTheme.includes(menuBar) ? 'layout-el-aside-br-color' : '';
	// 判断是否是手机端
  if (state.clientWidth <= 1000) {
		if (isCollapse) {
      document.body.setAttribute('class', 'el-popup-parent--hidden');
			const asideEle = document.querySelector('.layout-container') as HTMLElement;
			const modeDivs = document.createElement('div');
			modeDivs.setAttribute('class', 'layout-aside-mobile-mode');
			asideEle.appendChild(modeDivs);
			modeDivs.addEventListener('click', closeLayoutAsideMobileMode);
			return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-open'];
    }else {
			// 关闭弹窗
			closeLayoutAsideMobileMode();
			return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-close'];
		}
  }else {
		return [
			asideBrColor,
			layout === 'columns'
				? isCollapse
					? 'layout-aside-pc-1'
					: null
					? 'layout-aside-pc-250'
					: 'layout-aside-pc-220'
				: isCollapse
				? 'layout-aside-pc-64'
				: null
				? 'layout-aside-pc-250'
				: 'layout-aside-pc-220',
		];
	}
})

//设置过滤路由
const setFilterRoutes=()=>{
	if(themeConfig.value.layout === 'columns') return false
	state.menuList=filterRoutesFun(routesList.value)
}

//路由过滤递归函数
const filterRoutesFun =<T extends RouteItem> (arr:T[]) :T[]=>{
	console.log(arr)
	return arr.filter(item=>!item.meta?.isHide)
}

onBeforeMount(()=>{
	setFilterRoutes()
})
</script>

<template>
    <div class="h100" v-show="!isTagsViewCurrenFull">
		<el-aside class="layout-aside" :class="setCollapseStyle">
			<Logo />
			<el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef" >
				<Vertical :menuList="state.menuList" />
			</el-scrollbar>
		</el-aside>
    </div>
</template>

<style lang='less' scoped>

</style>
