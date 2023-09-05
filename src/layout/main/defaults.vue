<script setup lang='ts'>
import { defineAsyncComponent } from 'vue';
// 引入组件
const LayoutAside = defineAsyncComponent(() => import('@/layout/component/aside.vue'));
</script>

<template>
    <div>
        <el-container class="layout-container">
            <LayoutAside />
            <router-view></router-view>
        </el-container>
    </div>
</template>

<style lang='less' scoped>
</style>
