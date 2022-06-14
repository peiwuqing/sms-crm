<template>
  <el-drawer
    title="查看用户"
    :visible.sync="isShow"
    @close="close"
    size="60%"
    :wrapperClosable="false"
    destroy-on-close
  >
    <div>
      <el-form label-width="120px">
        <el-form-item label="用户名" prop="username">
          {{user.username}}
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          {{user.realName}}
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          {{user.phone}}
        </el-form-item><el-form-item label="状态" prop="phone">
          {{status}}
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          {{user.roleNames}}
        </el-form-item>
      </el-form>
    </div>
    <span class="drawer-footer">
        <el-button  size="small" type="primary" @click="toEdit">编辑</el-button>
        <el-button  size="small" type="danger" @click="deleteUser()">删除</el-button>
    </span>
  </el-drawer>
</template>

<script>
  import {deleteUser} from "@/api/authapi";
  export default {
    name:'userShow',
    props:{
      user:{
        type: Object
      },
      isVisible:false,
    },
    computed:{
      status(){
        let v = this.user.status
        if(v == 1){
          return '可用'
        }else if(v == 0){
          return '删除'
        }else if(v == 2){
          return '禁用'
        }else if(v == 3){
          return '离职'
        }
      }
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
      deleteUser(formName) {
        let _this = this;
        _this.$confirm('是否确认删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser(_this.user.id).then(resp=>{
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
    },

  }
</script>
<style scoped>
  .buttons>*{
    margin-top: 10px;
  }
</style>
