import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import Cookies from 'js-cookie'
import * as filters from './filters' // global filters
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import 'font-awesome/css/font-awesome.css'
import './permission' // permission control
import axios from 'axios'
import {toParam} from '@/utils/index.js'
import components from '@/components/common/tables/index.js';
import cookies from 'vue-cookies'
import {removeNullKey,price} from "./utils/validate"
import JsonExcel from 'vue-json-excel'
import dayjs from 'dayjs'
import './utils/dialog'
import {hasPermission} from '@/utils/auth'
Vue.component('downloadExcel', JsonExcel)


Vue.use(components);
Vue.prototype.$axios = axios;
Vue.prototype.$cookies = cookies;
Vue.prototype.$baseUrl = process.env.baseUrl
Vue.prototype.$phoneBarConf = process.env.phoneBarConf
Vue.prototype.$messageSocket = process.env.messageSocket
Vue.prototype.$nullParam=removeNullKey;
Vue.prototype.$price=price;
window.$day = dayjs;
window.$price=price;
Vue.prototype.$hasPermission = hasPermission

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})

axios.defaults.withCredentials=true

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
