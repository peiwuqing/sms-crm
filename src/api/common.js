import request from '../utils/request'
import Vue from 'vue'
import store from '@/store'


/**
 * 上传
 */
export function upload(param){
  return request({
    url: Vue.prototype.$baseUrl+`api/v1.0/common/upload`,
    method: 'post',
    data:param,
  })
}

