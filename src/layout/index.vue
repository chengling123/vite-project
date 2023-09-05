<script setup lang='ts'>
import { defineAsyncComponent, onBeforeMount, onUnmounted } from 'vue';
import { useThemeConfig } from '@/stores/themeConfig';
import { storeToRefs } from 'pinia';
import { local } from '@/utils/storage'
import mittBus from '@/utils/mitt';

// 引入组件
const layouts: any = {
    defaults: defineAsyncComponent(() => import('@/layout/main/defaults.vue')),
    classic: defineAsyncComponent(() => import('@/layout/main/classic.vue')),
};

// 定义变量内容
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

// 窗口大小改变时(适配移动端)
const onLayoutResize = () => {
    if (!local.get('oldLayout')) local.set('oldLayout', themeConfig.value.layout)
    const clientWidth = document.body.clientWidth;
    if (clientWidth < 1000) {
        themeConfig.value.isCollapse = false
        mittBus.emit('layoutMobileResize', {
            layout: 'defaults',
            clientWidth
        })
    }else{
        mittBus.emit('layoutMobileResize',{
            layout: local.get('oldLayout') ? local.get('oldLayout') : themeConfig.value.layout,
			clientWidth, 
        })
    }


}

// 页面加载前
onBeforeMount(() => {
    onLayoutResize();
    window.addEventListener('resize', onLayoutResize);
});
// 页面卸载时
onUnmounted(() => {
    window.removeEventListener('resize', onLayoutResize);
});


</script>

<template>
    <div>
        <component :is="layouts[themeConfig.layout]" />
    </div>
</template>

<style lang='less' scoped>
</style>
