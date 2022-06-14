<template>
  <div  class="menu-wrapper">
    <el-submenu ref="subMenu" :index="item.url?item.url:item.code">
      <template slot="title">
        <item v-if="item" :icon="item.icon" :title="item.name" />
      </template>

      <template v-for="child in item.children">
        <template>
          <sidebar-item v-if="child.children&&child.children.length>0&&child.children[0].type!='BUTTON'"  :is-nest="true" :item="child" :key="child.url" :base-path="child.url" class="nest-menu" />
          <app-link  v-else :to="resolvePath(child.url)" :key="child.url">
            <el-menu-item :index="child.url" v-if="child.visible ==1">
              <item v-if="child" :icon="child.icon" :title="child.name" />
            </el-menu-item>
          </app-link>
        </template>
      </template>
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    //el-menu-item 的index 废弃
    childId(id){
      return id.pid+"-"+id.id;
    },
    resolvePath(routePath) {
      if(!routePath)return ""
      if (/^(https?:|mailto:|tel:)/.test(routePath)) {
        return routePath
      }
      return routePath
    },

  }
}
</script>
