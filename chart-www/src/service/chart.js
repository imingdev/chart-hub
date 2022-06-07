import http from '@/common/fetch';

const baseUrl = `${process.env.API_URL}/chart`;

// 列表
export const list = (params) => http.get(`${baseUrl}/list`, { params });
// 详情
export const detailById = (id) => http.get(`${baseUrl}/detail/${id}`);
