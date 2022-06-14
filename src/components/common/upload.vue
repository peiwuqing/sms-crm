
<template>
  <div class="upload-box">
    <el-upload
      class="avatar-uploader"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :http-request="upload"
      :show-file-list="false"
      :multiple="multiple"
      :on-remove="removeFile"
      :limit="limit"
      :accept="type=='image'?'image/*':'*'"
    >
      <img v-if="fileId && !multiple && fileListCopy.length>0" :src="baseUrl+'api/v1.0/common/download?fileId='+fileId" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="filelist-box" v-if="fileListCopy.length>0">
      <draggable v-model="fileListCopy" datafld="seq" @end="dragEnd">
        <transition-group>
          <div class="file-item" v-for="(item,index) in fileListCopy" :key="item.fileId">
            <div @click="delPhotos(index)" class="del"><i class="fa fa-close"></i></div>
            <img  :src="$baseUrl+'api/v1.0/common/download?fileId='+item.fileId" class="avatar">
          </div>
        </transition-group>
      </draggable>

    </div>
  </div>

</template>

<script>
import {upload} from "../../api/common";
import vuedraggable from 'vuedraggable'
export default {
  name: "upload",
  props:{
    showClose:true,
    type:{
      type: String,
      default:'image'
    },
    image:{
      type:String
    },
    multiple:{
      type:Boolean,
      default: false
    },
    limit:{
      type:Number,
      default:999
    },
    fileList:[]
  },
  data(){
    return{
      fileId:"" ,
      baseUrl:this.$baseUrl,
      fileListCopy:[],
    }
  },
  components:{
    "draggable":vuedraggable
  },
  watch:{
    image(val){
      this.fileId  = val
      if(val){
        this.fileListCopy = [val]
      }
    },
    fileList(newVal,oldVal){
      this.fileListCopy = JSON.parse(JSON.stringify(newVal))
    },
  },
  mounted() {
    this.fileId  = this.image
    if(this.fileList){
      this.fileListCopy =  JSON.parse(JSON.stringify(this.fileList))
    }
    if(this.fileId){
      this.fileListCopy = [this.fileId]
    }
  },
  methods:{
    delPhotos(i){
      this.fileListCopy.splice(i,1)
      this.$emit('sortChange',this.fileListCopy)
      let fileId = '';
      if(this.fileListCopy && this.fileListCopy.length>0){
        fileId = this.fileListCopy[0].fileId
      }
      this.fileId = fileId
      this.$emit('upload', {fileList:this.fileListCopy,fileId:this.fileId});
    },
    dragEnd(){
      this.$emit('sortChange',this.fileListCopy)
    },
    removeFile(file, fileList){
      let list = [];
      this.fileListCopy.forEach(e=>{
        if(e != file.name){
          list.push(e)
        }
      })
      this.fileList = list
      this.$emit('upload', {fileList:this.fileList,fileId:this.fileId});
    },
    upload(param){
      let formData = new FormData();
      formData.append("uploadFile",param.file);
      formData.append("type",this.type);
      let file = {
        name:param.file.name
      }
      upload(formData).then(resp =>{
        if(!this.multiple){
          this.fileId = resp.data.fileId;
          this.$emit('upload', {fileId:resp.data.fileId,fileName:resp.data.fileName});
        }else{
          file.fileId = resp.data.fileId
          this.fileListCopy.push(file)
          this.$emit('upload', {fileList:this.fileListCopy});
        }
      })
    },
  }
}
</script>

<style type="text/css" scoped>
>>>.el-upload , >>>.el-upload-dragger{
  width: 120px;
  height: 120px;
  line-height: 120px;
  font-size: 40px;
}
.el-upload-dragger img{
  width: 120px;
  height: 120px;
}
.upload-box{
  display: flex;
  flex-direction: column;
}
.filelist-box span{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.filelist-box .file-item{
  width: 80px;
  height: 80px;
  position: relative;
  margin-right: 20px;
}
.filelist-box .file-item .del{
  position: absolute;
  right: -10px;
  top:-10px;
  cursor: pointer;
  width: 14px;
  height: 14px;
  display: flex;
}
.filelist-box .file-item img{
  width: 80px;
  height: 80px;
  border-radius: 2px;
}
</style>
