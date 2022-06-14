<template>
  <el-drawer
    title="查看角色"
    :visible.sync="isShow"
    size="60%"
    @close="close"
    @opened="open"
    :wrapperClosable="false"
    destroy-on-close
  >
    <div>
      <el-form label-width="120px">
          <el-form-item label="角色名称" prop="name">
            {{role.name}}
          </el-form-item>
          <el-form-item label="权限" prop="authors">
            <el-tree :data="tree" node-key="id" ref="authorTree"  show-checkbox :props="defaultProps"></el-tree>
          </el-form-item>
        </el-form>
    </div>
    <span class="drawer-footer">
        <el-button  size="small" type="primary" @click="toEdit">编辑</el-button>
        <el-button  size="small" type="danger" @click="deleteRole()">删除</el-button>
    </span>
  </el-drawer>
</template>

<script>
  import {deleteRole} from "@/api/authapi";
  export default {
    name:'roleShow',
    props:{
      tree:{
        type:Array
      },
      role:{
        type: Object
      },
      isVisible:false,
    },
    data() {
      return {
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
      };
    },
    watch:{
      isVisible(value){
        this.isShow = value
      }
    },
    methods: {
      close(){
        this.$emit("event",{cmd:"closeShow"})
      },
      deleteRole(formName) {
        let _this = this;
        _this.$confirm('是否确认删除,将会清除所有用户下的当前角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRole(_this.role.id).then(resp=>{
            if(resp.code == 0){
              _this.$message.success("删除成功");
              _this.$emit('event',{cmd:"delete"})
            }else{
              _this.$message.error(resp.message);
            }
          })
        });
      },
      toEdit(){
        this.$emit("event",{cmd:"edit"})
      },
      setCheckedTree(){
        let _this = this;
        if(_this.role.resourceIds && _this.role.resourceIds.length>0) {
          _this.role.resourceIds.forEach((c,i)=>{
            _this.$refs.authorTree.setChecked(c,true);
          })
        }
      },
      open() {
        this.setCheckedTree()
      }
    },

  }
</script>
<style scoped>
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
