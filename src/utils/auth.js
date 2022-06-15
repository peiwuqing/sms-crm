import Cookies from 'js-cookie'

const TokenKey = 'token'
const UserData = '__SMS__CRM__USERDATA__'
import { constantRouterMap } from '@/router'

var publicRoter=["/dashboard"]
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserData() {
  if(localStorage.getItem(UserData))
  return JSON.parse(localStorage.getItem(UserData))
}
export function getButtons() {
  let userData = JSON.parse(localStorage.getItem(UserData))
  let btns = []
  if(userData && userData.permissions){
    let btn = userData.permissions.filter(e=>e.type == 'BUTTON')
    btns = btn.map(e=>e.code)
  }
  return btns
}
export function hasPermission(code){
  let btn = getButtons()
  return btn && btn.indexOf(code)!=-1
}
export function setUserData(data) {
  return localStorage.setItem(UserData, JSON.stringify(data))
}
export function removeUserData() {
  return localStorage.removeItem(UserData)
}
export function getRoles( roles ){
  let arrs = new Array()
  if(roles!=null &&  roles.length>0){
    roles.forEach( e =>{
      arrs.push(e)
      if(e.children && e.children.length>0){
        arrs = arrs.concat(getRoles(e.children));
      }
    })
  }
  return arrs
}
export function getChilds(arrs){
    let arr = new Array();
    arrs.forEach(e => {
      if(e.type == 'MENU') {
        if (e.parentId == null || e.parentId == '') {
          arr.push(e)
        }
      }
    })
    if(arr.length>0){
      arr.forEach(e =>{
         e.children = getChild(e.id,arrs)
      })
    }
    return arr
}

export function getChild(args,rootMenu){
  let arr = new Array();
  rootMenu.forEach(e =>{
    if(e.type == 'MENU'){
      if(e.parentId && e.parentId == args){
        arr.push(e)
      }
    }

  })
  arr.forEach(e=>{
     e.children = getChild(e.id,rootMenu)
  })
  if(arr.length == 0){
    return null;
  }
  return arr;
}

export function isPermission(roles,path){
    let isPermission = false;
    let accessPath = path.path.trim();
    if(publicRoter.indexOf(accessPath) != -1){
      return true;
    }
    constantRouterMap.forEach(e=>{
      if(e.path.trim() == accessPath){
        isPermission = true;
      }
    })
    if(isPermission) return isPermission
    roles.forEach(e=>{
      if(e.url == accessPath){
        isPermission = true;
      }
    })
    return isPermission
}
