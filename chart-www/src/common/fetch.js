/**
 * @intro: http统一封装,同时支持callback模式调用.
 */
import axios from 'axios';
import { isFormData, judgeCode } from './verify';

const service = axios.create({
  // 设置全局默认的headers
  headers: {
    'Content-Type': 'application/json',
  },
  // 设置请求超时设置
  timeout: 30000,
  responseType: 'json',
  // 请求转换
  transformRequest: [
    (data, headers) => {
      // eslint-disable-next-line no-param-reassign
      headers['client-type'] = 'web';

      if (isFormData(data)) {
        // eslint-disable-next-line no-param-reassign
        headers['Content-Type'] = 'multipart/form-data';
        return data;
      }

      try {
        return JSON.stringify(data);
      } catch (e) {
        return data;
      }
    },
  ],
});

// response拦截
service.interceptors.response.use(
  (response) => {
    const { data = {} } = response;

    // 请求成功
    if (judgeCode(data.code)) return data;

    // eslint-disable-next-line
    return Promise.reject({
      ...data,
      type: 'business',
    });
  },
  (err) => {
    const resError = err.response || {};

    // eslint-disable-next-line
    return Promise.reject({
      code: resError.status || '500',
      msg: err.message || 'System Busy!',
      type: 'system',
    });
  },
);

export default service;
