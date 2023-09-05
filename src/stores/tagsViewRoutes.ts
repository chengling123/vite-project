import { defineStore } from 'pinia';
import { Session } from '@/utils/storage';


export const useTagsViewRoutes=defineStore('tagsViewRoutes',{
  state:():TagsViewRoutesState=>({
    tagsViewRoutes: [],
		isTagsViewCurrenFull: false,
		favoriteRoutes: [],
  }),
  actions:{
    async setTagsViewRoutes(data: Array<string>) {
			this.tagsViewRoutes = data;
		},
    setCurrenFullscreen(bool: Boolean) {
			Session.set('isTagsViewCurrenFull', bool);
			this.isTagsViewCurrenFull = bool;
		},
  },
  // persist:{
  //   //开启后，默认对整个store的state内容进行存储
  //   enabled:true,
  //   strategies: [
	// 		{
	// 			key: 'tagsViewRoutes', 
	// 			storage: localStorage, //储存方式不指定的话默认储存sessionStorage中
  //       // paths:state中的字段名，按组打包存储
	// 		},
	// 	],
  // }
  

})
