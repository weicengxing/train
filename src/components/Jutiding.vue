<template>
    <div>
        <el-table :data="xing" style="width:24cm;height: 8cm" >
     <el-table-column prop=$index label="序号" width="200" height="300" >
     <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
     </el-table-column>
     <el-table-column prop=apoint label="出发站" width="200" height="300" />
    <el-table-column prop=spoint label="抵达站" width="200" height="300"  />
    <el-table-column prop=atime label="出发时" width="200" height="300" />
   
    <el-table-column prop=stime label="抵达时" width="200" height="300" />
    

</el-table>
<div>
<el-button type="primary" @click="e()"
              >返回</el-button >
</div>
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
    xing:[] ,
    banc:"",
    qi:"",
    zh:"",
    name:"",
    ri:"",
    mon:"",
    day:"",
    
    
    
    
       
   
  }),
  //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
  async created() {
    this.ha();

  },
  methods: {
   

async ha(){

    const res=this.$route.query.banc;
    if(res!=null)
    this.banc=res.toString();
    const res1=this.$route.query.ri;
    if(res1!=null)
    this.ri=res1.toString();
    var r1=0;
       while(this.ri.charAt(r1)!='月'){
           r1++;
       }

       this.mon=this.ri.substring(0,r1);
       this.day=this.ri.substring(r1+1,this.ri.length-1);
       
      this.mon=(parseInt(this.mon)-1)+"";
    request.get("user/getxing?ban="+this.banc+"&mon="+this.mon+"&day="+this.day).then(res => {
        //if (res.code === '0') {
          this.xing = res.data;
         
          
          
        });




},
e(){
    const res3=this.$route.query.name;
    if(res3!=null) this.name=res3.toString();
    router.push({
    
    path: "Di",
    query: { 
      
      name:this.name
        
    },

  });



},

}
})

</script>   