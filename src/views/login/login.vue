<template>
  <div class="container">
    <div class="login-body">
      <div class="login-bg">
        <h2>智能短信平台</h2>
        <div class="login-left-item"><i class="fa fa-sitemap signin-icon"/> <span>快速高效</span></div>
        <div class="login-left-item"><i class="fa fa-server signin-icon"/> <span>安全稳定</span></div>
        <div class="login-left-item"><i class="fa fa-tv signin-icon"/> <span>智慧办公</span></div>
        <div class="login-left-item"><i class="fa fa-bar-chart signin-icon"/> <span>销售利器</span></div>
      </div>
<!--      <img class="login-bg" src="/public/images/login-bg.png"/>-->
      <div class="login-box">
        <h2>登录</h2>
        <div class="login-input">
      <el-form :model="loginForm" status-icon @keyup.enter.native="submitForm('loginForm')"  ref="loginForm" label-width="80px">
        <el-form-item label="用户名" prop="username" :rules="[{required:true,message: '用户名不能为空'}]">
          <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password"  :rules="[{required:true,message: '密码不能为空'}]">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" autocomplete="off" ></el-input>
        </el-form-item>
<!--        <el-form-item label="验证码" prop="validCode"  :rules="[{required:true,message: '验证码不能为空'},{ validator: checkValidate,  trigger: 'blur' }]">-->
<!--          <el-col :span="16">-->
<!--            <el-input placeholder="请输入验证码" v-model="loginForm.validCode">-->
<!--            </el-input>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <v-sidentify :value.sync="validCode"></v-sidentify>-->
<!--          </el-col>-->
<!--        </el-form-item>-->
    <!--    <el-button @click="plus">+</el-button>
        <el-button @click="minus(2)">-</el-button> -->
      </el-form>
        </div>
        <el-button type="primary" @click="submitForm('loginForm')" class="login-btn">登录</el-button>
      </div>
      </div>
  </div>
</template>
<script>
    export default {
      components: {
      },
      data() {
        return {
          validCode:'',
          loginForm: {
            username: '',
            password: '',
            // validCode:''
          },
          // checkValidate: (rule,value,callback)=>{
          //   if(value.toLowerCase() == this.validCode.toLowerCase()){
          //     callback();
          //   }else{
          //     callback(new Error("验证码错误"));
          //   }
          // }
          //redirect: '/redirect'
        };
      },
      mounted() {
      },
      methods: {
        submitForm(formName) {
          var _this = this;
          _this.$refs[formName].validate((valid) => {
            if (valid) {
              _this.login();
            } else {
              return false;
            }
          });
        },
        login(){
          this.$store.dispatch('LoginByUsername', this.loginForm).then((data) => {
            this.$router.replace({ path: this.redirect || '/dashboard' })
            // let content  = this.$store.state.user.userData.realName
            // if(this.$store.state.user.userData.staffNo){
            //   content +='['+this.$store.state.user.userData.staffNo+']'
            // }
            //
            // let canvas = document.createElement('canvas')
            // canvas.id = 'canvas'
            // canvas.width = '230' // 单个水印的宽高
            // canvas.height = '200'
            // this.maskDiv = document.createElement('div')
            // let ctx = canvas.getContext('2d')
            // ctx.font = 'normal 18px Microsoft Yahei' // 设置样式
            // ctx.fillStyle = 'rgba(112, 113, 114, 0.08)' // 水印字体颜色
            // ctx.rotate(30 * Math.PI / 180) // 水印偏转角度
            // ctx.fillText(content, 30, 20)
            // let src = canvas.toDataURL('image/png')
            // this.maskDiv.style.position = 'fixed'
            // this.maskDiv.style.zIndex = '9999'
            // this.maskDiv.id = '_waterMark'
            // this.maskDiv.style.top = '30px'
            // this.maskDiv.style.left = '0'
            // this.maskDiv.style.height = '100%'
            // this.maskDiv.style.width = '100%'
            // this.maskDiv.style.pointerEvents = 'none'
            // this.maskDiv.style.backgroundImage = 'URL(' + src + ')'
            // // 水印节点插到body下
            document.body.appendChild(this.maskDiv)
          }).catch(() => {
          })
        },

      }
    }
  </script>
<style type="text/css" scoped>
  .login-bg{
    height: 320px;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    background: rgba(29, 137, 207, .8);
  }
  .login-bg h2{
    margin-top: 30px;
  }
  .login-left-item{
    font-size: 14px;
    margin-top: 20px;
  }
  .container{
    width: 100vw;
    height: 100vh;
    background: url("/public/images/bg-3.jpeg") no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-body{
    width: 700px;
    height: 320px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .login-box{
    background: white;
    height: 320px;
    flex: 1;
    padding: 10px 10px 10px 10px;
    text-align: center;
    position: relative;
  }
  .login-box h2{
    color: #777;
    font-size: italic;
  }
  .el-input{
    height: 50px;
  }
  >>>.el-form-item .el-form-item__label{
    font-size: 16px;
    line-height: 50px;
  }
  >>>.el-input .el-input__inner{
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .login-input{
    width: 90%;
  }
  .ValidCode{
    border: 1px solid #DCDFE6;
    background-color: white;
    border-radius: 4px;
    float: right;
  }
  .login-btn{
    margin: 10px auto;
    width: 70%;
    height:50px ;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    background: #1d89cf;
    border-radius: 30px;
    transition: all .3s;
  }
  .login-btn:hover{
    background-color: #337ab7;
  }
  >>>.el-input__suffix .el-input__validateIcon{
    font-size: 20px;
    color: #008489;
  }
</style>



