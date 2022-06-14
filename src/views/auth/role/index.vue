<template>
  <div>
    <el-form :inline="true" :model="query" ref="queryForm" class="query-form">
      <el-form-item label="角色名">
        <el-input v-model="query.name" clearable placeholder="角色名"></el-input>
      </el-form-item>
      <el-form-item  style="float: right">
        <el-button  size="small" type="primary" @click="queryData()">查询</el-button>
        <el-button  size="small" type="success" @click="toAdd()">新增</el-button>
      </el-form-item>
    </el-form>
    <common-table :columns="columns" :data="tableData" :pager="page" @handleSizeChange="handleSizeChange"
                 @handleCurrentChange="handleCurrentChange">
      <el-table-column slot="table_operation" align="center" label="操作" width="180" :resizable="false">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="toShow(scope.row)">查看</el-button>
          <el-button size="small" type="text" @click="toEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="text" @click="deleteRole(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </common-table>
      <!--添加-->
      <add  :tree="tree" @event="onEvent" :is-visible="addShow"/>
      <edit :is-visible="editShow" :tree="tree"  @event="onEvent" :role="currentRow"/>
      <show :role="currentRow" :tree="tree" :is-visible="openShow" @event="onEvent"/>
  </div>
</template>

<script>
  import add from "./add";
  import edit from "./edit";
  import show from "./show";
  import {queryAllMenu, deleteRole,queryRoles,queryRoleById} from "../../../api/authapi";
  export default {
    name:'roles',
    components:{
      'add':add,
      'edit':edit,
      'show':show
    },
    data() {
      return {
        query:{},
        columns: [
          {prop: 'name', label: '角色名称', width: '200', align: 'center'},
          {prop: 'createdAt', label: '创建时间', align: 'center',formatter(row, column, cellValue){
            return new $day(cellValue).format("YYYY-MM-DD HH:mm:ss")
            }
          },
        ],
        addShow:false,
        openShow:false,
        editShow:false,
        tableData: [],
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0
        },
        tree:[],
        currentRow:{},
      }
    },
    mounted() {
      this.queryData();
    },
    methods: {
      toAdd(){
        queryAllMenu().then((data)=>{
          this.tree = data.data
          this.addShow = true
        })
      },
      toShow(row){
        let _this = this;
        queryRoleById(row.id).then(role=>{
          _this.currentRow = role.data;
          queryAllMenu().then((data)=>{
            _this.tree = data.data
            _this.openShow = true
          })
        })

      },
      toEdit(row){
        let _this = this;
        queryRoleById(row.id).then(role=>{
          _this.currentRow = role.data;
          queryAllMenu().then((data)=>{
            _this.tree = data.data
            _this.editShow = true
          })
        })
      },
      deleteRole(row) {
        let _this = this;
        _this.$confirm('是否确认删除,将会清除所有用户下的当前角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRole(row.id).then(resp=>{
            if(resp.code == 0){
              _this.$message.success("删除成功");
              _this.queryData();
            }else{
              _this.$message.error(resp.message);
            }
          })
        });
      },
      queryData(){
        let _this = this;
        queryRoles(Object.assign(_this.query,_this.page)).then(resp=>{
          if(resp.code == 0){
            _this.tableData = resp.data.data
            _this.page.total = resp.data.totalRows
          }else{
            _this.$message.error("获取数据失败");
          }
        })
      },
      onEvent(e){
        let that = this;
        if(e.cmd == 'edit'){
          that.editShow = true
          that.openShow = false
        }else if(e.cmd == 'delete'){
          that.openShow = false
          that.queryData()
        }else if(e.cmd == 'closeAdd'){
          that.addShow = false
        }else if(e.cmd == 'closeShow'){
          that.openShow = false
        }else if(e.cmd == 'closeEdit'){
          that.editShow = false
        }else if(e.cmd == 'addSuccess'){
          that.addShow = false
          that.queryData()
        }else if(e.cmd == 'editSuccess'){
          that.editShow = false
          that.queryData()
        }
      },
      // 改变页面大小处理
      handleSizeChange(val) {
         this.page.pageSize = val
         this.queryData();
      },
      // 翻页处理
      handleCurrentChange(val) {
        this.page.pageNo = val
        this.queryData();
      },
      editTableData(row) {
        this.openOperation(row)
      },
    },
  }
</script>
