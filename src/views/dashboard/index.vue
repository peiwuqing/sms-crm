<template>
  <div class="wrap">
    <el-image src="/public/images/welcome.png" style="height: 80%"></el-image>
  </div>
</template>

<script>
export default{
  components:{
  },
  data(){
    return {
    }
  },
  created(){
  },
  mounted() {
  },
  methods:{

  }
}
</script>
<style class="text/css" scoped>
.service-box{
  padding: 3px;
}
.card-layout{
  margin-top: 10px;
}
.wrap{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.wel {
  position: absolute;
  left: 0;
  top: 0;
  margin: 30px 30px;
  width: 250px;
  height: 100px;
}
.wel>img{
  width: 250px;
}
.tc{
  position: absolute;
  width: 500px;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.tc>img{
  width: 500px;
}
</style>
