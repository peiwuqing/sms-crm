import request from '../utils/request'
import Vue from 'vue'

/**
 * 所有菜单
 * @param username
 * @param password
 */
export function queryAllMenu() {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/resource/tree',
    method: 'get'
  })
}
/**
 * 新增菜单
 * @param username
 * @param password
 */
export function addMenu(saveData) {
  return request({
    url: Vue.prototype.$baseUrl+'/api/v1.0/sys/resource',
    method: 'post',
    data:saveData
  })
}

/**
 * 更新菜单
 * @param username
 * @param password
 */
export function editMenu(saveData) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/resource',
    method: 'put',
    data:saveData
  })
}

/**
 * 删除菜单
 * @param username
 * @param password
 */
export function deleteMenu(saveData) {
  return request({
    url: Vue.prototype.$baseUrl+`api/v1.0/sys/resource/${saveData}`,
    method: 'delete',
  })
}

/**
 * 查询角色列表
 * @param username
 * @param password
 */
export function queryRoles(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/role/pager',
    method: 'get',
    params:queryParams
  })
}
/**
 * 新增角色
 * @param username
 * @param password
 */
export function addRole(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/role',
    method: 'post',
    data:queryParams
  })
}
/**
 * 获取单个角色
 * @param username
 * @param password
 */
export function queryRoleById(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+`api/v1.0/sys/role/${queryParams}`,
    method: 'get',
  })
}
/**
 * 编辑角色
 * @param username
 * @param password
 */
export function editRole(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+"api/v1.0/sys/role",
    method: 'put',
    data:queryParams
  })
}

/**
 * 删除角色
 * @param username
 * @param password
 */
export function deleteRole(id) {
  return request({
    url: Vue.prototype.$baseUrl+`api/v1.0/sys/role/${id}`,
    method: 'delete',
  })
}

/**
 * 所有部门
 */
export function queryAllOrgan() {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/organ/tree',
    method: 'get'
  })
}

/**
 * 查询详情
 */
export function queryOrganDetail(param) {
  return request({
    url: Vue.prototype.$baseUrl+`api/v1.0/sys/organ/${param.id}`,
    method: 'get'
  })
}



/**
 * 新增菜单
 */
export function addOrgan(saveData) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/organ',
    method: 'post',
    data:saveData
  })
}

/**
 * 更新菜单
 */
export function editOrgan(saveData) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/organ',
    method: 'put',
    data:saveData
  })
}

/**
 * 删除菜单
 */
export function deleteOrgan(saveData) {
  return request({
    url: Vue.prototype.$baseUrl+`api/v1.0/sys/organ/${saveData}`,
    method: 'delete',
  })
}

/**
 * 获取用户列表
 * @param username
 * @param password
 */
export function queryUsers(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/user/pager',
    method: 'get',
    params:queryParams
  })
}
/**
 * 获取全部用户
 * @param username
 * @param password
 */
export function queryAllUsers(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/user/list',
    method: 'get',
    params:queryParams
  })
}
/**
 * 校验用户名
 * @param username
 * @param password
 */
export function checkUserName(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/user/check/username',
    method: 'get',
    params:queryParams
  })
}
/**
 * 校验工号
 * @param username
 * @param password
 */
export function checkStaffNo(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/user/check/staffno',
    method: 'get',
    params:queryParams
  })
}
/**
 * 添加用户
 */
export function addUser(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/user',
    method: 'post',
    data:queryParams
  })
}
/**
 * 删除用户
 */
export function deleteUser(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+`api/v1.0/sys/user/${queryParams}`,
    method: 'delete',
  })
}
/**
 * 更新用户
 */
export function editUser(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+'api/v1.0/sys/user',
    method: 'put',
    data:queryParams
  })
}
/**
 * 获取单个用户
 */
export function queryUserById(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+`api/v1.0/sys/user/${queryParams}`,
    method: 'get',
    data:queryParams
  })
}




/**
 * 查询权限下的列表
 * @param username
 * @param password
 */
export function authList(params) {
  return request({
    url: Vue.prototype.$baseUrl+'sys/perm/list',
    method: 'post',
    data:params
  })
}
/**
 * 查询权限下的列表
 * @param username
 * @param password
 */
export function listAuth(params) {
  return request({
    url: Vue.prototype.$baseUrl+'sys/role/getUserByRole',
    method: 'post',
    data:params
  })
}

/**
 * 获取用户
 */
export function queryUser(params) {
  return request({
    url: Vue.prototype.$baseUrl + 'sys/user/list',
    method: 'post',
    data: params
  })
}
/**
 * 编辑菜单
 * @param username
 * @param password
 */
export function editResource(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+'auth/api/v1.0/auth/editResource/'+queryParams.id,
    method: 'put',
    headers:{
      'device':'OSS'
    },
    data:queryParams
  })
}

/**
 * 删除菜单
 * @param username
 * @param password
 */
export function distoryResource(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+'auth/api/v1.0/auth/distoryResource/'+queryParams,
    method: 'delete',
    headers:{
      'device':'OSS'
    },
    data:{}
  })
}

/**
 * 查询角色列表
 * @param username
 * @param password
 */
export function queryAllRoles() {
  return request({
    url: Vue.prototype.$baseUrl+'auth/api/v1.0/auth/queryAllRoles',
    method: 'get',
    headers:{
      'device':'OSS'
    },
    params:{}
  })
}


/**
 * 获取地址
 */
export function queryRegin(queryParams) {
  return request({
    url: Vue.prototype.$baseUrl+'auth/api/v1.0/auth/queryRegion',
    method: 'get',
    params:queryParams
  })

}

export function resetPwd(param){
  return request({
    url: Vue.prototype.$baseUrl+`api/v1.0/auth/updatePwd`,
    method: 'post',
    data:param,
  })
}

