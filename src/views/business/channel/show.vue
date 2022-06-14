<template>
  <el-drawer
    title="查看通道"
    :visible.sync="isShow"
    size="50%"
    @close="close"
    @opened="open"
    :wrapperClosable="false"
    destroy-on-close
  >
    <div>
      <el-form  size="small" label-width="120px">
        <el-form-item label="名称:">
          {{currentRow.name}}
        </el-form-item>
        <el-form-item label="编码:">
          {{currentRow.code}}
        </el-form-item>
        <el-form-item label="通知类价格:">
          {{$price(currentRow.notification)}}
        </el-form-item>
        <el-form-item label="营销类价格:">
          {{$price(currentRow.sales)}}
        </el-form-item>
        <el-form-item label="联系人:">
          {{currentRow.contact}}
        </el-form-item>
        <el-form-item label="联系方式:">
          {{currentRow.phone}}
        </el-form-item>
        <el-form-item label="创建时间:">
          {{currentRow.createdAt | formatDate}}
        </el-form-item>
      </el-form>

    </div>
  </el-drawer>
</template>

<script>
export default {
  name:'tenantShow',
  props:{
    currentRow:{
      type: Object
    },
    isVisible:false,
  },
  components:{
  },
  computed:{
  },
  data() {
    return {
      isShow:false
    }
  },
  watch:{
    isVisible(value){
      this.isShow = value
    }
  },
  methods: {
    close(){
      this.$emit("event",{cmd:"closeShow"})
    },
    open() {
    }
  },

}
</script>
<style type="text/css" scoped>
</style>
