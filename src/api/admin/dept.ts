
import request from '@/utils/request'

export const deptTree = (params?: Object) => {
	return request({
		url: '/api/admin/dept/tree',
		method: 'get',
		params,
	});
};
