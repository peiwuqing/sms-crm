<template>
  <el-drawer
    title="添加资源"
    :visible.sync="isShow"
    size="60%"
    @open="initTree"
    @close="close"
    :wrapperClosable="false"
    destroy-on-close
  >
    <div>
      <el-form ref="menu" :rules="rules" :model="menu" label-width="80px">
        <el-form-item label="父菜单">
          <el-tree :data="treeData"
                   :props="defaultProps"
                   node-key="id"
                   show-checkbox
                   :check-strictly="true"
                   ref="menutree"
                   @check-change="changeChecked"
                   @node-click="clickChecked"
          ></el-tree>
        </el-form-item>
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="menu.name" maxlength="16" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源编码" prop="code">
          <el-input v-model="menu.code" maxlength="32" placeholder="资源编码"></el-input>
        </el-form-item>
        <el-form-item label="资源类型" prop="type">
          <el-radio-group v-model="menu.type">
            <el-radio-button label="MENU">菜单</el-radio-button>
            <el-radio-button label="BUTTON">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否可见" prop="visible">
          <el-radio-group v-model="menu.visible">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="seq">
          <el-input maxlength="4"  @blur="$set(menu,'seq',$event.target.value)" onkeyup="value=value.replace(/[^\d]/g,'');value=value.indexOf('e')>0?0:value<0?0:value>9999?9999:value" v-model="menu.seq"></el-input>
        </el-form-item>
        <el-form-item label="资源地址" prop="url">
          <el-input v-model="menu.url" maxlength="128" placeholder="资源地址"></el-input>
        </el-form-item>
        <el-form-item label="资源图标" prop="icon">
          <div class="choose-button">
            <i :class="menu.icon"  style="line-height:36px;font-size: 25px;" v-if="menu.icon"></i>
            <el-button  size="small" type="primary" @click="showIcons">选择图标</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <span  class="drawer-footer">
      <el-button  size="small" type="primary" @click="submitForm('menu')">提交</el-button>
    </span>
    <icons :is-show="isShowIcons" @event="iconsEvent"></icons>
  </el-drawer>

</template>

<script>
  import {addMenu} from "@/api/authapi";
  import icons from "./icons"
  export default {
    name:'menusAdd',
    components:{
      icons:icons
    },
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
        isShowIcons:false,
        isShow:false,
        treeData:[],
        menu:{
          visible:"1",
          type:"MENU"
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules: {
          name: [
            { required: true, message: '资源名称不能为空', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '资源编码不能为空', trigger: 'blur' }
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
      showIcons(){
        this.isShowIcons = true;
      },
      iconsEvent(evt){
        if(evt!=null){
          this.menu.icon = evt
        }
        this.isShowIcons = false;
      },
      close(){
        this.menu = {
          visible:"1",
          type:"MENU"
        }
        this.$emit("event",{cmd:"closeAdd"})
      },
      initTree() {
        //复制一份树节点，将第三级设置为不可用
        let tree = JSON.parse(JSON.stringify(this.tree))
        tree.forEach( t =>{
          if(t.children && t.children.length >0){
            t.children.forEach(t1=>{
              if(t1.children && t.children.length>0){
                t1.children.forEach(t2=>{
                  t2.disabled = true
                })
              }
            })
          }
        })
        this.treeData = tree
      },
      changeChecked(data,checked,child){
        this.treeCheck.checkedKeys = data.id;
        if(checked == true){
          this.treeCheck.checkedId = data.id
          this.$refs.menutree.setCheckedKeys([data.id]);
          this.treeCheck.data = data;
        }else{
          if(this.treeCheck.checkedId == data.id){
            this.treeCheck.checkedId = null
          }
        }
      },
      clickChecked(data,checked,child){
        if(!data.disabled) {
          this.treeCheck.checkedId = data.id
          this.$refs.menutree.setCheckedKeys([data.id]);
        }
      },
      deleteMenu(){
        let that = this;
        that.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
          that.$emit('event',{cmd:"delete"})
        }).catch(()=>{});
      },
      toEdit(){
        this.$emit("event",{cmd:"edit"})
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(){
        let that = this;
        if(that.treeCheck.checkedId){
            that.menu.parentId = that.treeCheck.checkedId
        }
        this.$refs['menu'].validate((valid) => {
          if (valid) {
            addMenu(that.menu).then(resp=>{
              if(resp.code == 0){
                that.$message.success("添加成功");
                that.resetForm('menu')
                that.menu={
                  visible:"1",
                  type:"MENU"
                }
                that.treeCheck = {
                  checkedKeys:'',
                  checkedId:''
                }
                that.$emit("event",{cmd:"addSuccess"});
              }else{
                that.$message.error(resp.message);
              }
            })
          } else {
            return false;
          }
        });
      }

    }
  }
</script>
<style>
  .choose-button{
    display: flex;
    flex-direction: row;
    text-align: center;
  }
  .choose-button > i{
    margin-right: 20px
  }
  .buttons>*{
    margin-top: 10px;
  }
</style>
