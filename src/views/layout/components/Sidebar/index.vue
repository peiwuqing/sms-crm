<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :default-openeds="['/auth','/channels','/customers']"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <sidebar-item v-for="route in finalMenus" :key="route.url" :item="route" :base-path="route.url"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import store from "../../../../store";

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'menus',
      'sidebar'
    ]),
    finalMenus(){
      let menus = this.$store.getters.menus;
      // console.log(menus)
      // let roters = this.$store.getters.addRouters;
      // let res = [];
      // menus.forEach(e =>{
      //     roters.forEach(e1 =>{
      //         if(e.url == e1.path){
      //            res.push(e)
      //         }
      //     })
      // })
      return menus

    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
}
</script>
