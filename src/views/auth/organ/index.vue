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
          <el-button v-if="currentNode.id" size="small" type="danger" @click="deleteOrgan(currentNode.id)">删除</el-button>
          <el-button  size="small" type="success" @click="add()">新增</el-button>
        </div>
        <div class="right-content">
          <el-form label-width="120px">
            <el-form-item label="部门名称：">
              {{currentNode.name}}
            </el-form-item>
            <el-form-item label="排序：">
              {{currentNode.seq}}
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
  import {queryAllOrgan,queryOrganDetail,deleteOrgan,queryPoolPager,addPool,deletePool,editPool} from "../../../api/authapi";
  export default {
    name:'organs',
    components:{
      add,
      edit,
    },
    data() {
      return {
        tableData: [],
        addShow:false,
        openShow:false,
        editShow:false,
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        query:{

        },
        currentNode:{},
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0
        },
      };
    },
    mounted() {
      this.queryAllOrgan();
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
      toEdit(){
        this.editShow = true
      },
      deleteOrgan(){
        let that = this;
        that.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrgan(that.currentNode.id).then(res =>{
            if(res.code == 0){
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              that.refrashTree()
            }else{
              that.$message.error(res.message);
            }

          })

        }).catch(()=>{});
      },
      add(){
       this.addShow = true
      },
      handleNodeClick(data) {
        queryOrganDetail({id:data.id}).then(resp=>{
            if(resp.code == 0){
              this.currentNode = resp.data
              if(data.pid)
                this.currentNode.parentNode = this.findNodeParent(this.data,data.pid)
              this.queryPoolData();
            }else{
              this.$message.error("获取部门详情数据失败");
            }
        })
        // this.openShow = true
      },
      queryAllOrgan(){
        queryAllOrgan().then((data)=>{
          this.data = data.data
          if(this.data.length>0){
            this.handleNodeClick(this.data[0])
          }
        })
      },
      refrashTree(){
        this.queryAllOrgan();
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
      queryPoolData(){
        let _this = this;
        _this.query.organId = _this.currentNode.id;
        queryPoolPager(_this.$nullParam(Object.assign(_this.query,_this.page))).then(resp=>{
          if(resp.code == 0){
            _this.tableData = resp.data.data
            _this.page.total = resp.data.totalRows
          }else{
            _this.$message.error("获取数据失败");
          }
        })
      },
      submitAddForm(formName) {
        let _this = this;
        _this.pool.organId = _this.currentNode.id
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addPool(_this.pool).then(resp=>{
              if(resp.code == 0){
                _this.$message.success("添加成功");
                _this.resetForm(formName)
                _this.addPoolShow=false
                _this.queryPoolData()
              }else{
                _this.$message.error(resp.message);
              }
            })
          } else {
            return false;
          }
        });
      },
      submitEditForm(formName) {
        let _this = this;
        _this.pool.organId = _this.currentNode.id
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editPool(_this.pool).then(resp=>{
              if(resp.code == 0){
                _this.$message.success("更新成功");
                _this.resetForm(formName)
                _this.editPoolShow=false
                _this.queryPoolData()
              }else{
                _this.$message.error(resp.message);
              }
            })
          } else {
            return false;
          }
        });
      },
      editPool(row){
        this.pool = row
        this.pool.type = this.pool.type + "";
        this.pool.isDefault = this.pool.isDefault + "";
        console.log(this.pool);
        this.editPoolShow = true
      },
      toAddPool(){
        this.pool = {
          name:'',
          isDefault:0
        }
        this.addPoolShow = true
      },
      deletePool(row){
        let that = this;
        that.$confirm('是否确认删除公海?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePool({id:row.id}).then(res =>{
            if(res.code == 0){
              that.$message.success("删除成功");
              that.queryPoolData();
            }else{
              that.$message.error(res.message);
            }
          })
        }).catch(()=>{});
      },
      resetForm(formName) {
        if(this.$refs[formName])
          this.$refs[formName].resetFields();
        this.pool = {}
      },
      // 改变页面大小处理
      handleSizeChange(val) {
        this.page.pageSize = val
        this.queryPoolData();
      },
      // 翻页处理
      handleCurrentChange(val) {
        this.page.pageNo = val
        this.queryPoolData();
      },

    }
  }
</script>
