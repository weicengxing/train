<template>
    <div class="hello">
      {{ msg }}
      <div>
        <h1>用户列表</h1>
        <!-- <ul>
          <ui v-for="user in users" :key="user.id">
           -- {{ user.id }} -- {{ user.name }} -- {{ user.gty }} --</ui>
        </ul> -->
        <el-table :data="users" style="width:17cm;height: 50cm" >
     <el-table-column prop=id label="巅峰排名" width="200" height="1000" />
    <el-table-column prop=name label="姓名" width="200" height="300"  />
    <el-table-column prop=gty label="花果山排名" width="300" height="300" />
</el-table>
        <button class="commbutton" @click="submit()">更新</button>
        <button class="commbutton" @click="sub2()">删除</button>
        <button class="commbutton" @click="sub3()">刚刚</button>

      </div>
      
    </div>
  </template>
<script>
import request from "@/utils/request";
import { studentDelete } from "../Ser/infoServ";
import { defineComponent } from "vue";


export default {
  name: "AdminView",
  //定义数据
  data() {
    return {
      
      users: []
    }
  },
  // data: () => ({
  //   valid: false,
    
  //   nameRules: [],
  //   emailRules: [],
  // }),
  //创建前加载前做
  created() {
    
  },
  //调用函数
  methods: {
     submit() {
        alert("gg");
        
       request.get("user/getAll0").then(res => {
        //if (res.code === '0') {
          this.users = res.data;


if(res.data==null)
          alert("ui");
       // }
      })
    },
    async sub2() {
      var studentId=2;
        alert(studentId);
        const res = await studentDelete(2);
        alert("fdd");
      if (res.code == 0) {
        alert("删除成功");
      } },

      async sub3(){

 
  //   var paging: {
  //     page: 1,
  //     pageSize: 5
  //  }
   const res = await orderPagingApi(this.paging) 
},
 
 orderPagingApi(data) {
    return $axios({
 
        'url': '/user/getAll0',
 
        'method': 'get',
 
        'data': data
    })
      }
    
        
}

        
    


       
    ,
  }

</script>