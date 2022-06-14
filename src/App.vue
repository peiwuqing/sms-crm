<template>
<div id="app">
    <router-view/>
</div>
</template>

<script>
  export default {
    name: 'app',
    data() {
        return {
          // inputText:this.$store.state.user.userData?this.$store.state.user.userData.realName:null
        };
    },
    mounted() {
       // if(this.inputText && this.inputText != ''){
       //   this.init()
       // }
    },
  components: {

    },
    methods:{
      init () {
        let content  = this.$store.state.user.userData.name
        let canvas = document.createElement('canvas')
        canvas.id = 'canvas'
        canvas.width = '200' // 单个水印的宽高
        canvas.height = '130'
        this.maskDiv = document.createElement('div')
        let ctx = canvas.getContext('2d')
        ctx.font = 'normal 18px Microsoft Yahei' // 设置样式
        ctx.fillStyle = 'rgba(112, 113, 114, 0.1)' // 水印字体颜色
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
      },
    }
}
</script>
<style type="text/css">
  #app{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  audio::-webkit-media-controls {
    　　overflow: hidden !important
  }
  audio::-webkit-media-controls-enclosure {
    　　width: calc(100% + 32px);
    　　margin-left: auto;
  }
</style>
