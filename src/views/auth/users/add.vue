<template>
  <el-drawer
    title="添加用户"
    :visible.sync="isShow"
    @close="close"
    @opened="open"
    size="60%"
    :wrapperClosable="false"
    destroy-on-close
  >
  <div>
        <el-form ref="users" :rules="rules" :model="user" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username" maxlength="16" placeholder="用户登录名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" show-password placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="user.realName" maxlength="16" placeholder="用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="user.phone" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleIds">
            <el-select v-model="user.roleIds" multiple style="width:100%">
              <el-option :label="r.name" :value="r.id" :key="r.id" v-for="r in roles"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
    <span class="drawer-footer">
         <el-button type="primary"  size="small"  @click="submitForm('users')">提交</el-button>
    </span>
  </div>
  </el-drawer>
</template>

<script>
  import {addUser,checkUserName,checkStaffNo} from "@/api/authapi";
  import {queryRoles} from "../../../api/authapi";
  export default {
    name:'userAdd',
    props:{
      tree:{
        type:Array
      },
      userPList:{
        type:Array
      },
      isVisible:false
    },
    data() {
      let validateUserName=(i,j,callback)=>{
        if(j == ''){
          callback(new Error("用户名必填"));
        }else{
          let param = {
            username:j
          }
          checkUserName(param).then(resp=>{
            if(resp.code == 0){
              if(resp.data){
                callback()
              }else{
                callback(new Error("用户名重复"));
              }
            }else{
              callback(new Error("用户名重复"));
            }
          })
        }


      };
      let validateStaffNo=(i,j,callback)=>{
        let param = {
          staffNo:j
        }
        if(!j || j == ''){
          callback()
        }else{
          checkStaffNo(param).then(resp=>{
            if(resp.code == 0){
              if(resp.data){
                callback()
              }else{
                callback(new Error("工号重复"));
              }
            }else{
              callback(new Error("工号重复"));
            }
          })
        }
      };
      let validateDeviceNo =(i,j,callback)=>{
        if(!j || j == ''){
          callback();
        }else{
          if((j+'').length<4 ||(j+'').length>8){
            callback(new Error("分机号长度只能在4-8之间"));
          }else{
            callback()
          }
        }
      };
      return {
        roles:[],
        isShow:false,
        treeCheck:{
          checkedKeys:'',
          checkedId:'',
          data:{}
        },
        user:{

        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules: {
          deviceNo:[
            { required:false, validator:validateDeviceNo, trigger: 'blur' }
          ],
          phone:[
            { type : "string" ,  message: '请填写正确的手机号',required: false , pattern : /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ }
          ],
          realName:[
            { required: true, message: '姓名必填', trigger: 'blur' },
          ],
          email:[
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          organId: [
            { required: true, message: '部门必选', trigger: 'blur' }
          ],
          username: [
            { required: true,validator:validateUserName, trigger: 'blur' }
          ],
          staffNo:[
            { required: true,validator:validateStaffNo,  trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码必填', trigger: 'blur' }
          ],
          roleIds: [
            { required: true, message: '角色必选', trigger: 'blur' }
          ]
        },
      };
    },
    watch:{
      isVisible(value){
        this.isShow = value
      }
    },
    methods: {
      open(){
        let queryRoleParam={
          pageNo:1,
          pageSize:999
        }
        queryRoles(queryRoleParam).then((data)=>{
          this.roles = data.data.data
        })
      },
      close(){
        this.roles = []
        this.user = {}
        this.treeCheck = {
          checkedKeys:'',
          checkedId:'',
          data:{}
        }
        this.$emit("event",{cmd:"closeAdd"})
      },
      changeChecked(data,checked,child){
        this.treeCheck.checkedKeys = data.id;
        if(checked == true){
          this.treeCheck.checkedId = data.id
          this.$refs.organTree.setCheckedKeys([data.id]);
          this.treeCheck.data = data;
        }else{
          if(this.treeCheck.checkedId == data.id){
            this.$refs.organTree.setCheckedKeys([data.id]);
          }
        }
        if(this.treeCheck.checkedId){
          this.user.organId =  this.treeCheck.checkedId
        }
      },
      clickChecked(data,checked,child){
        this.treeCheck.checkedId = data.id
        this.$refs.organTree.setCheckedKeys([data.id]);
        if(this.treeCheck.checkedId){
          this.user.organId =  this.treeCheck.checkedId
        }
      },
      submitForm(formName) {
        let _this = this;
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            addUser(_this.user).then(resp=>{
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
      selectionTree(){
        let nodes = this.$refs.organTree.getCheckedNodes(false,true);
        //this.role.authors = nodes
      }
    }
  }
</script>
<style>
  .tab-container{
    transition: .2s;
    padding: 30px;
    height: 100%;
  }
  .tab-content{
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    padding: 10px;
    height: 100%;
  }
</style>
