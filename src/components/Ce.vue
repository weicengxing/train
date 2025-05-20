<template>
   
    <el-upload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
     :limit="1"
    
     ref="upload"
     list-type="picture-card" 
      :on-exceed="handleExceed"
      :auto-upload="false"
    
    >
      <!-- <el-button type="primary"  >select file</el-button> -->
      <template #file="{ file }">
      <div>
        <!-- <img class="el-upload-list__item-thumbnail" src="" alt="" /> -->
        <span class="el-upload-list__item-actions">
          <!-- <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span> -->
          <el-button type="primary" @click="handlePictureCardPreview(file)" 
              >确定
              <el-icon><Finished /></el-icon></el-button
            >
        </span>

      </div>
     
    </template>
    

   
  
    
    </el-upload>
    <input
      style="margin-right: 10px"
              type="file"
              id="fi"
              accept=".jpg" 
    >j</input>
    <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
  <img :src="dialogImageUrl" alt="Preview Image" />
  <el-button type="primary" @click="shua()" 
              >刷新
              <el-icon><RefreshRight /></el-icon></el-button
            >
  </template>
 
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  import axios, { type RawAxiosRequestHeaders } from "axios";
  import { Delete, Download, Plus, User, ZoomIn } from '@element-plus/icons-vue'
  import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
  import type { UploadFile } from 'element-plus'
  import { defineComponent } from "vue";
  import request from "../utils/request";
  const upload = ref<UploadInstance>()
    import router from "../router";
  let dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
  var fd=new FormData();
  fd.append("image",file)

  request.get("user/upload?name="+"o"+"&image="+fd).then(res => {
        alert(res.data)
          
          
        });
  
 
}
const handlePictureCardPreview = (file: UploadFile) => {
   
  dialogImageUrl.value = file.url!
  var a=file.url!
  var b="听安"
  var fd=new FormData();
  var c="/api/user/upload"
  //axios.defaults.headers["Content-Type"] = "application/json";
//   const res =  axios.post(
//     c
//     ,
//     {
//      name: b
//     }
// ,
// {}
//   );
  
  // request.get("user/upload?name="+b+"&image="+a).then(res => {
  //       alert(res.data)
          
          
  //       });
  
  //dialogVisible.value = true
}
 const getAuthHeader=() => {
  return {
    //Authorization: "Bearer " ,
    Authorization: "multipart/form-data",
  };
}
const shua = () => {
//      var b="听安"
//      alert("ll")
//     request.get("user/getzhao?name="+b).then(res => {
        
//   dialogImageUrl.value=res.data;
//               alert(res.data)
         
          
//         });

   const file = document.querySelector("#fi") as any;
   var fd=new FormData();
   var imag={
    id:5,
    name:"kk",
    gty:"ll",
   }
   var imag2={
    id:6,
    name:"kk",
    gty:"ll",
   }
   var t=[];
   
   t[0]=imag;
   t[1]=imag2;
   //var manage="";
  //  fd.append("image",file.files[0])
  
  fd.append("image",file.files[0])
  
  fd.append("manage","2.jpg")
  //  request.post("user/upload?"+"name="+"ti").then(res => {
  //       alert(res.data)
          
          
  //       });
 // axios.defaults.headers["Content-Type"] = "multipart/form-data";
 request.post("/user/upload3",fd).then(res=>{
  alert(res.data)

 });
 request.post("/user/getPhoto",fd).then(res=>{
  alert(res.data)
  var imgstr="";
dialogImageUrl.value=res.data;
 });
  // request({
  //   method:'POST',
  //   url:"/user/upload3",
    
  //   data:{
  //     image:"ting",
  //     us:imag,
  //     s:t,
     

  //   }
    
  // }).then(res => {
  //      alert(res.data)
          
          
  //       });

//              const res =  axios.post(
    
//    "/user/upload" ,
//     {
//      name: "ti"
//     }
// ,
// {}
//   );
 
         
 
 
   //dialogVisible.value = true
 }
// export default defineComponent({
//   data: () => ({
//     adr:"",
    
//   }),
//   created() {
    
//   },
// //   methods: {
// //      handlePictureCardPreview (file: UploadFile)  {
// //    alert(file.url)
// //    dialogImageUrl.value = file.url!
   
   
// //    dialogVisible.value = true
// //  }
   



    
// //   },
// });

 </script>
 
  
  <style>
  .l{
    margin-top: 0%;
    margin-bottom: 7%;
  font-size: 30px;
  }
  .z{
    margin-left: 40%;
    margin-bottom: 7%;
  
  }
  .yy{
    
    margin-bottom: 5%;
  font-size: 25px;
  }
  .p{
    height:0;
    width:0;
  }
  
  </style>
  