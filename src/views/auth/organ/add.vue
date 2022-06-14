<template>
  <el-drawer
    title="添加部门"
    :visible.sync="isShow"
    @open="initTree"
    @close="close"
    size="60%"
    :wrapperClosable="false"
    destroy-on-close
  >
    <div>
      <el-form ref="menu" :rules="rules" :model="organ" label-width="80px">
        <el-form-item label="父部门">
          <el-tree :data="treeData"
                   :props="defaultProps"
                   node-key="id"
                   show-checkbox
                   :check-strictly="true"
                   ref="addOrganTree"
                   @check-change="changeChecked"
                   @node-click="clickChecked"
          ></el-tree>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="organ.name" placeholder="部门名称"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="seq">
          <el-input  @blur="organ.seq = $event.target.value" onkeyup="value=value.replace(/[^\d]/g,'');value=value.indexOf('e')>0?0:value<0?0:value>9999?9999:value"  v-model.number="organ.seq"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span class="drawer-footer">
      <el-button  size="small" type="primary" @click="submitForm('menu')">提交</el-button>
    </span>
  </el-drawer>
</template>

<script>
  import {addOrgan} from "@/api/authapi";
  export default {
    name:'organAdd',
    props:{
      tree:{
        type:Array
      },
      currentNode:{
        type:Object
      },
      isVisible:false
    },
    data() {
      return {
        isShow:false,
        treeData:[],
        organ:{
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules: {
          name: [
            { required: true, message: '部门名称不能为空', trigger: 'blur' }
          ],
          seq: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
        },
        treeCheck:{
          checkedKeys:'',
          checkedId:''
        }
      };
    },
    watch:{
      isVisible(value){
        this.isShow = value
      }
    },
    computed:{
      menuType(){
        switch (this.currentNode.menutype) {
          case 'menu': return "菜单"
          case 'biz' : return "按钮"
          default : return '菜单'
        }
      }
    },
    methods: {
      close(){
        this.organ = {}
        this.treeCheck = {
          checkedKeys:'',
          checkedId:''
        }
        this.$emit("event",{cmd:"closeAdd"})
      },
      initTree() {
        let tree = JSON.parse(JSON.stringify(this.tree))
        this.treeData = tree
      },
      changeChecked(data,checked,child){
        this.treeCheck.checkedKeys = data.id;
        if(checked == true){
          this.treeCheck.checkedId = data.id
          this.$refs.addOrganTree.setCheckedKeys([data.id]);
          this.treeCheck.data = data;
        }else{
          if(this.treeCheck.checkedId == data.id){
            this.$refs.addOrganTree.setCheckedKeys([data.id]);
          }
        }
      },
      clickChecked(data,checked,child){
        this.treeCheck.checkedId = data.id
        this.$refs.addOrganTree.setCheckedKeys([data.id]);
      },
      toEdit(){
        this.$emit("event",{cmd:"edit"})
      },
      submitForm(){
        let that = this;
        if(that.treeCheck.checkedId){
            that.organ.parentId = that.treeCheck.checkedId
        }
        this.$refs['menu'].validate((valid) => {
          if (valid) {
            addOrgan(that.organ).then(resp=>{
              if(resp.code == 0){
                that.$message.success("添加成功");
                that.resetForm("menu")
                that.treeCheck = {
                  checkedKeys:'',
                  checkedId:''
                }
                that.organ = {}
                that.$emit("event",{cmd:"addSuccess"});
              }else{
                that.$message.error(resp.message);
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
<style>
  .tab-container{
    border-radius: 3px;
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
  .buttons{
    display: flex;
    flex-direction: column;
    justify-content: right;
    flex-wrap: nowrap;
    align-items: flex-end;
  }
  .buttons>*{
    margin-top: 10px;
  }
</style>
