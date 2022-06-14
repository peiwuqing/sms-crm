import request from '../utils/request'
import Vue from 'vue'
import store from '@/store'

/**
 * 获取通道分页列表
 * @param username
 * @param password
 */
export function queryTemplatePager(params) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/template/pager',
    method: 'get',
    params:params
  })
}
/**
 * 审核模板
 */
export function audit(saveData) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/template/audit',
    method: 'post',
    data:saveData
  })
}


/**
 * 删除模板
 * @param username
 * @param password
 */
export function deleteTemplate(params) {
  return request({
    url: Vue.prototype.$baseUrl+`api/v1.0/template/${params.id}`,
    method: 'delete',
  })
}

