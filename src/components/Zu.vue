<template><div>
    <div class="p">注册中

    </div>
    
    <el-input
      v-model="name"
      style="width: 300px;height: 60px;"
      placeholder="请输入账号"
      
      clearable
    ></el-input>
    <div></div>
    <el-input
      v-model="mi"
      style="width: 300px;height: 60px;"
      placeholder="请输入密码"
      
      clearable
    ></el-input>
    <div></div>
    <el-input
      v-model="mima"
      style="width: 300px;height: 60px;"
      placeholder="请再次输入密码"
      
      clearable
    ></el-input>
    <div></div>
    <el-button  type="primary" class="j" @click="cha()">注册</el-button>
    

</div>
  </template>
  <script lang="ts" >
  import { ref } from 'vue'
  import router from '../router';
  import { defineComponent } from 'vue';
  import request from "../utils/request";
  import { message } from "../Tools/Message";
  //import {  Search } from '@element-plus/icons-vue'
   






  export default defineComponent({
  // 双向绑定数据
  data: () => ({
    wuwu:"",
    mi:"",
    mima:"",
    name:"",
  }),
  // 页面加载函数
  async created() {
   
      
}

    // 获取路由参数
   
  ,
  methods: {
    // 提交表单
   async  cha() {
        if(this.mi!=this.mima){ message(this,"两次密码不相同")}
        else{
        await request.get("user/inyong?name="+this.name+"&pass="+this.mima).then(res => {
        //if (res.code === '0') {
          this.wuwu = res.data;
          if(this.wuwu=="0") alert("账号已存在");
          else alert ("注册成功");
        });
    }
     
    },
  },
});


  </script>
  <style>
  .p{
    margin-bottom:20%;
    font-size: 30px;
  }
  .j{
    margin-top:10%;
  }
</style>