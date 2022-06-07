/**
 * 判断是否是object对象
 * @param obj
 * @returns {boolean}
 */
export const isObject = (obj) => !!obj && Object.prototype.toString.call(obj) === '[object Object]';
/**
 * 判断是否是数组
 * @param array
 * @returns {boolean}
 */
export const isArray = (array) => !!array && Object.prototype.toString.call(array) === '[object Array]';

/**
 * 判断是否是 Promise
 * @param promise
 * @returns {boolean}
 */
export const isPromise = (promise) => !!promise && Object.prototype.toString.call(promise) === '[object Promise]';

/**
 * 判断是否是 FormData
 * @param formData
 * @returns {boolean}
 */
export const isFormData = (formData) => !!formData && Object.prototype.toString.call(formData) === '[object FormData]';

/**
 * 判断字符串是否是base64
 * @param str base64字符串
 * @returns {boolean}
 */
export const isBase64Str = (str) => !!str && /^data:(.*?)\/(.*?);base64,/.test(str);

/**
 * 验证邮箱是否正确
 * @param email
 * @return {boolean}
 */
export const isEmail = (email) => !!email && /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(email);

/**
 * 判断接口返回的code是否正确
 * @param code  接口返回的code
 * @returns {boolean}
 */
export const judgeCode = (code) => /^200$/.test(code);
