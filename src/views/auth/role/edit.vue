<template>
  <el-drawer
    title="编辑角色"
    :visible.sync="isShow"
    size="60%"
    @close="close"
    @opened="open"
    :wrapperClosable="false"
    destroy-on-close
  >
  <div>
            <el-form ref="role" :rules="rules" :model="role" label-width="80px">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="role.name" placeholder="角色名称"></el-input>
              </el-form-item>
              <el-form-item label="权限" prop="authors">
                <el-tree :data="tree" node-key="id" ref="editTree" @check="selectionTree()" show-checkbox :props="defaultProps"></el-tree>
              </el-form-item>
            </el-form>
          </div>
    <span  class="drawer-footer">
         <el-button type="primary" size="small"  @click="submitForm('role')">提交</el-button>
    </span>
  </el-drawer>
</template>

<script>
  import {editRole} from "@/api/authapi";
  export default {
    name:'menuEdit',
    props:{
      tree:{
        type:Array
      },
      role:{
        type: Object
      },
      isVisible:false
    },
    watch:{
      isVisible(value){
        this.isShow = value
      }
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
        treeCheck:{
          checkedKeys:'',
          checkedId:'',
          data:{}
        },
        isShow:false,
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
    methods: {
      open() {
        this.setCheckedTree()
      },
      close(){
        this.$emit("event",{cmd:"closeEdit"})
      },
      submitForm(formName) {
        let _this = this;
        if(_this.role.authors && _this.role.authors.length>0){
          let resourceIds = [];
          _this.role.authors.forEach( e =>{
            resourceIds.push(e)
          })
          _this.role.resourceIds = resourceIds;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editRole(_this.role).then(resp=>{
              if(resp.code == 0){
                _this.$message.success("修改成功");
                _this.$emit("event",{cmd:"editSuccess"});
              }else{
                _this.$message.error(resp.message);
              }
            })
          } else {
            return  ;
          }
        });
      },
      selectionTree(){
        let nodes = this.$refs.editTree.getCheckedNodes(false,true);
        let keys = [];
        nodes.forEach(e=>{
          keys.push(e.id)
        })
        this.role.authors = keys
      },
      setCheckedTree(){
        let _this = this;
        if(_this.role.resourceIds && _this.role.resourceIds.length>0) {
          _this.role.resourceIds.forEach((c,i)=>{
            _this.$refs.editTree.setChecked(c,true);
            _this.selectionTree();
          })
        }
      }
    },
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
