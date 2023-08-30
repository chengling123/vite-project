<script setup lang="ts">
import { onMounted } from 'vue'
import { Session } from './utils/storage';
// // 部门树使用的数据
// const deptData = reactive({
// 	queryList: (name: String) => {
// 		return deptTree({
// 			deptName: name,
// 		});
// 	},
// });
// // const dicDialogRef = ref();
// const dictItemDialogRef = ref();
// // 点击树
// const handleNodeClick = (data: any) => {
//   dictItemDialogRef.value.open(data);
// };
// // 删除操作
// const handleDelete = async (ids: string[]) => {
//   console.log(ids)
// };
onMounted(()=>{
  Session.set('token',JSON.parse(window.sessionStorage.getItem('token') as string) )
})
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>
