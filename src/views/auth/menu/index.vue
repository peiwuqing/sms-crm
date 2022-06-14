<template>
  <div>

    <div class="lr-container">
        <div class="lr-left">
          <el-tree :data="data"
                   :props="defaultProps"
                   node-key="id"
                   :check-on-click-node="true"
                   @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="lr-right">
          <div class="right-header">
            <el-button v-if="currentNode.id" size="small" type="primary" @click="toEdit">编辑</el-button>
            <el-button v-if="currentNode.id" size="small" type="danger" @click="deleteMenu(currentNode.id)">删除</el-button>
            <el-button  size="small" type="success" @click="add()">新增</el-button>
          </div>
          <div class="right-content">
            <el-form label-width="120px">
              <el-form-item label="资源名称：">
                {{currentNode.name}}
              </el-form-item>
              <el-form-item label="资源类型：">
                {{currentNode.type=='MENU'?'菜单':'按钮'}}
              </el-form-item>
              <el-form-item label="父资源：" v-if="currentNode.parentNode">
                {{currentNode.parentNode.name}}
              </el-form-item>
              <el-form-item label="资源图标：" v-if="currentNode.icon">
                <i :class="currentNode.icon"></i>
              </el-form-item>
              <el-form-item label="资源编码：" v-if="currentNode.code">
                {{currentNode.code}}
              </el-form-item>
              <el-form-item label="是否可见：">
                {{currentNode.visible==1?'可见':'不可见'}}
              </el-form-item>
              <el-form-item label="排序：">
                {{currentNode.seq}}
              </el-form-item>
              <el-form-item label="路径：" v-if="currentNode.url && currentNode.url!=''">
                {{currentNode.url}}
              </el-form-item>
            </el-form>
          </div>
        </div>
    </div>
    <add :is-visible="addShow" :tree="data"  @event="onEvent"/>
    <edit :is-visible="editShow" :tree="data"  @event="onEvent" :current-node="currentNode"/>
  </div>
</template>

<script>
  import add from "./add";
  import edit from "./edit";
  import {queryAllMenu,deleteMenu} from "../../../api/authapi";
  export default {
    name:'menus',
    components:{
      add,
      edit,
    },
    data() {
      return {
        addShow:false,
        openShow:false,
        editShow:false,
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        currentNode:{},
      };
    },
    mounted() {
      this.queryAllAuth();
    },
    methods: {
      onEvent(e){
         let that = this;
         if(e.cmd == 'edit'){
           that.editShow = true
           that.openShow = false
         }else if(e.cmd == 'delete'){
           that.openShow = false
           that.refrashTree()
         }else if(e.cmd == 'closeAdd'){
           that.addShow = false
         }else if(e.cmd == 'closeShow'){
           that.openShow = false
         }else if(e.cmd == 'closeEdit'){
           that.editShow = false
         }else if(e.cmd == 'addSuccess'){
           that.addShow = false
           that.refrashTree()
         }else if(e.cmd == 'editSuccess'){
           that.editShow = false
           that.refrashTree()
         }
      },
      deleteMenu(){
        let that = this;
        that.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMenu(that.currentNode.id).then(res =>{
            if(res.code == 0){
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.refrashTree()
            }else{
              that.$message.error(res.message);
            }

          })

        }).catch(()=>{});
      },
      toEdit(){
        this.editShow = true
      },
      add(){
       this.addShow = true
      },
      handleNodeClick(data) {
        this.currentNode = data
        if(data.pid)
          this.currentNode.parentNode = this.findNodeParent(this.data,data.pid)
        // this.openShow = true
      },
      queryAllAuth(){
        queryAllMenu().then((data)=>{
          this.data = data.data
          if(this.data.length>0){
            this.currentNode = this.data[0]
          }
        })
      },
      refrashTree(){
        this.queryAllAuth();
      },
      findNodeParent(data,pid){
        let that = this;
        data.forEach(
          d=>{
             if(d.id == pid){
                return d;
             }
             if(d.children && d.children.size>0){
                that.findNodeParent(d.children,pid)
             }
          }
        )
      },

    }
  }
</script>
