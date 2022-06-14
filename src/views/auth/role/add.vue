<template>
  <el-drawer
    title="添加角色"
    :visible.sync="isShow"
    size="60%"
    @close="close"
    :wrapperClosable="false"
    destroy-on-close
  >
  <div>
        <el-form ref="role" :rules="rules" :model="role" label-width="80px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="role.name" placeholder="角色名称"></el-input>
          </el-form-item>
          <el-form-item label="权限" prop="authors">
            <el-tree :data="tree" node-key="id" ref="authorTree" @check="selectionTree()" show-checkbox :props="defaultProps"></el-tree>
          </el-form-item>
        </el-form>
  </div>
    <span  class="drawer-footer">
      <el-button type="primary"  size="small" @click="submitForm('role')">提交</el-button>
    </span>
  </el-drawer>
</template>

<script>
  import {addRole} from "@/api/authapi";
  export default {
    name:'roleAdd',
    props:{
      tree:{
        type:Array
      },
      isVisible:false
    },
    data() {
      let validateAuthors = (i,j,callback)=>{
        if(this.role.authors.length>0){
          callback()
        }else{
          callback(new Error("请选择权限"));
        }
      }
      return {
        isShow:false,
        treeCheck:{
          checkedKeys:'',
          checkedId:'',
          data:{}
        },
        role:{
          name:'',
          authors:[]
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules: {
          name: [
            { required: true, message: '角色名必填', trigger: 'blur' }
          ],
          authors: [
            { required: true, validator: validateAuthors, message: '权限必选', trigger: 'blur' }
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
      close(){
        this.role = {
          name:'',
          authors:[]
        }
        this.treeCheck ={
          checkedKeys:'',
            checkedId:'',
            data:{}
        }
        this.$emit("event",{cmd:"closeAdd"})
      },
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(_this.role.authors && _this.role.authors.length>0){
              let resourceIds = [];
              _this.role.authors.forEach( e =>{
                resourceIds.push(e.id)
              })
              _this.role.resourceIds = resourceIds;
            }
            addRole(_this.role).then(resp=>{
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
        let nodes = this.$refs.authorTree.getCheckedNodes(false,true);
        this.role.authors = nodes
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
