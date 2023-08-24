<script setup lang="ts">
import { reactive, ref } from 'vue'
import { deptTree } from '@/api/admin/dept'
import QueryTree from './components/QueryTree/index.vue'
// 部门树使用的数据
const deptData = reactive({
	queryList: (name: String) => {
		return deptTree({
			deptName: name,
		});
	},
});
// const dicDialogRef = ref();
const dictItemDialogRef = ref();
// 点击树
const handleNodeClick = (data: any) => {
  dictItemDialogRef.value.open(data);
};
// 删除操作
const handleDelete = async (ids: string[]) => {
  console.log(ids)
};
</script>

<template>
  <div>
    <query-tree ref="dictTreeRef" :query="deptData.queryList" :show-expand="true" @node-click="handleNodeClick" placeholder="请输入字典项或名称">
      <template #default="{ data }">
        <span class="custom-tree-node">
          <span class="label">{{ data.description }}</span>
          <span class="code">{{ data.dictType }}</span>
          <span class="do">
            <el-button-group>
              <el-button icon="el-icon-edit" size="small"></el-button>
              <el-tooltip content="sysdict.deleteDisabledTip" :disabled="data.systemFlag === '0'" placement="top">
                <span style="margin-left: 12px">
                  <el-button :disabled="data.systemFlag !== '0'" icon="el-icon-delete" size="small"
                    @click.stop="handleDelete([data.id])"></el-button>
                </span>
              </el-tooltip>
            </el-button-group>
          </span>
        </span>
      </template>
    </query-tree>
  </div>
</template>

<style scoped>
</style>
