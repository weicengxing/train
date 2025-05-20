<template>
    <div>
      <div class="k">具体行程</div>
      <el-table
          :data="xing"
          :header-cell-style="{
            color: '#2E2E2E',
            fontSize: '10px',
            fontWeight: '400',
            background: 'rgb(242,242,242)',
          }"
          :row-style="{ height: '10px' }"
          :cell-style="{ padding: '2px' }"
          style="width: 100%"
        >
          <el-table-column label="序号" fixed="left" width="50" color="black">
            <template v-slot="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          
          
          <el-table-column label="出发站" color="black"  width="100">
            <template v-slot="scope">
              {{ scope.row.apoint }}
            </template>
          </el-table-column>
          <el-table-column label="抵达站" color="black"  width="100">
            <template v-slot="scope">
              {{ scope.row.spoint }}
            </template>
          </el-table-column>
          <el-table-column label="出发时" color="black"  width="100">
            <template v-slot="scope">
              {{ scope.row.atime }}
            </template>
          </el-table-column>
          <el-table-column label="抵达时" color="black"  width="100">
            <template v-slot="scope">
              {{ scope.row.stime }}
            </template>
          </el-table-column>
           
          <el-table-column label="操作" color="black"  width="230">
            <template v-slot="scope">
              <el-button type="primary"  @click="edit(scope.row.apoint,scope.row.spoint)"
                >编辑</el-button
              >
             
            </template>
          </el-table-column>
        </el-table>
<div>
<el-button type="primary" @click="e()" class="l"
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
    if(res3!=null) this.name=res3.toString();
    request.get("user/getxing?ban="+this.banc+"&mon="+this.mon+"&day="+this.day).then(res => {
        //if (res.code === '0') {
          this.xing = res.data;
         
          
          
        });




},
e(){
   
    
    router.push({
    
    path: "Ghu",
    query: { 
      
      name:this.name,
     
        
    },

  });



},
edit(apoint:string,spoint:string){
  router.push({
    
    path: "Gaixi",
    query: { 
      
      name:this.name,
     mon:this.mon,
     day:this.day,
     ban:this.banc,
     apoint:apoint,
     spoint:spoint,
        
    },

  });


}

}
})

</script>   
<style>
.k{
  margin-bottom: 5%;
  font-size: 25px;
}
.l{
  margin-top: 5%;
  
}
</style>