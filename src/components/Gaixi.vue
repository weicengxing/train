<template>
    <div>
<div class="o">请修改行程时间</div>
        <el-input
      v-model="atime"
      style="width: 600px;height: 100px;"
      placeholder="请输入改后发车时间"
      
      clearable
    ></el-input>
   <div></div>
   <el-input
      v-model="stime"
      style="width: 600px;height: 100px;"
      placeholder="请输入改后抵达时间"
      
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
    mon:"",
    day:"",
    banc:"",
    atime:"",
    stime:"",
    
    
       
   
  }),
  //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
  async created() {
    this.ha();

  },
  methods: {
   

async ha(){
    
    const res=this.$route.query.ban;
    if(res!=null)
    this.banc=res.toString();
    const res1=this.$route.query.mon;
    if(res1!=null)
    this.mon=res1.toString();
    const res2=this.$route.query.day;
    if(res2!=null)
    this.day=res2.toString();
    const res3=this.$route.query.name;
    if(res3!=null)
   this.name=res3.toString();
   const res4=this.$route.query.apoint;
    if(res4!=null)
    this.apoint=res4.toString();
    const res5=this.$route.query.spoint;
    if(res5!=null)
    this.spoint=res5.toString();




},
que(){
   
     
     request.get("user/gaixi?apoint="+this.apoint+"&spoint="+this.spoint+"&mon="+this.mon+"&day="+this.day+"&atime="+this.atime+"&stime="+this.stime).then(res => {
        this.xiugai=res.data;
        
        alert(this.xiugai);
              
         
          
        });



},
fan(){
    
    
    router.push({
       
    path: "Gde",
    query: { 
        name:this.name,
        mon:this.mon,
        day:this.day,
        ban:this.banc,
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