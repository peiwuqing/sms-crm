<template>
  <div class="navbar">
    <audio id="alarmPlay" style="display:none" src="/public/alarm.mp3"></audio>
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <!-- <breadcrumb class="breadcrumb-container"/> -->
<!--    <softphone class="softphone-bar"></softphone>-->
    <div class="right-menu">
<!--      <div class="message" v-if="isPaly" >-->
<!--        <i class="fa fa-volume-up"  @click="closeSound"></i>-->
<!--      </div>-->
<!--      <div class="message" v-else>-->
<!--        <i class="fa fa-volume-off" style="color:  #ff0000;"  @click="closeSound"></i>-->
<!--      </div>-->
<!--      <div class="message">-->
<!--        <i class="el-icon-bell icon" @click="toMessage"></i>-->
<!--      </div>-->
      <template v-if="device!=='mobile'">
        <screenfull class="right-menu-item hover-effect"/>
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          {{ realName }}
<!--          <img :src="avatar&&avatar!=''?avatar:path" class="user-avatar">-->
<!--          <i class="el-icon-caret-bottom"/>-->
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="showEditUserInfo">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <record-audio/>
    <el-drawer
      :visible.sync="userInfoShow"
      size="50%"
      title="编辑个人信息"
      append-to-body
      @opened="open"
    >

      <div class="update-user-info">
            <el-form ref="userReset"  :model="user" :rules="rules" label-width="80px">
              <el-form-item label="新密码" prop="password">
                <el-input v-model="user.password" type="password" show-password placeholder="新密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="user.confirmPassword" type="password" show-password placeholder="确认新密码"></el-input>
              </el-form-item>
            </el-form>
            <span class="drawer-footer">
              <el-button type="primary" size="small" @click="submitForm('userReset')">提交</el-button>
            </span>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import myUpload from 'vue-image-crop-upload'
import record from '@/components/common/record'

// import Softphone from '@/components/Softphone'
import {resetPwd} from '@/api/authapi'
import socketio from 'socket.io-client';
export default {
  data(){
    let validatePassword=(i,j,callback)=>{
      if(!j || j == ''){
        callback(new Error("确认密码必填"));
      }else{
        if(j == this.user.password){
          callback()
        }else{
          callback(new Error("确认密码与密码必须一致"));
        }
      }

    };
    return {
      activeName:"first",
      drawer:false,
      isPaly:true,//声音开关
      user:{
      },
      info:{
        id:this.$store.getters.user.id,
        deviceNo:this.$store.getters.user.deviceNo,
        phone:this.$store.getters.user.phone,
      },
      path:'/public/images/timg.jpeg',
      realName:this.$store.getters.user.realName,
      params:{},
      headers:{},
      show:false,
      audioContext:'',
      audioBuffer:'',
      imgDataUrl: '',
      uploadUrl:this.$baseUrl,
      chatStatus:{},
      isAgent:false,
      userInfoShow:false,
      rules: {
        confirmPassword:[
          { required: true,validator:validatePassword,  trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' }
        ]
      },
      socket:{}
    }
  },
  created(){
  },
  mounted() {
    this.imgDataUrl = this.avatar&&this.avatar!=''?this.avatar:this.path

  },
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    myUpload,
    // Softphone,
    'record-audio':record
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device',
      'agentState'
    ]),
    chatStatusCss(){
      return this.agentState+"-status";
    }
  },

  destroyed(){
    //window.removeEventListener('beforeunload', e => this.agentLogout());
  },
  methods: {
    init_socket(){
      var that = this;
      var socket = socketio(socketUrl,{
        path:'',
        transports:['websocket', 'xhr-polling', 'jsonp-polling'],
      });
      socket.on('connect',function(e){
        socket.emit('subscribe',{topics:[{id:that.$store.state.user.userData.id}]})
        socket.on('event',function(data){
          that.handleMessage(data);
        })
      })
      this.initIsPlay()
    },
    initIsPlay(){
      let son = localStorage.getItem("son")
      if(son != 'off'){
        this.isPaly = true
      }else{
        this.isPaly = false
      }
    },
    handleMessage(data){
      let that = this;
      this.$notify({
        title: data.title,
        message: data.content,
        onClick: ()=>that.$router.push({path:'/auth/message'})
      });
      if(this.isPaly){
        this.play()
      }
    },
    toMessage(){
      this.$router.push({path:'/auth/message'})
    },
    closeSound(){
      console.log(1)
      let son = localStorage.getItem("son")
      if(son == 'off'){
        localStorage.setItem("son","on")
        this.isPaly = true
      }else{
        localStorage.setItem("son","off")
        this.isPaly = false
      }
    },
    play(){
      var player = document.getElementById("alarmPlay");
      if(!player.paused){
        player.pause();
      }else{
        player.play()
      }
    },
    showEditUserInfo(){
      this.userInfoShow = true
    },
    submitForm(fromName) {
      let currentUserId = this.$store.getters.user.id;
      let _this = this
      _this.$refs[fromName].validate((valid) => {
        if (valid) {
            resetPwd(_this.user).then(resp=>{
              if(resp.code == 0){
                _this.$message.success("修改成功");
                _this.userInfoShow = false
              }else{
                _this.$message.error(resp.message);
              }
            })
        } else {
          return false;
        }
      });
    },
    cropSuccess(imgDataUrl, field){
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field){
      this.imgDataUrl = config[config.profile].imgUrl+jsonData.data.fileId;
      this.user.fileId = jsonData.data.fileId
      this.user.photo = this.imgDataUrl
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field){
    },
    open(){
      this.show = !this.show;
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    updateInfo(){
      this.drawer = !this.drawer
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-tabs{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.el-tabs__content{
  flex: 1;
}
.update-user-info{
  padding: 0px 20px;
  height: 100%;
}
.el-tab-pane{
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-form{
    flex: 1;
  }
}
.navbar {
  height: 50px;
  overflow: hidden;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    flex-direction: row;
    .message{
      height: 100%;
      display: flex;
      margin-right: 5px;
      align-items: center;
      i{
        cursor: pointer;
        font-size: 26px;
      }
    }
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<style lang="scss">

   .idle-status{
       color:green;
       font-weight: bolder;
   }
     .busy-status{
       color:red;
       font-weight: bolder;
   }
     .offline-status{
       color:#ddd;
       font-weight: bolder;
   }

  .chat-status{
    font-size:14px;
    font-weight: bold;
  }
  .state-squ{
    display:block;
    width:10px;
    height:10px;
    margin-right:4px;
  }
  .state-item{
     display:flex;
     align-items: center;

    .idle-state{
      background:green;
      font-weight: bold;
    }
    .busy-state{
      background:red;
      font-weight: bold;
    }
    .offline-state{
      background:#ddd;
      font-weight: bold;
    }
  }

  .softphone-bar{
     float:left;
     margin-left: 20px;
     line-height: 46px;
  }
</style>
