<template>
    <div>
        <div class="k">我的订单</div>
     
        <el-table
        :data="hang"
        :header-cell-style="{
          color: '#2E2E2E',
          fontSize: '10px',
          fontWeight: '400',
         
          
        }"
        :row-style="{ height: '10px' }"
        
        style="width: 100%"
        class="i"
      >
        <el-table-column label="序号"  width="50" color="black">
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="起点" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.qi }}
          </template>
        </el-table-column>
        <el-table-column label="终点" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.zh }}
          </template>
        </el-table-column>
        <el-table-column label="出发日期" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.ri }}
          </template>
        </el-table-column>
        <el-table-column label="出发时间" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.atime }}
          </template>
        </el-table-column>
        <el-table-column label="抵达时间" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.stime }}
          </template>
        </el-table-column>
        <el-table-column label="费用" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.fee }}
          </template>
        </el-table-column>
        <el-table-column label="车次" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.ban }}
          </template>
        </el-table-column>
        <el-table-column label="总时长" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.len }}
          </template>
        </el-table-column>
        <el-table-column label="座位" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.zuo }}
          </template>
        </el-table-column>
        <el-table-column label="操作" color="black"  width="230">
          <template v-slot="scope">
            <el-button type="primary" @click="cha(scope.row.ban,scope.row.ri,scope.row.qi,scope.row.zh)"
              >查看</el-button
            >
            <el-button type="primary" @click="tui(scope.row.ban,scope.row.ri)"
              >退订</el-button
            >
          </template>
        </el-table-column>
       
      </el-table>
      
      <div>
       
        <el-button type="primary" class="h" @click="fan()"
              >返回</el-button
            >
      </div>
      
   
   
    </div>
</template>
<script lang="ts">
import axios from "axios";
import {type Hang } from "../model/general";
import { studentDelete } from "../Ser/infoServ";
import { defineComponent } from "vue";
import request from "../utils/request";
import router from "../router";
export default defineComponent({
  //数据
  data: () => ({
    hang:[] as Hang[] ,
    qi:"",
    zh:"",
    name:"",
    yuding:"",
    uu:"",
    
    
       
   
  }),
  //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
  async created() {
    this.ha();

  },
  methods: {
   

async ha(){
   
    const res3=this.$route.query.name;
    if(res3!=null)
    this.name=res3.toString();


     request.get("user/gethang2?name="+this.name).then(res => {
        //if (res.code === '0') {
          this.hang = res.data;
         
          if(this.hang[0]==null) alert("尚未有订单")
          
        });


  



},
async tui(ban:string ,ri:string){
    request.get("user/tui?ban="+ban+"&name="+this.name+"&ri="+ri).then(res => {
        //if (res.code === '0') {
          this.uu = res.data;
         this.ha();
           alert(this.uu);

          
        });
},
 async fan( ){
  
  router.push({
    
        path: "Zhu",
        query: {
          name:this.name
            
        },

      });

},
async cha(ban: string,ri:string,qi:string,zh:string){
   
  router.push({
    
        path: "uti",
        query: { banc: ban ,
          qi:qi,
          zh:zh,
          name:this.name,
           ri:ri,
        },

      });

},




}
})

</script>   
<style>
.l{
  margin-top: 0%;
  margin-bottom: 10%;
font-size: 30px;
}
.h{
    margin-top: 10%;
}
.k{
    margin-bottom: 6%;
    font-size: 26px;
}

</style>
