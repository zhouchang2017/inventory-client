'use strict'

import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (store.getters.token) {
      // 每次请求携带token
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    // TODO 拦截token过期，刷新token

    return response
  },
  function (error) {
    // Do something with response error
    const {status} = error.response

    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })

    if (status === 401) {
      removeToken()
    }

    return Promise.reject(error)
  }
)

Plugin.install = function (Vue) {
  Vue.axios = _axios
  window.axios = _axios
  // Object.defineProperties(Vue.prototype, {
  //   axios: {
  //     get () {
  //       return _axios
  //     }
  //   },
  //   $axios: {
  //     get () {
  //       return _axios
  //     }
  //   },
  // })
}

Vue.use(Plugin)
export const http = _axios
export default Plugin
