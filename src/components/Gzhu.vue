<template>
    <div>
      <div class="l">欢迎来到火车站系统</div>
      <div class="yy">管理员：{{ name }}</div>
        <el-table
        
        :row-key="getRowKeys"
       @selection-change="hand6"
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
      
      <el-table-column   type="selection" @selection-change="hand" width="55" >
        

      </el-table-column>
    
        <el-table-column label="序号"  width="50" color="black">
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        
        <el-table-column label="日期" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.ri }}
          </template>
        </el-table-column>
        <el-table-column label="出发站" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.qi }}
          </template>
        </el-table-column>
        <el-table-column label="终点站" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.zh }}
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
        <el-table-column label="总票" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.zong }}
          </template>
        </el-table-column>
        
        <el-table-column label="余票" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.yu }}
          </template>
        </el-table-column>
        <el-table-column label="操作" color="black"  width="230">
          <template v-slot="scope">
            <el-button type="primary" @click="edit(scope.row.ban,scope.row.ri)" icon="edit"
              >编辑</el-button
            >
            
            <el-button type="danger" @click="dele(scope.row.ban,scope.row.ri)" icon="delete"
              >删除</el-button
            >
          </template>
        </el-table-column>
       
      </el-table>
      <div>暂无更多信息</div>
      <div class="p">
        <el-button type="success" @click="e()"

              >
              用户信息<el-icon><User /></el-icon></el-button
            >
     
      
        <el-button type="warning" @click="zhan()"
              >站点信息<el-icon><InfoFilled /></el-icon></el-button
            >
            <el-button type="primary" @click="jiaxi()"  
              >添加车程
              <el-icon><CirclePlus /></el-icon>
              </el-button
            >
        </div>
      
   
   
    </div>
</template>
<script  lang="ts">

import axios from "axios";
import {type Hang } from "../model/general";
import { studentDelete } from "../Ser/infoServ";
import { defineComponent,ref } from "vue";
import request from "../utils/request";
import router from "../router";
import { icons } from "@element-plus/icons-vue/global";
interface User {
  id: number
 ri: string
  qi: string
  zh: string
}

const seid=ref([]);
//const selectable = (row: User) => ![1, 2].includes(row.id)
// const getro=(row:User)=>{
//   return row.id;
// }
const getRowKeys=(row)=>{
  return row.id;//也许多选要用setup来写

}

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
    ri:"",
    sh:"",
    user:[]as User[],
    muti:[]as number[],
    si:0,
    
})
    
       
   
  ,

  //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
  async created() {
    this.ha();

  },
  methods: {
  //  hand(val){
  //   this.muti=val;
  //  },
    
async ha(){
   
    const res3=this.$route.query.xin;
    if(res3!=null)
    this.name=res3.toString();
    else{
        const res4=this.$route.query.name;
        if(res4!=null)
    this.name=res4.toString();
    }
    
     request.get("user/getzongxing").then(res => {
        
          this.hang = res.data;
         
          if(this.hang[0]==null) alert("抱歉，暂未查询到相关车次")
          
        });
    

  



},
// hand(rows){
//   mu.value=rows;
//   seid.value=mu.value.length;
// this.muti=[];

// if(rows){
 
//   this.muti=rows.map((row)=>{return row.id})
// }

// }


han(nu:number){
  alert(nu)
  this.muti[this.si++]=nu;
},
 hand6(selection){
const mu=ref(selection);

 },
 async e(){
 

  router.push({
    
        path: "Yong",
        query: {
          
          name:this.name,
           
        },

      });

},
async uyoding(ban:string){
  
  await request.get("user/uyoding?name="+this.name+"&ban="+ban+"&qi="+this.qi+"&zh="+this.zh+"&mon="+this.mon+"&day="+this.day).then(res => {
        this.uu=res.data;
         
          
        });

},
async uyu(ban:string){

  await request.get("user/xunyudi?ban="+ban+"&mon="+this.mon+"&day="+this.day).then(res => {
        this.yuding=res.data;
        this.uyoding(ban);
         this.ha();
        alert(this.yuding);
              
         
          
        });
},
async xunyuding(ban :string,yupiao:number ){
 await request.get("user/xunyuding?ban="+ban+"&name="+this.name).then(res => {
        //if (res.code === '0') {
          this.yuding = res.data;
         
          if(this.yuding=="1")  alert("已预订本车次,请注意是否需要变更车站");
          else{
            if(yupiao==0){
              alert("抱歉,暂无余票");
            }
            else{
              
            this.uyu(ban );
        
            }


          }

          
        });
  

}

,zhan(){

    router.push({
    
    path: "Zhan",
    query: { 
        name:this.name
        
    },

  });

},
edit( ban:string,ri:string){
  var r1=0;
       while(ri.charAt(r1)!='月'){
           r1++;
       }

       this.mon=ri.substring(0,r1);
       this.day=ri.substring(r1+1,ri.length-1);
       
       router.push({
    
    path: "Gde",
    query: { 
      ban:ban,
      name:this.name,
      mon:this.mon,
      day:this.day,
        
    },

  });


},
jiaxi(){
  router.push({
    
    path: "Jiaxi",
    query: { 
      
      name:this.name,
     
        
    },

  });

  


},
dele(ban:string,ri:string){
  var r1=0;
       while(ri.charAt(r1)!='月'){
           r1++;
       }

       this.mon=ri.substring(0,r1);
       this.day=ri.substring(r1+1,ri.length-1);
  request.get("user/dehang?ban="+ban+"&mon="+this.mon+"&day="+this.day).then(res => {
        this.sh=res.data;
        alert(this.sh);
        this.ha();
        
        
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
.p{
  
  margin-top: 3%;

}


</style>
