
import request from '@/utils/request'

export const deptTree = (params?: Object) => {
	return request({
		url: '/admin/dept/tree',
		method: 'get',
		params,
	});
};
