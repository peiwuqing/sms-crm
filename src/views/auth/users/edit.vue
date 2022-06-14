<template>
  <el-drawer
    title="编辑用户"
    :visible.sync="isShow"
    @close="close"
    @opened="open"
    size="60%"
    :wrapperClosable="false"
    destroy-on-close
  >
    <div>
      <el-form ref="usersEdit" :rules="rules" :model="user" label-width="80px">
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
          <el-input v-model="user.phone" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="11" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="user.roleIds" multiple style="width:100%">
            <el-option :label="r.name" :value="r.id" :key="r.id" v-for="r in roles"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span class="drawer-footer">
        <el-button type="primary"  size="small"  @click="submitForm('usersEdit')">提交</el-button>
    </span>
  </el-drawer>
</template>

<script>
  import {editUser,checkUserName,checkStaffNo} from "@/api/authapi";
  import {queryRoles} from "../../../api/authapi";
  export default {
    name:'userEdit',
    props:{
      tree:{
        type:Array
      },
      userPList:{
        type:Array
      },
      user:{
        type:Object
      },
      isVisible:false
    },
    data() {
      let validateUserName=(i,j,callback)=>{
        if(j == ''){
          callback(new Error("用户名必填"));
        }
        let param = {
          username:j,
          id:this.user.id
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

      };
      let validateStaffNo=(i,j,callback)=>{
        let param = {
          staffNo:j,
          id:this.user.id
        }
        if(!i || i == ''){
          callback()
        }
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
          username: [
            { required: true,validator:validateUserName, trigger: 'blur' }
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
      open() {
        let queryRoleParam={
          pageNo:1,
          pageSize:999
        }
        queryRoles(queryRoleParam).then((data)=>{
          this.roles = data.data.data
        })
      },
      close(){
        this.$emit("event",{cmd:"closeEdit"})
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
            editUser(_this.user).then(resp=>{
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
      selectionTree(){
        let _this = this;
        _this.$refs.organTree.setChecked(_this.user.organId,true);
      }
    }
  }
</script>
<style>
</style>
