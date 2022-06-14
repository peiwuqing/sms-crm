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
    <el-form ref="editCustomer" :rules="rules" :model="model" label-width="150px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name" maxlength="64" placeholder="请输入法人姓名或公司名称"></el-input>
      </el-form-item>
      <el-form-item label="客户编号" prop="customerNo">
        <el-input v-model="model.customerNo" maxlength="32" @blur="$set(model,'customerNo',$event.target.value)" onkeyup="value=value.replace(/[^\w_.]/g,'')" placeholder="请输入客户编号"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="username">
        <el-input v-model="model.username" maxlength="32" @blur="$set(model,'username',$event.target.value)" onkeyup="value=value.replace(/[^\w_.]/g,'')" placeholder="请输入登录账号"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input v-model="model.password" maxlength="32" @blur="$set(model,'password',$event.target.value)" onkeyup="value=value.replace(/[^\w_.]/g,'')" placeholder="请输入登录密码"></el-input>
      </el-form-item>
      <el-form-item label="所在通道" prop="channelId">
        <el-select v-model="model.channelId" placeholder="请选择所在通道" style="width: 100%">
          <el-option :value="item.id" :label="item.name" :key="item.id" v-for="item in allChannels"/>
        </el-select>
      </el-form-item>
      <el-form-item label="营销类短信价格" prop="sales">
        <el-input v-model="model.sales" maxlength="128" placeholder="请输入营销类价格"></el-input>
      </el-form-item>
      <el-form-item label="通知类短信价格" prop="notification">
        <el-input v-model="model.notification" maxlength="128" placeholder="请输入通知类价格"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="model.contact" maxlength="16" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="model.phone" @blur="model.phone=$event.target.value" onkeyup="value=value.replace(/[^\d]/g,'');value = value.slice(0,11)" placeholder="请输入联系方式"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="model.remark" maxlength="64" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="材料" prop="banner">
        <upload :type="'image'" :limit="5" :multiple="true" @upload="upload" v-if="reload" :file-list="model.files"></upload>
      </el-form-item>
    </el-form>

    <div class="drawer-footer">
      <el-button type="primary"  size="small" @click="submitForm('editCustomer')"><i class="fa fa-check"/>提交</el-button>
    </div>
  </el-drawer>
</template>

<script>
import {check,editCustomer,findCustomerById} from "@/api/customerapi";
import upload from "@/components/common/upload"
export default {
  name:'tenantAdd',
  props:{
    isVisible:false,
    allChannels:[],
    currentRow:{},
  },
  components:{
    'upload':upload
  },
  watch:{
    isVisible(value){
      this.isShow = value
    }
  },
  data() {
    let validateCode = (i,j,callback)=>{
      if(this.model.customerNo && this.model.customerNo.length>0){
        let params = {
          key:'customerNo',
          val:this.model.customerNo,
          id:this.model.id
        }
        check(params).then(resp=>{
          if(resp.data){
            callback()
          }else{
            callback(new Error("客户编号重复"));
          }
        })
      }else{
        callback(new Error("请填写客户编号"));
      }
    }
    let validateUsername = (i,j,callback)=>{
      if(this.model.username && this.model.username.length>0){
        let params = {
          key:'username',
          val:this.model.username,
          id:this.model.id
        }
        check(params).then(resp=>{
          if(resp.data){
            callback()
          }else{
            callback(new Error("登录名重复"));
          }
        })
      }else{
        callback(new Error("请填写登录名"));
      }
    }
    return {
      isShow:false,
      model:{
        name:'',
        customerNo:'',
        username:'',
        channelId:'',
        password:'',
        notification:'',
        sales:'',
        contact:'',
        phone:'',
        files:[],
      },
      reload:false,
      rules: {
        name: [
          { required: true, message: '通道名称必填', trigger: 'blur' }
        ],
        customerNo: [
          { required: true,validator:validateCode,  trigger: 'blur' }
        ],
        username: [
          { required: true,validator:validateUsername,  trigger: 'blur' }
        ],
        password: [
          { required: true,message: '密码必填',  trigger: 'blur' }
        ],
        channelId: [
          { required: true,message: '所在通道必选',  trigger: 'blur' }
        ],
        notification: [
          { required: true, message: '通知类价格必填,小数点后最多三位', trigger: 'blur',pattern:/(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,3}$)/ }
        ],
        sales: [
          { required: true, message: '销售类价格必填,小数点后最多三位', trigger: 'blur',pattern:/(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,3}$)/ }
        ],
        contact:[
          { required: true, message: '联系方式必填', trigger: 'blur'}
        ],
        phone:[
          { required: true, message: '手机号码格式有误', trigger: 'blur',pattern : /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ }
        ]
      },
    };
  },
  methods: {
    upload(data){
      this.model.files = data.fileList
    },
    open(){
      findCustomerById({id:this.currentRow.id}).then(resp=>{
        this.model = resp.data
        let files = []
        if(this.model.fileList && this.model.fileList.length>0){
          this.model.fileList.forEach(e=>{
            files.push({
              fileId:e
            })
          })
        }
        this.model.files = files;
        this.$nextTick(e=>{
          this.reload = true
        })
        this.model.sales = $price(this.model.sales)
        this.model.notification = $price(this.model.notification)
      })
    },
    close(){
      this.$emit("event",{cmd:"closeEdit"})
    },
    submitForm(formName) {
      let _this  = this
      if(this.model.files && this.model.files.length>0){
        let fileList = [];
        _this.model.files.forEach(e=>{
          fileList.push(e.fileId)
        })
        _this.model.fileList = fileList
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editCustomer(_this.model).then(resp=>{
            if(resp.code == 0){
              _this.$message.success("更新成功");
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
  }
}
</script>
<style type="text/css" scoped>
</style>
