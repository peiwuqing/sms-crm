<template>
  <el-drawer
    title="模板详情"
    :visible.sync="isShow"
    size="50%"
    @close="close"
    @opened="open"
    :wrapperClosable="false"
    destroy-on-close
  >
    <div>
      <el-form  size="small" label-width="120px">
        <el-form-item label="客户名称:">
          {{currentRow.customerName}}
        </el-form-item>
        <el-form-item label="模板ID:">
          {{currentRow.templateId}}
        </el-form-item>
        <el-form-item label="模板标题:">
          {{currentRow.title}}
        </el-form-item>
        <el-form-item label="模板类型:">
          {{currentRow.type == 1?'通知类':'营销类'}}
        </el-form-item>
        <el-form-item label="模板内容:">
          {{currentRow.content}}
        </el-form-item>
        <el-form-item label="模板签名:">
          【{{currentRow.signDesc}}】
        </el-form-item>
        <el-form-item label="审核人:">
          {{currentRow.auditUserDesc}}
        </el-form-item>
        <el-form-item label="审核人:" v-if="currentRow.status == 3">
          {{currentRow.remark}}
        </el-form-item>
        <el-form-item label="状态:">
          {{currentRow.status | status}}
        </el-form-item>
        <el-form-item label="创建时间:">
          {{currentRow.createdAt | formatDate}}
        </el-form-item>
        <el-form-item label="最后更新时间:">
          {{currentRow.updatedAt | formatDate}}
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
  filters:{
    status(v){
      if(v == 1){
        return '正常'
      }else if(v== 2){
        return '待审核'
      }else if(v== 3){
        return '审核拒绝'
      }
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
