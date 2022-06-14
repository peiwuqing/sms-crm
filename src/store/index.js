import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/sys/app'
import getters from './getters'
import user from './modules/sys/user'
import tagsView from './modules/sys/tagsView'
import permission from './modules/sys/permission'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    permission,
  },
  getters
})

export default store
