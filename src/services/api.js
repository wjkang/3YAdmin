import request from '@/utils/request'
import qs from 'qs'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/auth/login',
    method: 'post',
    data: qs.stringify(data),
    loading: 'spin'
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post',
    loading: "spin"
  })
}

export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get',
    loading: "spin"
  })
}

//user
export function getUserList() {
  return request({
    url: '/user/userlist',
    method: 'get'
  })
}
export function getUserPagedList(query) {
  return request({
    url: '/user/pagedlist',
    method: 'get',
    params: query
  })
}

export function delUser(id) {
  return request({
    url: '/user/del',
    method: 'delete',
    params: id,
    loading: "hourglass"
  })
}

export function delUsers(ids) {
  return request({
    url: '/user/batchdel',
    method: 'delete',
    params: ids,
    loading: "hourglass"
  })
}

export function saveUser(data) {
  return request({
    url: '/user/save',
    method: 'post',
    data: data,
    loading: "hourglass"
  })
}

export function editRoleUser(data) {
  return request({
    url: '/user/editroleuser',
    method: 'post',
    data: data,
    loading: "hourglass"
  })
}

//menu
export function getAccessMemu() {
  return request({
    url: '/menu/getaccessmenu',
    method: 'get',
    loading: "spin"
  })
}

export function getAllMenu() {
  return request({
    url: '/menu',
    method: 'get',
    loading: "spin"
  })
}

export function saveMenu(menu) {
  return request({
    url: '/menu/savemenu',
    method: 'post',
    data: menu,
    loading: "hourglass",
    permission: ["menu_edit"]
  })
}

export function getMenuFunctions(menuId) {
  return request({
    url: '/menu/menufunctions',
    method: 'get',
    params: menuId,
    loading: "spin"
  })
}

export function getIcons() {
  return request({
    url: '/icons',
    method: 'get',
    loading: "spin"
  })
}

//function
export function getMenuListFunctionCode() {
  return request({
    url: '/function/menulistfunctioncode',
    method: 'get',
    loading: "spin"
  })
}

export function getFunctionPagedList(query) {
  return request({
    url: '/function/pagedlist',
    method: 'get',
    params: query
  })
}

export function delFunction(id) {
  return request({
    url: '/function/del',
    method: 'delete',
    params: id,
    loading: "hourglass"
  })
}

export function delFunctions(ids) {
  return request({
    url: '/function/batchdel',
    method: 'delete',
    params: ids,
    loading: "hourglass"
  })
}

export function saveFunction(data) {
  return request({
    url: '/function/save',
    method: 'post',
    data: data,
    loading: 'hourglass'
  })
}

//role
export function getRolePagedList(query) {
  return request({
    url: '/role/pagedlist',
    method: 'get',
    params: query
  })
}

export function delRole(id) {
  return request({
    url: '/role/del',
    method: 'delete',
    params: id,
    loading: "hourglass"
  })
}

export function delRoles(ids) {
  return request({
    url: '/role/batchdel',
    method: 'delete',
    params: ids,
    loading: "hourglass"
  })
}

export function saveRole(data) {
  return request({
    url: '/role/save',
    method: 'post',
    data: data,
    loading: "hourglass"
  })
}

export function savePermission(data) {
  return request({
    url: '/role/savepermission',
    method: 'post',
    data: data,
    loading: "hourglass"
  })
}

//resetDb
export function resetDb() {
  return request({
    url: '/resetdb',
    method: 'post',
    loading: "hourglass"
  })
}

//requestlog
export function getRequestLogPagedList(query) {
  return request({
    url: '/requestlog/pagedlist',
    method: 'get',
    params: query
  })
}

//post
export function getPostPagedList(query) {
  return request({
    url: '/post/pagedlist',
    method: 'get',
    params: query
  })
}

export function getPost(id) {
  return request({
    url: '/post/' + id,
    method: 'get',
    loading: "hourglass"
  })
}

export function savePost(post) {
  return request({
    url: '/post/save',
    method: 'post',
    data: post,
    loading: "hourglass"
  })
}

export function getTopPostByQuery(query) {
  return request({
    url: '/post/top',
    method: 'get',
    params: query,
    loading: "spin"
  })
}
