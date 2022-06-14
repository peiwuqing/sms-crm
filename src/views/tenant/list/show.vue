<template>
  <el-drawer
    title="查看租户"
    :visible.sync="isShow"
    size="70%"
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
        <el-form-item label="店铺名称:">
          {{currentRow.nickName}}
        </el-form-item>
        <el-form-item label="联系人:">
          {{currentRow.contact}}
        </el-form-item>
        <el-form-item label="联系方式:">
          {{currentRow.phone}}
        </el-form-item>
        <el-form-item label="地址:">
          {{currentRow.address}}
        </el-form-item>
        <el-form-item label="所属用户:">
          {{currentRow.userDesc}}
        </el-form-item>
        <el-form-item label="状态:">
          {{currentRow.status == 1?'可用':'不可用'}}
        </el-form-item>
        <el-form-item label="备注:">
          {{currentRow.remark}}
        </el-form-item>
        <el-form-item label="创建时间:">
          {{createAt}}
        </el-form-item>
        <el-form-item label="更新时间:">
          {{updatedAt}}
        </el-form-item>
        <el-form-item label="封面:">
          <el-image v-if="currentRow.banner" style="width: 120px;height: 120px" :src="$baseUrl+'api/v1.0/common/download?fileId='+currentRow.banner"/>
          <div v-else>暂未上传</div>
        </el-form-item>
        <el-form-item label="头像:">
          <el-image v-if="currentRow.cover" style="width: 120px;height: 120px" :src="$baseUrl+'api/v1.0/common/download?fileId='+currentRow.cover"/>
          <div v-else>暂未上传</div>
        </el-form-item>
      </el-form>

    </div>
    <span class="drawer-footer">
        <el-button  size="small" type="danger" @click="deleteRow">删除</el-button>
    </span>
  </el-drawer>
</template>

<script>
import {deleteTenant} from "@/api/tenantapi";
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
    createAt(){
      if(this.currentRow.createdAt)
        return new $day(this.currentRow.createdAt).format("YYYY-MM-DD HH:mm:ss")
      else
        return ''
    },
    updatedAt(){
      if(this.currentRow.updatedAt)
        return new $day(this.currentRow.updatedAt).format("YYYY-MM-DD HH:mm:ss")
      else
        return ''
    },
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
    deleteRow(){
      let _this = this;
      _this.$confirm('是否确认删除租户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTenant(row).then(resp=>{
          if(resp.code == 0){
            _this.$message.success("删除成功");
            _this.queryData();
          }else{
            _this.$message.error(resp.message);
          }
        })
      });
    },
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
