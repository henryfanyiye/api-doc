import axios from 'axios';
import { Message } from 'element-ui';
import { nanoid } from 'nanoid';
import { getToken } from '@/utils/auth';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || DocConfig.server, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    const token = getToken();
    // do something before request is sent
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['x-transaction-id'] = nanoid();
    return config;
  },
  error => {
    // do something with request error
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    // 401
    if (error.response.status === 401) {
      store.dispatch('user/resetToken').then(() => {
        location.reload();
      });
    }
    return Promise.reject(error);
  },
);

export default service;
