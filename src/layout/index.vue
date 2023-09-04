<script setup lang='ts'>
import {defineAsyncComponent } from 'vue';
import { useThemeConfig } from '@/stores/themeConfig';
import { storeToRefs } from 'pinia';
// 引入组件
const layouts: any = {
	defaults: defineAsyncComponent(() => import('@/layout/main/defaults.vue')),
};

// 定义变量内容
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
</script>

<template>
    <div>
        <component :is="layouts[themeConfig.layout]" />
    </div>
</template>

<style lang='less' scoped>

</style>
