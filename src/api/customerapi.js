import request from '../utils/request'
import Vue from 'vue'
import store from '@/store'

/**
 * 获取客户分页列表
 * @param username
 * @param password
 */
export function queryCustomerPager(params) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/customer/pager',
    method: 'get',
    params:params
  })
}
/**
 * 查看客户详情
 * @param username
 * @param password
 */
export function findCustomerById(params) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/customer/findById',
    method: 'get',
    params:params
  })
}
/**
 * 新增客户
 * @param username
 * @param password
 */
export function addCustomer(saveData) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/customer',
    method: 'post',
    data:saveData
  })
}

/**
 * 编辑客户
 * @param username
 * @param password
 */
export function editCustomer(saveData) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/customer',
    method: 'put',
    data:saveData
  })
}

/**
 * 删除客户
 * @param username
 * @param password
 */
export function deleteCustomer(params) {
  return request({
    url: Vue.prototype.$baseUrl+`api/v1.0/sys/customer/${params.id}`,
    method: 'delete',
  })
}

/**
 * 校验字段
 * @param username
 * @param password
 */
export function check(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/customer/check',
    method: 'get',
    params:queryParams
  })
}

/**
 * 充值
 * @param username
 * @param password
 */
export function recharge(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/customer/recharge',
    method: 'post',
    data:queryParams
  })
}

