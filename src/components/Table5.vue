<template>
  <div>
    <h1>用户列表</h1>
    <!-- <el-table :data="user" style="width:17cm;height: 8cm" >
     <el-table-column prop=id label="巅峰排名" width="200" height="1000" />
    <el-table-column prop=name label="姓名" width="200" height="300"  />
    <el-table-column prop=gty label="花果山排名" width="300" height="300" />
    <el-table-column  label="操作" width="300" height="300" >
      <el-button class="commButton" @click="e(name)"
              >编辑</el-button
            >
    </el-table-column>


</el-table> -->
<el-table
        :data="user"
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
        
        
        <el-table-column label="姓名" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        
        <el-table-column label="操作" color="black"  width="230">
          <template v-slot="scope">
            <el-button class="commButton" @click="ha(scope.row.name)"
              >编辑</el-button
            >
            <el-button class="commButton" @click="ha(scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    <button class="commbutton" @click="submit()">更新</button>
    <button class="commbutton" @click="sub()">删除</button>
    <!-- <button class="commbutton" @click="ha()">打印</button> -->
  </div>
</template>
<script lang="ts">
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
   
  }),
  //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
  async created() {
    
  },
  methods: {
    //提交表单
    async submit() {
      
      alert(this.studentId);
      request.get("user/getAll0").then(res => {
        //if (res.code === '0') {
          this.user = res.data;
          if(res.data==null) alert("ii")
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
e(){

}

}
})

</script>
