<template>
  <el-drawer
    title="审核模板"
    :visible.sync="isShow"
    size="50%"
    @close="close"
    @opened="open"
    :wrapperClosable="false"
    destroy-on-close
  >
      <el-form  size="small" label-width="120px">
        <el-form-item label="客户名称:">
          {{currentRow.customerName}}
        </el-form-item>
        <el-form-item label="模板ID:">
          {{currentRow.templateId}}
        </el-form-item>
        <el-form-item label="模板类型:">
          {{currentRow.type == 1?'通知类':'营销类'}}
        </el-form-item>
        <el-form-item label="短信预览:">
          {{currentRow.content}}【{{currentRow.signDesc}}】
        </el-form-item>
      </el-form>
      <h3 style="margin:20px">审核</h3>
      <el-form ref="audit" :rules="rules" :model="model" label-width="150px">
        <el-form-item label="审核结果" prop="status">
          <el-radio-group v-model="model.status">
            <el-radio-button  label="1">通过</el-radio-button>
            <el-radio-button  label="3">不通过</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="拒绝原因" prop="remark" v-if="model.status == 3">
          <el-input v-model="model.remark" type="textarea" maxlength="255" placeholder="请输入拒绝原因，不能超过255个字符"></el-input>
        </el-form-item>
      </el-form>
    <div class="drawer-footer">
      <el-button type="primary"  size="small" @click="submitForm('audit')"><i class="fa fa-check"/>提交</el-button>
    </div>
  </el-drawer>
</template>

<script>
import {audit} from '@/api/templateapi'
export default {
  name:'tenantShow',
  props:{
    currentRow:{
      type: Object
    },
    isVisible:false,
  },
  components:{
  },
  computed:{
  },
  data() {
    return {
      isShow:false,
      model:{
        status:'1'
      },
      rules: {
        remark:[
          { required: true, message: '拒绝原因必填', trigger: 'blur'}
        ],
        status:[
          { required: true, message: '审核结果必选', trigger: 'blur' }
        ]
      },
    }
  },
  watch:{
    isVisible(value){
      this.isShow = value
    }
  },
  methods: {
    close(){
      this.$emit("event",{cmd:"closeAudit"})
    },
    submitForm(formName) {
      let _this  = this
      _this.model.id = _this.currentRow.id
      this.$refs[formName].validate((valid) => {
        if (valid) {
          audit(_this.model).then(resp=>{
            if(resp.code == 0){
              _this.$message.success("操作成功");
              _this.$emit("event",{cmd:"auditSuccess"});
            }else{
              _this.$message.error(resp.message);
            }
          })
        } else {
          return false;
        }
      });
    },
    open() {
      this.model = {
        status : '1'
      }
    }
  },

}
</script>
<style type="text/css" scoped>
</style>
