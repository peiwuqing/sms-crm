<template>
  <div>
    <div class="query-item-form">
      <div class="query-item">
        <div class="label">模板标题:</div>
        <div class="items">
          <el-input v-model="query.title" clearable placeholder="模板标题"></el-input>
        </div>
      </div>
      <div class="query-item">
        <div class="label">客户名称:</div>
        <div class="items">
          <el-input v-model="query.customerName" clearable placeholder="客户名称"></el-input>
        </div>
      </div>
      <div class="query-item">
        <div class="label">状态:</div>
        <div class="items">
          <el-select v-model="query.status" clearable filterable placeholder="状态" style="width: 100%">
            <el-option value="1" label="正常"/>
            <el-option value="2" label="待审核"/>
            <el-option value="3" label="审核不通过"/>
          </el-select>
        </div>
      </div>
      <div class="buttons">
        <el-button  size="small" type="primary" @click="page.pageNo=1;queryData()"><i class="fa fa-search"/>查询</el-button>
        <el-button  size="small" type="success" @click="toAdd()"><i class="fa fa-plus"/>新增</el-button>
      </div>
    </div>
    <common-table :columns="columns" :data="tableData" :pager="page" @handleSizeChange="handleSizeChange"
                 @handleCurrentChange="handleCurrentChange">
      <el-table-column slot="table_operation" align="center" fixed="right" label="操作" width="180" :resizable="false">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="toShow(scope.row)">详情</el-button>
          <el-button size="small" type="text" @click="toAudit(scope.row)" v-if="scope.row.status == 2">审核</el-button>
          <el-button size="small" type="text" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </common-table>
      <!--添加-->
      <show :current-row="currentRow"  :is-visible="openShow" @event="onEvent"/>
      <audit :current-row="currentRow"  :is-visible="auditShow" @event="onEvent"/>
  </div>
</template>

<script>
  import show from "./show";
  import {queryTemplatePager,deleteTemplate} from "@/api/templateapi";
  import audit from "./audit";
  export default {
    name:'templates',
    components:{
      'show':show,
      'audit':audit,
    },

    data() {
      return {
        query:{},
        columns: [
          {prop: 'customerName', width:'160', label: '客户名称',fixed:"left", align: 'center'},
          {prop: 'title', width:'160', label: '模板标题', align: 'center'},
          {prop: 'status', label: '类型',width:"80",  align: 'center',formatter(row, column, cellValue){
              if(cellValue == 1){
                return '通知类';
              }else if(cellValue==2){
                return '营销类';
              }
            }},
          {prop: 'content', label: '模板内容', width:"200", align: 'center',showTooltip:true},
          {prop: 'status', label: '状态',width:"80",  align: 'center',formatter(row, column, cellValue){
              if(cellValue == 1){
                return '正常';
              }else if(cellValue==2){
                return '待审核';
              }else if(cellValue==3){
                return '审核失败';
              }
            }},
          {prop: 'auditUserDesc',label: '审核人', align: 'center'},
          {prop: 'createdAt', label: '创建时间', width:'190',align: 'center',formatter(row, column, cellValue){
            return new $day(cellValue).format("YYYY-MM-DD HH:mm:ss")
            }
          },
        ],
        openShow:false,
        auditShow:false,
        tableData: [],
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
    },
    methods: {
      toShow(row){
        let _this = this;
        _this.currentRow = row
        _this.openShow = true
      },
      toAudit(row){
        let _this = this;
        _this.currentRow = row;
        _this.auditShow = true
      },
      deleteRow(row) {
        let _this = this;
        _this.$confirm('是否确认删除模板，删除后此模板短信将不可发送?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTemplate(row).then(resp=>{
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
        queryTemplatePager(this.$nullParam(Object.assign(_this.query,_this.page))).then(resp=>{
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
        if(e.cmd == 'closeShow'){
          that.openShow = false
        }else if(e.cmd == 'closeAudit'){
          that.auditShow = false
        }else if(e.cmd == 'auditSuccess'){
          that.auditShow = false
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
