<template>
  <el-dialog
    title="账户充值"
    :visible.sync="isShow"
    width="50%"
    @close="close"
    @opened="open"
    :wrapperClosable="false"
    destroy-on-close
  >
      <el-form ref="addChannel" :rules="rules" :model="model" label-width="150px">
        <el-form-item label="充值类型" prop="type" v-if="reload">
            <el-radio-group v-model="model.type" @change="changeType">
              <el-radio-button  label="1">正式充值</el-radio-button>
              <el-radio-button  label="2">测试充值</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="充值金额" prop="balance">
          <el-input v-model="model.balance" maxlength="128" placeholder="请输入充值金额" :disabled="!isEditPrice"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="model.remark" maxlength="64" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary"  size="small" @click="submitForm('addChannel')"><i class="fa fa-check"/>提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {recharge} from "@/api/customerapi";
  export default {
    name:'tenantAdd',
    props:{
      isVisible:false,
      allChannels:[],
      customer:{},
    },

    components:{
    },
    watch:{
      isVisible(value){
        this.isShow = value
      }
    },
    data() {
      return {
        isShow:false,
        model:{
          type:'1',
          balance:0,
          remark:'',
        },
        isEditPrice:true,
        reload:false,
        rules: {
          type: [
            { required: true, message: '充值类型必选', trigger: 'blur' }
          ],
          balance: [
            { required: true, message: '通知类价格必填,小数点后最多三位', trigger: 'blur',pattern:/(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,3}$)/ }
          ],
        },
      };
    },
    mounted() {
    },
    methods: {
      changeType(e){
        if(e == 1){
          this.isEditPrice = true
          this.model.balance = 0
        }else{
          this.isEditPrice = false
          this.model.balance = 10
        }
      },
      open(){
        this.model = {
          type:'1',
          balance:0,
          remark:'',
        }
        this.$nextTick(e=>{
          this.reload=true
          this.changeType("1")
        })
      },
      close(){
        this.$emit("event",{cmd:"closeRecharge"})
      },
      submitForm(formName) {
        let _this  = this
        if(this.model.type == 1 && this.model.balance<=0){
          _this.$message.error("充值金额必须大于0")
          return
        }
        _this.model.customerId = _this.customer.id
        this.$refs[formName].validate((valid) => {
          if (valid) {
            recharge(_this.model).then(resp=>{
                if(resp.code == 0){
                  _this.$message.success("充值成功");
                  _this.$emit("event",{cmd:"rechargeSuccess"});
                }else{
                  _this.$message.error(resp.message);
                }
            })
          } else {
            return false;
          }
        });
      },
    }
  }
</script>
<style type="text/css" scoped>
</style>
