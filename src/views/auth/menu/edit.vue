<template>
  <el-drawer
    title="更新资源"
    :visible.sync="isShow"
    @close="close"
    @opened="open"
    size="60%"
    :wrapperClosable="false"
    destroy-on-close
  >
    <div>
      <el-form ref="editMenu" :rules="rules" :model="menu" label-width="80px">
        <el-form-item label="父菜单">
          <el-tree :data="treeData"
                   :props="defaultProps"
                   node-key="id"
                   show-checkbox
                   :check-strictly="true"
                   :default-expanded-keys="[menu.id]"
                   ref="menutree"
                   @check="changeChecked"
                   v-if="load"
          ></el-tree>
        </el-form-item>
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="menu.name" maxlength="16" placeholder="资源名称"></el-input>
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
        <el-form-item label="资源编码" prop="code">
          <el-input v-model="menu.code" maxlength="32" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="seq">
          <el-input maxlength="4" @blur="$set(menu,'seq',$event.target.value)"  onkeyup="value=value.replace(/[^\d]/g,'');value=value.indexOf('e')>0?0:value<0?0:value>9999?9999:value" v-model.number="menu.seq"></el-input>
        </el-form-item>
        <el-form-item label="资源URL"  prop="url">
          <el-input v-model="menu.url" maxlength="128" placeholder="资源地址"></el-input>
        </el-form-item>
        <el-form-item label="资源图标" prop="icon">
          <div class="choose-button">
            <i :class="menu.icon"  style="line-height:36px;font-size: 25px;" v-if="menu.icon"></i>
            <el-button type="primary" @click="showIcons">选择图标</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <span class="drawer-footer">
      <el-button  size="small" type="primary" @click="submitForm('menu')">提交</el-button>
    </span>
    <icons :is-show="isShowIcons" @event="iconsEvent"></icons>
  </el-drawer>
</template>

<script>
  import {editMenu} from "@/api/authapi";
  import icons from "./icons"
  export default {
    name:'menusEdit',
    props:{
      tree:{
        type:Array
      },
      currentNode:{
        type:Object
      },
      isVisible:false
    },
    components:{
      icons:icons
    },
    data() {
      return {
        isShowIcons:false,
        isShow:false,
        treeData:[],
        menu:{},
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
        },
        load:false,
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
          case 'button' : return "按钮"
          default : return '菜单'
        }
      }
    },
    methods: {
      open(){
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
        this.$nextTick(e=>{
          this.load=true
          this.menu = JSON.parse(JSON.stringify(this.currentNode))
          if(this.menu.visible){
            this.menu.visible = this.menu.visible+""
          }
          //将当前节点的子集置为不可选择
          this.getAllNode(this.treeData,this.menu.id)
          if(this.menu.parentId) {
            this.$refs.menutree.setCheckedKeys([this.menu.parentId]);
          }
          this.menu.visible  = this.menu.visible+''
        })
      },
      showIcons(){
        this.isShowIcons = true;
      },
      iconsEvent(evt){
        if(evt!=null){
          this.menu.icon = evt
        }
        this.isShowIcons = false;
      },
      submitForm(){
        let that = this;
        if(this.treeCheck.checkedId){
          this.menu.parentId = this.treeCheck.checkedId
        }
        this.$refs['editMenu'].validate((valid) => {
          if (valid) {
            editMenu(that.menu).then(resp=>{
              if(resp.code == 0){
                that.$message.success("更新成功");
                that.$emit("event",{cmd:"editSuccess"});
              }else{
                that.$message.error(resp.message);
              }
            })
          } else {
            return false;
          }
        });
      },
      close(){
        this.$emit("event",{cmd:"closeEdit"})
      },
      changeChecked(data){
        this.treeCheck.checkedKeys = data.id;
        this.treeCheck.checkedId = data.id
        this.$refs.menutree.setCheckedKeys([data.id]);
        this.treeCheck.data = data;
      },
      getAllNode(objects,id){
        let that = this;
        objects.forEach(e=>{
          if(e.id == id){
            e.disabled = true
            if(e.children){
              that.iteratorNodes(e.children,that)
            }
          }else{
            if(e.children){
              that.getAllNode(e.children,id)
            }
          }
        })
      },
      iteratorNodes(objects,that){
        objects.forEach(e=> {
          e.disabled = true
          if (e.children) {
            that.iteratorNodes(e.children, that)
          }
        })
      },
    }
  }
</script>
<style>
  .buttons>*{
    margin-top: 10px;
  }
</style>
