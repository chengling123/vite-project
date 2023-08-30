import request from '@/utils/request';


export function useMenuApi() {
	return {
		getAdminMenu: (params?: object) => {
			return request({
				url: '/api/admin/menu',
				method: 'get',
				params,
			});
		},
	};
}
