import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken,isPermission } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const roles = res // note: roles must be a array! such as: ['editor','develop']
          if(!(roles && roles.length >0)){
            Message.error("对不起，当前用户没有权限")
            store.dispatch('FedLogOut').then(() => {
              router.replace(`/login?redirect=${to.path}`)
              NProgress.done()
            })
          }
          store.dispatch('GenerateRoutes', {roles}).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            if(!isPermission(roles,to)){
              router.replace(`/401`)
              NProgress.done()
            }else{
              router.push({...to, replace: true},onAbort=>{});
              NProgress.done()
            }

          }).catch((err) => {
              NProgress.done()
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err)
            router.replace(`/login?redirect=${to.path}`)
            NProgress.done()
          })
        })
      }else{
        if(!isPermission(store.getters.roles,to)){
          router.replace(`/401`)
          NProgress.done()
        }else{
          next();
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
