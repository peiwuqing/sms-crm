import request from '../utils/request'
import Vue from 'vue'

/**
 * 获取通道分页列表
 * @param username
 * @param password
 */
export function queryChannelPager(params) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/channel/pager',
    method: 'get',
    params:params
  })
}
/**
 * 新增通道
 * @param username
 * @param password
 */
export function addChannel(saveData) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/channel',
    method: 'post',
    data:saveData
  })
}

/**
 * 更新通道
 * @param username
 * @param password
 */
export function editChannel(saveData) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/channel',
    method: 'put',
    data:saveData
  })
}

/**
 * 删除通道
 * @param username
 * @param password
 */
export function deleteChannel(params) {
  return request({
    url: Vue.prototype.$baseUrl+`api/v1.0/sys/channel/${params.id}`,
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
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/channel/check',
    method: 'get',
    params:queryParams
  })
}

