<script setup lang='ts'>
import {ref,reactive,computed, unref, onMounted} from 'vue'
const searchName = ref(); // 查询关键字
const isExpand = ref(true); // 是否展开所有节点

const props = defineProps({
	/**
	 * 树结构属性配置。
	 *
	 * @default { label: 'name', children: 'children', value: 'id' }
	 */
	props: {
		type: Object,
		default: () => {
			return {
				label: 'name',
				children: 'children',
				value: 'id',
			};
		},
	},

	/**
	 * 输入框占位符。
	 *
	 * @default ''
	 */
	placeholder: {
		type: String,
		default: '',
	},

	/**
	 * 是否显示加载中状态。
	 *
	 * @default false
	 */
	loading: {
		type: Boolean,
		default: false,
	},

	/**
	 * 查询函数，必须返回 Promise 类型数据。
	 */
	query: {
		type: Function,
		required: true,
	},

	/**
	 * 是否显示折叠控制
	 */
	showExpand: {
		type: Boolean,
		default: false,
	},
});

const state = reactive({
	List: [], // 树形结构列表数据
	localLoading: props.loading, // 是否加载中
});

const buttonClass = computed(() => {
	return ['!h-[20px]', 'reset-margin', '!text-gray-500', 'dark:!text-white', 'dark:hover:!text-primary'];
});

/**
 * 获取部门树
 */

const getdeptTree = () => {
	state.localLoading = true;
	const result=props.query(unref(searchName))
	result.then((res:any) => {
		console.log(res)
	})

}


onMounted(()=>{
	getdeptTree();
})
</script>

<template>
  <div class="head-container">
    <div class="head-container-header">
      <div class="head-container-header-input">
        <el-input v-model="searchName" suffix-icon="search" :placeholder="placeholder" clearable @change="getdeptTree" />
      </div>
      <div class="head-container-header-dropdown" v-if="showExpand">
        <el-dropdown :hide-on-click="false">
          <el-icon style="transform: rotate(90deg)">
            <MoreFilled />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button :class="buttonClass" link type="primary" :icon="isExpand ? 'expand' : 'fold'">
                  {{ isExpand ? '折叠' : '展开' }}
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style  scoped>
</style>
