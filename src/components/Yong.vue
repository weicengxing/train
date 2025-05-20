<template>
    <div>
        <el-input
      v-model="yong"
      style="width: 600px;height: 100px;" class="p"
      placeholder="请输入用户名"
      
      clearable
    ></el-input>
    <el-button type="primary" @click="cha()" class="k"
    >查询</el-button >

         <el-table :data="user" style="width:27cm;height: 13cm" >
  <el-table-column prop=$index label="序号" width="200" height="300" >
     <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
     </el-table-column>
    <el-table-column prop=name label="姓名" width="200" height="300"  />

    <el-table-column  label="头像" width="200" height="300"  >
     <template v-slot="scope">
     
            <img :src=scope.row.picture height="80px" class="im" v-if=scope.row.picture>
         
          </template>
     </el-table-column>
    <el-table-column prop=pass label="密码" width="300" height="300" />
    <el-table-column prop=ding  label="预订车次" width="300" height="300" />
    

    </el-table>
    <el-button type="primary" @click="fan()" class="k"
              >返回</el-button >
    </div>
</template>
<script lang="ts">
import router from "../router";
import axios from "axios";
import {type User } from "../model/general";
import { studentDelete } from "../Ser/infoServ";
import { defineComponent } from "vue";
import request from "../utils/request";
export default defineComponent({
  //数据
  data: () => ({
    user:[],
       studentId: 45,
       wuwu:"hh",
       te:1,
       name:"",
       yong:"",
       img:"",
   
  }),
  //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
  async created() {
    this.submit();
  },
  methods: {
    //提交表单
    async submit() {
      const res=this.$route.query.name;
      if(res!=null) this.name=res.toString();
      
      request.get("user/getyong").then(res => {
        //if (res.code === '0') {
          this.user = res.data;
          if(this.user[0]==null) alert("暂无用户信息")
        })
        
    },
  //   async sub(){
    
  //  this.user = (await this.orderPagingApi()).data;

  //  },
  //  orderPagingApi() {
  //   return axios({
 
  //       'url': '/user/getAll0',
 
  //       'method': 'get',
 
        
  //   })
  // }
  async sub() {
   await request.get("user/get?id="+this.studentId).then(res => {
        //if (res.code === '0') {
          this.wuwu = res.data;
          if(res.data==null) alert("ii")
          else alert(this.wuwu)
        });
        
        request.get("user/getAll0").then(res => {
        //if (res.code === '0') {
          this.user = res.data;
          if(res.data==null) alert("表中已空")
        })
       
       
},
ha(name:string){
  // const res=this.$route.query.teacherId;
  //   if (res != null) {
  //     this.te=parseInt(res.toString());
  //     alert(this.te);
  
//}




alert(name);
},
cha(){
    request.get("user/getyong2?yong="+this.yong).then(res => {
        //if (res.code === '0') {
          this.user = res.data;
          if(this.user[0]==null) alert("暂无用户信息")
        })
        
},
fan(){
   
    router.push({
    
    path: "Ghu",
    query: { 
      
      name:this.name,
      
        
    },

  });
}

}
})

</script>
<style>
.k{
margin-top:3%;
}
.p{
    margin-bottom: 3%;
    margin-right: 3%;
}
.im{
   
   width:80px;
   object-fit: cover;
border-radius: 50%;
 }
</style>

