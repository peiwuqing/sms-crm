import { getToken, setToken, removeToken ,getUserData,getButtons,setUserData,removeUserData,getRoles,getChilds} from '@/utils/auth'
import { Message } from 'element-ui'
import request from "../../../utils/request";
import Vue from 'vue'

const user = {
  state: {
    user: '',
    token: getToken(),
    name: '',
    roles:'',
    avatar: '',
    userData:getUserData(),
    buttons:getButtons(),
    menus:[],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_USERDATA: (state, data) => {
      state.userData = data
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_BUTTONS: (state, buttons) => {
      state.buttons = buttons
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const username = userInfo.username.trim()
        request({
          url: Vue.prototype.$baseUrl+'api/v1.0/auth/grantToken',
          method: 'post',
          headers:{
          },
          data:{
            username:username,
            password:userInfo.password
          }
        }).then(resp =>{
          if(!resp || resp.code == -1){
            Message({
              message: resp.message,
              type: 'error',
              duration: 3000
            })
            return false;
          }
          let token = resp.data.access_token
          request({
            url: Vue.prototype.$baseUrl+'api/v1.0/auth/userInfo',
            method: 'get',
            headers:{
              Authorization:token
            },
          }).then(resp =>{
            if(!resp || !resp.status == 0){
              Message({
                message: resp.msg,
                type: 'error',
                duration: 3000
              })
              return false;
            }
            const data = resp.data||{}
            data.token = token;
            commit('SET_TOKEN', token)
            setToken(data.token)
            commit('SET_USERDATA', data)
            setUserData(data);
            commit('SET_BUTTONS',getButtons(data))
            resolve(data);
          });
        }).catch(error=>{
          reject(error)
        });

    });

    },
    // 重新保存头像
    setUserPhoto({ commit }, photo) {
      let data = getUserData();
      commit('SET_TOKEN', data.token)
      commit('SET_USERDATA', data)
      commit('SET_AVATAR', photo.photo)
      data.photo = photo.fileId
      setUserData(data);
    },
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      const data = state.userData
      return new Promise((resolve, reject) => {
        commit('SET_ROLES',data.permissions)
        commit('SET_MENUS', getChilds(data.permissions));
        commit('SET_NAME', data.realName)
        commit('SET_AVATAR', null)
        resolve(data.permissions)
      }).catch((e)=>{
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        const data = state.userData
        request({
          url:  Vue.prototype.$baseUrl+'api/v1.0/auth/logout',
          method: 'post',
          headers:{
            'Authorization':data.token
          },
          data:{
              "token":data.token
          }
        }).then(resp =>{
          if(!resp || !resp.data.status == 0){
            Message({
              message: resp.data.message,
              type: 'error',
              duration: 3000
            })
            return false;
          }
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeUserData()
          resolve()
        }).catch(error=>{
          reject(error)
        });
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeUserData()
        resolve()
      })
    },
  }
}

export default user
