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
    mon:"",
    day:"",
    zh1:"",
    hh:"",
    
    
    
    
       
   
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
  else {const res=this.$route.query.ban;
    if(res!=null)
    this.banc=res.toString();}
    const res4=this.$route.query.mon;
    if(res4!=null) this.mon=res4.toString();
    const res5=this.$route.query.day;
    if(res5!=null) this.day=res5.toString();
    //alert(this.banc+this.mon+this.day)
    this.mon=(parseInt(this.mon)-1)+"";
    request.get("user/getxing?ban="+this.banc+"&mon="+this.mon+"&day="+this.day).then(res => {
        //if (res.code === '0') {
          this.xing = res.data;
         
          
          
        });




},
e(){const res=this.$route.query.qi;
    if(res!=null) this.qi=res.toString();
    const res2=this.$route.query.zh;
    if(res2!=null) this.zh=res2.toString();
    const res3=this.$route.query.name;
    if(res3!=null) this.name=res3.toString();
    const res5=this.$route.query.zh1;
    if(res5!=null) this.zh1=res5.toString();
    const res4=this.$route.query.hh;
    if(res4!=null) this.hh=res4.toString();
    
    if(this.hh.length==1) {
      
      router.push({
    
    path: "Zhuan",
    query: { 
      qi:this.qi,
      zh:this.zh1,
      name:this.name,
      mon:this.mon,
      day:this.day,
        
    },

  });
    }
   else {
   
    router.push({
    
    path: "Lu",
    query: { 
      qi:this.qi,
      zh:this.zh,
      name:this.name,
      mon:this.mon,
      day:this.day,
        
    },

  });
   }


},

}
})

</script>   