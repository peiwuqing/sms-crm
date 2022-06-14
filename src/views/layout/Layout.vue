<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <tags-view/>
      <app-main/>
    </div>

  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
// import { EventBus} from '@/utils/event-bus'
// import {queryCustomerById, getCustomerPhoneList, customerConfig} from "../../api/customerapi";
export default {
  name: 'Layout',
  data(){
    return {
      // questionShow:false,
      questionnaire:"7e2f7a7301fc481980c6d8c6d97ecb2f",
      customerId:"ca1696cbb1f94b99b4c1906712a45570",
      contactId:"1122",
      currentCustomer:{},
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    this.addMask();
    // EventBus.$on('hangup',(resp)=>{
    //   if(this.currentCustomer && this.currentCustomer.id){
    //     let type = this.currentCustomer.consumeType
    //     //获取用户类型，获取配置是否弹出问卷
    //     this.queryCustomerTypeConfig().then(data=>{
    //       if(data&&data.length>0){
    //         data.forEach(e=>{
    //           if(e.key == type && e.value == true){
    //             alert(22222)
    //             this.customerId = this.currentCustomer.id
    //             this.questionnaire = e.question
    //             this.questionShow = true
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
    // EventBus.$on('offering',(resp)=>{
    //   this.currentCustomer ={};
    //   this.contactId = "",
    //   this.contactId = resp.contact_id;
    //   let phoneNo = resp.ani;
    //   //获取客户信息
    //   this.queryCustomerId(phoneNo).then(data=>{
    //     if(data){ //获取到用户，弹屏
    //       this.currentCustomer = data;
    //       this.$router.push({path:`/customer/customerAlert/${data.id}`})
    //     }else{
    //       this.$message.warning("未找到用户");
    //     }
    //   })
    // })
  },
  methods: {
    // onEvent(e){
    //   if(e.cmd == 'questionClose'){
    //     this.questionShow = false
    //   }else if(e.cmd == 'questionSuccess'){
    //     this.questionShow = false
    //   }
    // },
    // async queryCustomerTypeConfig(){
    //   let customerVisitData;
    //   await customerConfig().then( async resp=>{
    //     const data = resp.data || []
    //     data.forEach(e =>{
    //       if(e.code == "customerVisit"){
    //         customerVisitData = JSON.parse(e.itemValue)
    //       }
    //     });
    //   });
    //   return customerVisitData
    // },
    // async queryCustomerId(phoneNo){
    //   let data;
    //   let customer;
    //   await getCustomerPhoneList({phoneNo:phoneNo}).then( async resp=>{
    //     data  = resp.data
    //   })
    //   if(data.length>0){
    //     await queryCustomerById(data[0].customerId).then(async resp=>{
    //       customer = resp.data
    //     })
    //   }
    //   return customer;
    // },
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    },
    addMask(){
      let content  = this.$store.state.user.userData.realName
      let canvas = document.createElement('canvas')
      canvas.id = 'canvas'
      canvas.width = '230' // 单个水印的宽高
      canvas.height = '200'
      this.maskDiv = document.createElement('div')
      let ctx = canvas.getContext('2d')
      ctx.font = 'normal 18px Microsoft Yahei' // 设置样式
      ctx.fillStyle = 'rgba(112, 113, 114, 0.08)' // 水印字体颜色
      ctx.rotate(30 * Math.PI / 180) // 水印偏转角度
      ctx.fillText(content, 30, 20)
      let src = canvas.toDataURL('image/png')
      this.maskDiv.style.position = 'fixed'
      this.maskDiv.style.zIndex = '9999'
      this.maskDiv.id = '_waterMark'
      this.maskDiv.style.top = '30px'
      this.maskDiv.style.left = '0'
      this.maskDiv.style.height = '100%'
      this.maskDiv.style.width = '100%'
      this.maskDiv.style.pointerEvents = 'none'
      this.maskDiv.style.backgroundImage = 'URL(' + src + ')'
      // 水印节点插到body下
      document.body.appendChild(this.maskDiv)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
