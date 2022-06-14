import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getUserData } from '@/utils/auth'
import config from  '../config'
// create an axios instance
const service = axios.create({
  baseURL: config[config.profile].apiUrl, // api 的 base_url
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // Do something before request is sent
    if (config.method == 'get') {
      config.data = true
    }
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
    const res = response.data
    if (res.code != 0) {

      Message({
        message: res.message,
        type: 'error',
        duration: 1 * 1000
      })

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {

    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
