<template>
  <el-drawer
    title="查看客户"
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
          {{model.name}}
        </el-form-item>
        <el-form-item label="客户编码:">
          {{model.customerNo}}
        </el-form-item>
        <el-form-item label="所在通道:">
          {{model.channelDesc}}
        </el-form-item>
        <el-form-item label="账户余额:">
          {{model.balance}}
        </el-form-item>
        <el-form-item label="通知类价格:">
          {{$price(model.notification)}}
        </el-form-item>
        <el-form-item label="营销类价格:">
          {{$price(model.sales)}}
        </el-form-item>
        <el-form-item label="联系人:">
          {{model.contact}}
        </el-form-item>
        <el-form-item label="联系方式:">
          {{model.phone}}
        </el-form-item>
        <el-form-item label="状态:">
          {{model.status == 1?'可用':'不可用'}}
        </el-form-item>
        <el-form-item label="创建时间:">
          {{model.createdAt | formatDate}}
        </el-form-item>
        <el-form-item label="创建人:">
          {{model.creatorDesc}}
        </el-form-item>
        <el-form-item label="最近操作人:">
          {{model.updatorDesc}}
        </el-form-item>
        <el-form-item label="最后更新时间:">
          {{model.updatedAt | formatDate}}
        </el-form-item>
        <el-form-item label="材料文件:">
            <div class="files-box">
                <el-image v-for="item in model.fileList" :key="item" :src="$baseUrl+'api/v1.0/common/download?fileId='+item"/>
            </div>
        </el-form-item>
      </el-form>

    </div>
  </el-drawer>
</template>

<script>
import {findCustomerById} from '@/api/customerapi'
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
      isShow:false,
      model:'',
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
      findCustomerById({id:this.currentRow.id}).then(resp=>{
        this.model = resp.data
      })
    }
  },

}
</script>
<style type="text/css" scoped>
.files-box{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.files-box >*{
  margin-right: 10px;
  width: 150px;
}
</style>
