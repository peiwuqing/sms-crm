import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import qs from "qs"
// import { Loading } from 'element-ui';
let base_url;
// create an axios instance
const service = axios.create({
  baseURL: Vue.prototype.$baseUrl , // api 的 base_url
  // baseURL:"/api",
  timeout: 60000, // request timeout
  withCredentials:false,
  responseType:"json",
  responseEncoding:"utf-8",
  transformResponse: [function (data) {
  }]
})
axios.defaults.withCredentials = false;
// const loadingOptions = {
//   lock: true,
//   text: 'Loading',
//   spinner: 'el-icon-loading',
//   background: 'rgba(0, 0, 0, 0.7)'
// }
let loadingInstance = null;
// request interceptor
service.interceptors.request.use(
  config => {
    // loadingInstance = Loading.service(loadingOptions);
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = getToken()
    }
    if (config.method === 'get') {
      config.data = true
    }
    // if(config.data){
    //   config.data = qs.stringify(config.data)
    // }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */


  response => {
    let res ;
    // loadingInstance.close();
    if (response.data == undefined) {
      res =response.request.response
    } else {
      res = response.data
    }
    if (res &&  res.status == 1) {
      Message({
        message: res.message,
        type: 'error',
        duration: 1 * 1000
      })
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
      return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    if(error.response.status == 401){
      // Message({
      //   message: "登录过期，请重新登录",
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
      return Promise.reject('error')
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
