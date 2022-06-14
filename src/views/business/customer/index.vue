<template>
  <div>
    <div class="query-item-form">
      <div class="query-item">
        <div class="label">名称:</div>
        <div class="items">
          <el-input v-model="query.name" clearable placeholder="客户姓名"></el-input>
        </div>
      </div>
      <div class="query-item">
        <div class="label">客户编码:</div>
        <div class="items">
          <el-input v-model="query.customerNo" clearable placeholder="客户编码"></el-input>
        </div>
      </div>
      <div class="query-item">
        <div class="label">所属通道:</div>
        <div class="items">
          <el-select v-model="query.channelId" clearable filterable placeholder="所属通道" style="width: 100%">
             <el-option :value="item.id" :label="item.name" :key="item.id" v-for="item in allChannel"/>
          </el-select>
        </div>
      </div>
      <div class="query-item">
        <div class="label">用户名:</div>
        <div class="items">
          <el-input v-model="query.username" clearable placeholder="用户名"></el-input>
        </div>
      </div>
      <div class="buttons">
        <el-button  size="small" type="primary" @click="page.pageNo=1;queryData()"><i class="fa fa-search"/>查询</el-button>
        <el-button  size="small" type="success" @click="toAdd()"><i class="fa fa-plus"/>新增</el-button>
      </div>
    </div>
    <common-table :columns="columns" :data="tableData" :pager="page" @handleSizeChange="handleSizeChange"
                 @handleCurrentChange="handleCurrentChange">
      <el-table-column slot="table_operation" align="center" fixed="right" label="操作" width="220" :resizable="false">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="toShow(scope.row)">详情</el-button>
          <el-button size="small" type="text" @click="toEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="text" @click="deleteRow(scope.row)">删除</el-button>
          <el-button size="small" type="text" @click="recharge(scope.row)">充值</el-button>
        </template>
      </el-table-column>
    </common-table>
      <!--添加-->
      <add   @event="onEvent" :all-channels="allChannel" :is-visible="addShow"/>
      <edit :is-visible="editShow" :all-channels="allChannel"  @event="onEvent" :current-row="currentRow"/>
      <show :current-row="currentRow"  :is-visible="openShow" @event="onEvent"/>
      <recharge :customer="currentRow"  :is-visible="rechargeShow" @event="onEvent"/>
  </div>
</template>

<script>
  import add from "./add";
  import edit from "./edit";
  import show from "./show";
  import {queryChannelPager} from "@/api/channelapi";
  import {queryCustomerPager} from "@/api/customerapi";
  import recharge from "./recharge";
  export default {
    name:'channels',
    components:{
      'add':add,
      'edit':edit,
      'show':show,
      'recharge':recharge
    },

    data() {
      return {
        query:{},
        columns: [
          {prop: 'name', width:'160', label: '名称',fixed:"left", align: 'center'},
          {prop: 'customerNo', width:'160', label: '客户编码', align: 'center'},
          {prop: 'username', width:'160', label: '登录名', align: 'center'},
          {prop: 'channelDesc',label: '所属通道', align: 'center'},
          {prop: 'balance', width:'160', label: '账户余额', align: 'center',formatter(row, column, cellValue){
              return $price(cellValue)
            }},
          {prop: 'notification', label: '通知类价格', width:"200", align: 'center',formatter(row, column, cellValue){
              return $price(cellValue)
            }},
          {prop: 'sales',label: '营销类价格',width:"200", align: 'center',formatter(row, column, cellValue){
            return $price(cellValue)
            }},
          {prop: 'status', label: '状态',width:"80",  align: 'center',formatter(row, column, cellValue){
              if(cellValue == 0){
                return '不可用';
              }else if(cellValue==1){
                return '可用';
              }
            }},
          {prop: 'contact',label: '联系人', align: 'center'},
          {prop: 'phone',width:'120', label: '联系方式', align: 'center'},
          {prop: 'createdAt', label: '创建时间', width:'190',align: 'center',formatter(row, column, cellValue){
            return new $day(cellValue).format("YYYY-MM-DD HH:mm:ss")
            }
          },
        ],
        addShow:false,
        openShow:false,
        editShow:false,
        rechargeShow:false,
        tableData: [],
        allChannel:[],
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
      this.queryChannel();
    },
    methods: {
      queryChannel(){
        queryChannelPager({"pageNo":1,"pageSize":999}).then(resp=>{
          this.allChannel = resp.data.data
        })
      },
      recharge(row){
        this.currentRow = row
        this.rechargeShow = true
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
          deleteChannel(row).then(resp=>{
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
        queryCustomerPager(this.$nullParam(Object.assign(_this.query,_this.page))).then(resp=>{
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
        }else if(e.cmd == 'closeRecharge'){
          that.rechargeShow = false
        }else if(e.cmd == 'rechargeSuccess'){
          that.rechargeShow = false
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
