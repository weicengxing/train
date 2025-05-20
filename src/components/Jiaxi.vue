<template>
    <div>
<div class="o">请添加站点信息</div>
<div class="i">请选择出发日期</div>
<div>
      <el-calendar v-model="value" class="b"/>
    </div>
    
        <el-input
      v-model="apoint"
      style="width: 600px;height: 100px;"
      placeholder="请输入起始站"
      
      clearable
    ></el-input>
   <div></div>
   <el-input
      v-model="spoint"
      style="width: 600px;height: 100px;"
      placeholder="请输入终止站"
      
      clearable
    ></el-input>
   <div></div> <el-input
      v-model="atime"
      style="width: 600px;height: 100px;"
      placeholder="请输入出发时间"
      
      clearable
    ></el-input>
   <div></div>
   <el-input
      v-model="stime"
      style="width: 600px;height: 100px;"
      placeholder="请输入到站时间"
      
      clearable
    ></el-input>
   <div></div>
   <el-input
      v-model="ban"
      style="width: 600px;height: 100px;"
      placeholder="请输入车次"
      
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
import { ref } from 'vue'
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
    value:ref(new Date()),
    atime:"",
    stime:"",
    ban:"",
   
   
  }),
  //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
  async created() {
    this.ha();

  },
  methods: {
   

async ha(){
    const res=this.$route.query.name;
    if(res!=null)
   this.name=res.toString();




},
que(){
    var mon=this.value.getMonth();
      
      var day=this.value.getDate();
      
     
     request.get("user/jiaxi?apoint="+this.apoint+"&spoint="+this.spoint+"&atime="+this.atime+"&stime="+this.stime+"&ban="+this.ban+"&mon="+mon+"&day="+day).then(res => {
        this.xiugai=res.data;
        
        alert(this.xiugai);
              
         
          
        });



},
fan(){
   
    router.push({
       
    path: "Ghu",
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
.b{
    margin-left:25%;
    margin-right:25% ;
    
    /* color:rgb(69, 42, 165);
   */
  }
  .i{
    font-size: 20px;
    
    /* color:rgb(69, 42, 165);
   */
  }
</style>