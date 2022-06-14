<template>
  <div>
    <el-form :inline="true" :model="query" ref="queryForm" class="query-form">
      <el-form-item label="用户名">
        <el-input v-model="query.username" clearable placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="工号">
        <el-input v-model="query.staffNo" clearable placeholder="工号"></el-input>
      </el-form-item>
      <el-form-item  style="float: right">
        <el-button type="primary"  size="small" @click="queryData()">查询</el-button>
        <el-button type="success"  size="small" @click="toAdd()">新增</el-button>
      </el-form-item>
    </el-form>
    <common-table :columns="columns" :data="tableData" :pager="page" @handleSizeChange="handleSizeChange"
                 @handleCurrentChange="handleCurrentChange">
      <el-table-column slot="table_operation" align="center" label="操作" width="200" :resizable="false">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="toShow(scope.row)">查看</el-button>
          <el-button size="small" type="text" @click="toEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="text" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </common-table>
      <!--添加-->
      <add  :tree="tree"  :userPList="userPList"  @event="onEvent" :is-visible="addShow"/>
      <edit :is-visible="editShow"  :userPList="userPList" :tree="tree" :user="currentRow"  @event="onEvent" />
      <show :user="currentRow" :is-visible="openShow" @event="onEvent"/>
  </div>
</template>

<script>
  import add from "./add";
  import edit from "./edit";
  import show from "./show";
  import inputTree from "../../../components/common/inputTree";
  import {deleteUser, queryUsers,queryAllOrgan,queryUserById} from "../../../api/authapi";
  export default {
    name:'users',
    components:{
      'add':add,
      'edit':edit,
      'show':show,
      'input-tree':inputTree,
    },
    data() {
      return {
        query:{
          type:"1"
        },
        columns: [
          {prop: 'realName', label: '姓名', width: '80', align: 'center'},
          {prop: 'username', label: '用户名', align: 'center'},
          {prop: 'phone', label: '手机号', align: 'center'},
          {prop: 'status', label: '状态', align: 'center',formatter(row, column, cellValue){
                if(cellValue == 0){
                  return "已删除"
                }else if(cellValue == 1){
                  return "可用"
                }else if(cellValue == 2){
                  return "禁用"
                }else if(cellValue == 3){
                  return "已离职"
                }
            }},
          {prop: 'createdAt', label: '创建时间', align: 'center',formatter(row, column, cellValue){
            return new $day(cellValue).format("YYYY-MM-DD HH:mm:ss")
            }
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        roles:[],
        addShow:false,
        openShow:false,
        editShow:false,
        itemShow:false,
        tableData: [],
        userPList:[],
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
        this.addShow = true
      },
      toEdit(row){
        let _this = this;
        queryUserById(row.id).then(user=>{
          _this.currentRow = user.data;
          _this.editShow = true
        })
      },
      deleteUser(row){
        let _this = this;
        _this.$confirm('是否确认删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser(row.id).then(resp=>{
            if(resp.code == 0){
              _this.$message.success("删除成功");
              _this.queryData();
            }else{
              _this.$message.error(resp.message);
            }
          })
        });
      },
      toShow(row){
        let _this = this;
        queryUserById(row.id).then(user=>{
          _this.currentRow = user.data;
          _this.openShow = true
        })
      },
      queryData(){
        let _this = this;
        queryUsers(_this.$nullParam(Object.assign(_this.query,_this.page))).then(resp=>{
          if(resp.code == 0){
            _this.tableData = resp.data.data
            _this.page.total = resp.data.totalRows
          }else{
            _this.$message.error("获取数据失败");
          }
        });
      },
      selectOrgan(selectionData){
        this.query.organId = selectionData
      },
      toPartTime(row){
        let _this = this;
        _this.currentRow = row;
        _this.itemShow = true
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
        }else if(e.cmd == 'closeItem'){
          that.itemShow = false
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
