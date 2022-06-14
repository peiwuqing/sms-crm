<template>
  <div>
    <el-form :inline="true" :model="query" ref="queryForm" class="query-form">
      <el-form-item label="租户名称">
        <el-input v-model="query.name" clearable placeholder="租户名称"></el-input>
      </el-form-item>
      <el-form-item label="租户编码">
        <el-input v-model="query.code" clearable placeholder="租户编码"></el-input>
      </el-form-item>
      <el-form-item label="所属用户">
        <el-select v-model="query.userId" clearable filterable placeholder="所属用户" clearable>
          <el-option v-for="data in allUsers" :key="data.id" :label="data.realName+'['+data.staffNo+']'" :value="data.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select placeholder="状态" clearable v-model="query.status">
          <el-option label="可用" value="1"/>
          <el-option label="不可用" value="0"/>
        </el-select>
      </el-form-item>
      <el-form-item  style="float: right">
        <el-button  size="small" type="primary" @click="queryData()">查询</el-button>
        <el-button  size="small" type="success" @click="toAdd()">新增</el-button>
      </el-form-item>
    </el-form>
    <common-table :columns="columns" :data="tableData" :pager="page" @handleSizeChange="handleSizeChange"
                 @handleCurrentChange="handleCurrentChange">
      <el-table-column slot="table_operation" align="center" fixed="right" label="操作" width="180" :resizable="false">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="toShow(scope.row)">查看</el-button>
          <el-button size="small" type="text" @click="toEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="text" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </common-table>
      <!--添加-->
      <add   @event="onEvent" :all-users="allUsers" :is-visible="addShow"/>
      <edit :is-visible="editShow" :all-users="allUsers"  @event="onEvent" :current-row="currentRow"/>
      <show :current-row="currentRow"  :is-visible="openShow" @event="onEvent"/>
  </div>
</template>

<script>
  import add from "./add";
  import edit from "./edit";
  import show from "./show";
  import {queryTenantPager, deleteTenant} from "@/api/tenantapi";
  import {queryAllUsers} from "../../../api/authapi";
  export default {
    name:'tenantlist',
    components:{
      'add':add,
      'edit':edit,
      'show':show,
    },

    data() {
      return {
        query:{},
        columns: [
          {prop: 'name', width:'160', label: '名称',fixed:"left", align: 'center'},
          {prop: 'code', width:'160', label: '编码', align: 'center'},
          {prop: 'status', label: '状态',width:"80",  align: 'center',formatter(row, column, cellValue){
              if(cellValue == 0){
                return '不可用';
              }else if(cellValue==1){
                return '可用';
              }
            }},
          {prop: 'nickName',label: '店铺名称', width:'120', align: 'center'},
          {prop: 'contact',label: '联系人', align: 'center'},
          {prop: 'phone',width:'120', label: '联系方式', align: 'center'},
          {prop: 'address', label: '地址', width:"200", align: 'center'},
          {prop: 'userDesc',label: '所属用户', align: 'center'},
          {prop: 'createdAt', label: '创建时间', width:'190',align: 'center',formatter(row, column, cellValue){
            return new $day(cellValue).format("YYYY-MM-DD HH:mm:ss")
            }
          },
        ],
        addShow:false,
        openShow:false,
        editShow:false,
        tableData: [],
        allUsers:[],
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0
        },
        currentRow:{},
      }
    },
    mounted() {
      this.queryData();
      this.queryAllUser();
    },
    methods: {
      queryAllUser(){
        queryAllUsers().then(resp=>{
          const data = resp.data || [];
          this.allUsers  = data
        })
      },
      toAdd(){
        this.addShow = true
      },
      toShow(row){
        let _this = this;
        _this.currentRow = row
        _this.openShow = true
      },
      toEdit(row){
        let _this = this;
        _this.currentRow = row;
        _this.editShow = true
      },
      deleteRow(row) {
        let _this = this;
        _this.$confirm('是否确认删除租户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenant(row).then(resp=>{
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
        queryTenantPager(this.$nullParam(Object.assign(_this.query,_this.page))).then(resp=>{
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
    },
  }
</script>
<style scoped type="text/css">
</style>
