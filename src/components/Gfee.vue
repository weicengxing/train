<template>
    <div>
<div class="o">请输入更改后的费用</div>
        <el-input
      v-model="fee"
      style="width: 600px;height: 145px;"
      placeholder="请输入更改后的费用"
      
      clearable
    ></el-input>
   <div></div>
   <el-button type="primary" @click="que()" class="i"
              >确认</el-button
            >
    <el-button type="primary" @click="fan()" class="i"
              >返回</el-button
            >
    </div>

</template>
<script lang="ts">
import axios from "axios";
// import {type Hang } from "../model/general";
import { studentDelete } from "../Ser/infoServ";
import { defineComponent } from "vue";
import request from "../utils/request";
import router from "../router";
export default defineComponent({
  //数据
  data: () => ({
   fee:"",
   name:"",
   apoint:"",
   spoint:"",
    xiugai:"",
    
    
       
   
  }),
  //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
  async created() {
    this.ha();

  },
  methods: {
   

async ha(){
    const res=this.$route.query.fee;
    if(res!=null)
   this.fee=res.toString();




},
que(){
    const res=this.$route.query.apoint;
    if(res!=null) this.apoint=res.toString();
    const res1=this.$route.query.spoint;
    if(res1!=null) this.spoint=res1.toString();
     
     request.get("user/gaifee?apoint="+this.apoint+"&spoint="+this.spoint+"&fee="+this.fee).then(res => {
        this.xiugai=res.data;
        
        alert(this.xiugai);
              
         
          
        });



},
fan(){
    const res=this.$route.query.name;
    if(res!=null) this.name=res.toString();
    router.push({
       
    path: "Zhan",
    query: { 
        name:this.name
        
    },

  });

}

}
})

</script>   
<style>
.o{
margin-bottom: 5%;
font-size: 25px;
}
.i{
    margin-top: 5%;
}
</style>