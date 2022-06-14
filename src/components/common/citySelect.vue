
<template>
  <div style="width: 100%">
    <el-cascader clearable style="width: 100%" :props="props" v-model="data" placeholder="请选择" @change="handleChange"></el-cascader>
  </div>
</template>

<script>
  import {queryRegion} from "@/api/common";
    export default {
        name: "city-select",
        props:{
          datas:{
            type:Array
          }
        },
        watch:{
          datas:{
            handler(value,old){
              if(value)
                this.data = JSON.parse(JSON.stringify(value))
            },
            deep:true,
            immediate:true
          }
        },
        data(){
          return{
            result:'',
            data:[],
            props:{
              lazy:true,
              lazyLoad(node,resolve){
                queryRegion({level:node.level+1,pid:node.data?node.data.value:null}).then(resp => {
                  const data = resp.data || []
                  let items = [];
                  data.forEach((d,i)=>{
                    let o = {
                      label:d.name,
                      value:d.id,
                      leaf:node.level>=2 || d.name=='钓鱼岛'
                     }
                    items.push(o)
                  })
                  resolve(items)
                });

              }
            }
          }
        },
      mounted() {
        if(this.datas)
          this.data = JSON.parse(JSON.stringify(this.datas))
      },
      methods:{
        handleChange(val){
           this.$emit("event",val)
        },
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
