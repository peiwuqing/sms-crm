<template>
  <el-drawer
    title="新增租户"
    :visible.sync="isShow"
    size="60%"
    @close="close"
    @opened="open"
    :wrapperClosable="false"
    destroy-on-close
  >
      <el-form ref="addTenant" :rules="rules" :model="tenant" label-width="120px">
        <el-form-item label="租户名称" prop="name">
          <el-input v-model="tenant.name" maxlength="64" placeholder="租户名称"></el-input>
        </el-form-item>
        <el-form-item label="租户编码" prop="code">
          <el-input v-model="tenant.code" maxlength="32" @blur="$set(tenant,'code',$event.target.value)" onkeyup="value=value.replace(/[^\w_.]/g,'')" placeholder="租户编码"></el-input>
        </el-form-item>
        <el-form-item label="所属用户" prop="userId">
          <el-select v-model="tenant.userId" style="width: 100%;" clearable filterable placeholder="所属用户" clearable>
            <el-option v-for="data in allUsers" :key="data.id" :label="data.realName+'['+data.staffNo+']'" :value="data.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺名称" prop="nickName">
          <el-input v-model="tenant.nickName" maxlength="64" placeholder="店铺名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="tenant.contact" maxlength="16" placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="tenant.phone" @blur="tenant.phone=$event.target.value" onkeyup="value=value.replace(/[^\d]/g,'');value = value.slice(0,11)" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="tenant.address" maxlength="128" placeholder="联系地址"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="tenant.remark" maxlength="128" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="banner">
          <upload :type="'image'" :limit="1" @upload="upload" :image="tenant.banner" v-if="reload"></upload>
        </el-form-item>
        <el-form-item label="头像" prop="cover">
          <upload :type="'image'" :limit="1" @upload="uploadCover" :image="tenant.cover" v-if="reload"></upload>
        </el-form-item>
      </el-form>

    <div class="drawer-footer">
      <el-button type="primary"  size="small" @click="submitForm('addTenant')">提交</el-button>
    </div>
  </el-drawer>
</template>

<script>
  import {addTenant,checkTenantCode} from '@/api/tenantapi'
  import upload from '@/components/common/upload'
  export default {
    name:'tenantAdd',
    props:{
      isVisible:false,
      allUsers:[],
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
        if(this.tenant.code && this.tenant.code.length>0){
          let params = {
            tenantCode:this.tenant.code
          }
          checkTenantCode(params).then(resp=>{
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
        tenant:{
          banner:null,
          cover:null
        },
        reload:true,
        rules: {
          name: [
            { required: true, message: '租户名称必填', trigger: 'blur' }
          ],
          code: [
            { required: true,validator:validateCode,  trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '所属用户必选', trigger: 'blur' }
          ],
          banner: [
            { required: true, message: 'banner图必传', trigger: 'blur' }
          ],
          cover: [
            { required: true, message: '头像必传', trigger: 'blur' }
          ],
          phone:[
            { required: false, message: '手机号码格式有误', trigger: 'blur',pattern : /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ }
          ]
        },
      };
    },
    mounted() {
    },
    methods: {
      open(){
      },
      upload(data){
        this.tenant.banner = data.fileId
        this.reload = false
        this.$nextTick(e=>{
          this.reload = true
        })
      },
      uploadCover(data){
        this.tenant.cover = data.fileId
        this.reload = false
        this.$nextTick(e=>{
          this.reload = true
        })
      },
      close(){
        this.tenant = {}
        this.$emit("event",{cmd:"closeAdd"})
      },
      submitForm(formName) {
        let _this  = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addTenant(_this.tenant).then(resp=>{
                if(resp.code == 0){
                  _this.$message.success("添加成功");
                  _this.resetForm(formName)
                  _this.$emit("event",{cmd:"addSuccess"});
                }else{
                  _this.$message.error(resp.message);
                }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>
<style type="text/css" scoped>
</style>
