<template>
  <el-drawer
    title="更新通道"
    :visible.sync="isShow"
    size="50%"
    @close="close"
    @opened="open"
    :wrapperClosable="false"
    destroy-on-close
  >
    <el-form ref="editChannel" :rules="rules" :model="model" label-width="120px">
      <el-form-item label="通道名称" prop="name">
        <el-input v-model="model.name" maxlength="64" placeholder="请输入通道名称"></el-input>
      </el-form-item>
      <el-form-item label="通道编码" prop="code">
        <el-input v-model="model.code" maxlength="32" @blur="$set(model,'code',$event.target.value)" onkeyup="value=value.replace(/[^\w_.]/g,'')" placeholder="请输入通道编码"></el-input>
      </el-form-item>
      <el-form-item label="营销类价格" prop="sales">
        <el-input v-model="model.sales" maxlength="128" placeholder="请输入营销类价格"></el-input>
      </el-form-item>
      <el-form-item label="通知类价格" prop="notification">
        <el-input v-model="model.notification" maxlength="128" placeholder="请输入通知类价格"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="model.contact" maxlength="16" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="model.phone" @blur="model.phone=$event.target.value" onkeyup="value=value.replace(/[^\d]/g,'');value = value.slice(0,11)" placeholder="请输入联系方式"></el-input>
      </el-form-item>
    </el-form>

    <div class="drawer-footer">
      <el-button type="primary"  size="small" @click="submitForm('editChannel')"><i class="fa fa-check"/>提交</el-button>
    </div>
  </el-drawer>
</template>

<script>
import {check,editChannel} from "@/api/channelapi";
export default {
  name:'tenantAdd',
  props:{
    isVisible:false,
    allUsers:[],
    currentRow:{},
  },

  watch:{
    isVisible(value){
      this.isShow = value
    }
  },
  data() {
    let validateCode = (i,j,callback)=>{
      if(this.model.code && this.model.code.length>0){
        let params = {
          val:this.model.code,
          id:this.model.id,
          key:'code'
        }
        check(params).then(resp=>{
          if(resp.data){
            callback()
          }else{
            callback(new Error("编码重复"));
          }
        })
      }else{
        callback(new Error("请填写编码"));
      }
    }
    return {
      isShow:false,
      model:{
        name:'',
        code:'',
        notification:'',
        sales:'',
        contact:'',
        phone:'',
      },
      rules: {
        name: [
          { required: true, message: '通道名称必填', trigger: 'blur' }
        ],
        code: [
          { required: true,validator:validateCode,  trigger: 'blur' }
        ],
        notification: [
          { required: true, message: '通知类价格必填,小数点后最多三位', trigger: 'blur',pattern:/(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,3}$)/ }
        ],
        sales: [
          { required: true, message: '销售类价格必填,小数点后最多三位', trigger: 'blur',pattern:/(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,3}$)/ }
        ],
        phone:[
          { required: false, message: '手机号码格式有误', trigger: 'blur',pattern : /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ }
        ]
      },
    };
  },
  methods: {
    open(){
      this.model = JSON.parse(JSON.stringify(this.currentRow))
    },
    close(){
      this.$emit("event",{cmd:"closeEdit"})
    },
    submitForm(formName) {
      let _this  = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editChannel(_this.model).then(resp=>{
            if(resp.code == 0){
              _this.$message.success("更新成功");
              _this.resetForm()
              _this.$emit("event",{cmd:"editSuccess"});
            }else{
              _this.$message.error(resp.message);
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.model = {
        name:'',
        code:'',
        notification:'',
        sales:'',
        contact:'',
        phone:'',
      }
    },
  }
}
</script>
<style type="text/css" scoped>
</style>
