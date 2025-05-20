<template>
    <div>
      <div class="l">{{ qi }}—————{{zh}} (中转) </div>
      <div class="yy">{{ parseInt(mon)+1 }}月{{day}}日</div>
        <el-table
        :data="hang"
        :header-cell-style="{
          color: '#2E2E2E',
          fontSize: '10px',
          fontWeight: '400',
         
          
        }"
        :row-style="{ height: '1px' }"
        
        style="width: 100%"
        class="i"
      >
        <el-table-column label="序号"  width="50" color="black">
          <template v-slot="scope">
            {{ scope.$index + 1 }}
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
        <el-table-column label="出发站" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.qi }}
          </template>
        </el-table-column>
        <el-table-column label="抵达站" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.zh }}
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
        <el-table-column label="余票" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.yu }}
          </template>
        </el-table-column>
        <el-table-column label="操作" color="black"  width="230">
          <template v-slot="scope">
            <el-button type="primary" @click="e(scope.row.ban,scope.row.zh)"
              >查看</el-button
            >
            <el-button type="primary" @click="xunyuding(scope.row.ban,scope.row.yu,scope.row.qi,scope.row.zh)"
              >预订</el-button
            >
          </template>
        </el-table-column>
       
      </el-table>
      <div>暂无更多信息</div>
      <div>
        <el-button type="primary" @click="fan(name)"
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
    mon:"",
    day:"",
    
    
       
   
  }),
  //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
  async created() {
    this.ha();

  },
  methods: {
   

async ha(){
   const res=this.$route.query.qi;
    if(res!=null)
    this.qi=res.toString();
    const res2=this.$route.query.zh;
    if(res2!=null)
    this.zh=res2.toString();
    const res3=this.$route.query.name;
    if(res3!=null)
    this.name=res3.toString();
    const res4=this.$route.query.mon;
    if(res4!=null)
    this.mon=res4.toString();
     
    const res5=this.$route.query.day;
    if(res5!=null)
    this.day=res5.toString();
  
     request.get("user/gethang3?qi="+this.qi+"&zh="+this.zh+"&mon="+this.mon+"&day="+this.day).then(res => {
        //if (res.code === '0') {
          this.hang = res.data;
        
          if(this.hang[0]==null) alert("抱歉，暂未查询到相关车次")
          
        });


  



},
 async e(ban :string,zh:string ){
 
  router.push({
     
        path: "juti",
        query: { banc: ban ,
          qi:this.qi,
          zh:zh,
          name:this.name,
            mon:(parseInt(this.mon)+1)+"",
            day:this.day,
            hh:"0",
            zh1:this.zh,
        },

      });

},
async uyoding(ban:string,qi:string,zh:string){
  
  await request.get("user/uyoding?name="+this.name+"&ban="+ban+"&qi="+qi+"&zh="+zh+"&mon="+this.mon+"&day="+this.day).then(res => {
        this.uu=res.data;
         
          
        });

},
async uyu(ban:string,qi:string,zh:string){

  await request.get("user/xunyudi?ban="+ban+"&mon="+this.mon+"&day="+this.day).then(res => {
        this.yuding=res.data;
        this.uyoding(ban,qi,zh);
         this.ha();
        alert(this.yuding);
              
         
          
        });
},
async xunyuding(ban :string,yupiao:number ,qi:string,zh:string ){
 await request.get("user/xunyuding?ban="+ban+"&name="+this.name).then(res => {
        //if (res.code === '0') {
          this.yuding = res.data;
         
          if(this.yuding=="1")  alert("已预订本车次,请注意是否需要变更车站");
          else{
            if(yupiao==0){
              alert("抱歉,暂无余票");
            }
            else{
              
            this.uyu(ban ,qi,zh);
        
            }


          }

          
        });
  

},
fan( name :string){
  router.push({
    
    path: "Zhu",
    query: { name:name
        
    },

  });
}


}
})

</script>   
<style>
.l{
  margin-top: 0%;
  margin-bottom: 7%;
font-size: 30px;
}
.yy{
  
  margin-bottom: 5%;
font-size: 25px;
}

</style>
