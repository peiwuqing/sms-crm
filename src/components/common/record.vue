
<template>
  <div class="record" v-if="recordSrc != ''">
    <div class="audio-box">
      <div class="close-audio" @click="closeAudio">×</div>
      <audio  ref="recordAudio" controlsList="nodownload" @contextmenu.prevent="false" autoplay controls>
        <source :src="recordSrc">
      </audio>
    </div>

  </div>
</template>

<script>
    export default {
        name: "record",
        computed:{
          recordSrc:{
            set(val){
            },
            get(){
              return this.$store.getters.recordSrc
            }
          }
        },
        watch:{
          'recordSrc':function(val){
              this.recordSrc = val
          }
        },
        data(){
          return{
          }
        },
      methods:{
        closeAudio(){
          this.$refs['recordAudio'].pause()
          this.$store.dispatch("setRecordSrc","")
        }
      }
    }
</script>

<style scoped>
    .record{
      float: right;
    }
    .audio-box{
      position: relative;
    }
    .record audio{
      height: 45px;
    }
  .close-audio{
    border-radius: 10px;
    text-align: center;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 16px;
    z-index: 9999;
  }
</style>
