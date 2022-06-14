<template>
  <el-drawer
    title="更新部门"
    :visible.sync="isShow"
    @open="initTree"
    @close="close"
    size="60%"
    :wrapperClosable="false"
    destroy-on-close
  >
    <div>
      <el-form ref="editMenu" :rules="rules" :model="organ" label-width="80px">
        <el-form-item label="父部门">
          <el-tree :data="treeData"
                   :props="defaultProps"
                   node-key="id"
                   show-checkbox
                   :default-expanded-keys="[organ.id]"
                   :check-strictly="true"
                   ref="editOrganTree"
                   @check="changeChecked"
          ></el-tree>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="organ.name" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="seq">
          <el-input @blur="organ.seq = $event.target.value" onkeyup="value=value.replace(/[^\d]/g,'');value=value.indexOf('e')>0?0:value<0?0:value>9999?9999:value"  v-model.number="organ.seq"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span class="drawer-footer">
      <el-button  size="small" type="primary" @click="submitForm('menu')">提交</el-button>
    </span>
  </el-drawer>
</template>

<script>
  import {editOrgan} from "@/api/authapi";
  export default {
    name:'organEdit',
    props:{
      tree:{
        type:Array
      },
      currentNode:{
        type:Object
      },
      isVisible:false
    },
    data() {
      return {
        isShow:false,
        treeData:[],
        organ:{},
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
        }
      };
    },
    watch:{
      isVisible(value){
        this.isShow = value
      }
    },
    computed:{
    },
    methods: {
      submitForm(){
        let that = this;
        if(that.treeCheck.checkedId){
          that.organ.parentId = that.treeCheck.checkedId
        }
        this.$refs['editMenu'].validate((valid) => {
          if (valid) {
            editOrgan(that.organ).then(resp=>{
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
      initTree() {
        //复制一份树节点，将第三级设置为不可用
        let tree = JSON.parse(JSON.stringify(this.tree))
        this.treeData = tree
        this.organ = JSON.parse(JSON.stringify(this.currentNode))
        this.getAllNode(this.treeData,this.organ.id)
      },
      changeChecked(data){
        this.treeCheck.checkedKeys = data.id;
        this.treeCheck.checkedId = data.id
        this.$refs.editOrganTree.setCheckedKeys([data.id]);
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
