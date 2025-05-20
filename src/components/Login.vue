<template>

<!-- <div id="building"></div>
<div id="bac"></div> -->
<div>页面</div>
<div class="animations-row">
    <spriteanimation
      spriteUrl="/images/th0.jpg"
      :frameWidth="(626/3)"
      :frameHeight="208.5"
      :frames="6"
      :framesPerRow="3"
      :frameRate="12"
      :autoPlay="true"
      :loop="true"
    />
    <spriteanimation
      spriteUrl="/images/th1.jpg"
      :frameWidth="(626/3)"
      :frameHeight="185.5"
      :frames="8"
      :framesPerRow="4"
      :frameRate="12"
      :autoPlay="true"
      :loop="true"
    />
    
  </div>
    <div>
     
  <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
    <img src="../assets/11.jpg" width="100"height="100" />
     <div class="loginTitle">
       火车登录系统
     </div>
      <el-form-item prop="username">用户名
          <el-input type="text" v-model="loginForm.username" placeholder="亲，请输入用户名" >
          </el-input>
      </el-form-item>
      <el-form-item prop="password">密码
          <el-input type="password" v-model="loginForm.password" placeholder="亲，请输入密码" >
          </el-input>
      </el-form-item>
      <!-- <el-form-item prop="code">
          <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width: 250px;margin-right: 5px">
          </el-input> -->
          <!-- < img :src =this.img/> -->
          <!-- <img src="../assets/background .jpg" width="300" /> -->

      <!-- </el-form-item> -->
      <el-checkbox v-model="checked" class="loginRemember">请记住我</el-checkbox>
      <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
      <div class="button-spacer"></div>
      <el-button type="commbutton" style="width:100%" @click="submit">注册</el-button>
      <!-- <div class="button-spacer"></div>
      <el-button type="success" style="width:100%" @click="goToNovel">进入小说阅读器</el-button> -->
  </el-form>
    </div>
    
</template>

<script>
import request from "../utils/request";
import axios from 'axios'
import spriteanimation from "../components/SpriteAnimation.vue";
import router from "../router/index";
import { message } from "../Tools/Message";
export default {
  name: "Login",
  components: {
    // 必须在组件选项中注册子组件
    spriteanimation
  },
    data(){
      return{
        img:"",
          captchaUrl: "",
          loginForm:{
              username:"admin",
              password:"ssssss",
              code:'',
              
          },
          xin:"",
          checked: true,
          rules:{
              username:[{required:true,message:"请输入用户名",trigger:"blur"},{ min: 1, max: 14, message: '长度在 1 到 14 个字符', trigger: 'blur' }
              ],
              password:[{required:true,message:"请输入密码",trigger:"blur"},,{ min: 1,  message: '密码长度要大于1', trigger: 'blur' }],
              // code:[{required:true,message:"请输入验证码",trigger:"blur"}],
          }

      }
  },
    methods:{
       async submitLogin(){
        
        await request.get("/user/getxin?name="+this.loginForm.username+"&pass="+this.loginForm.password).then(res => {
       // if (res.code === '0') {
          this.xin = res.data;
         
           if(this.xin=="0"){this.$message.error("用户名或密码不正确");}
           if(this.xin=="1"){message(this,"登录成功");
           
      //      router.push({
      //   path: "Zhu",
      //   query: { xin: this.loginForm.username },
      // });
           router.push({
        path: "Wel",
        query: { xin: this.loginForm.username },
      });

           }
           if(this.xin=="2"){
  
           router.push({
        path: "Ghu",
        query: { xin: this.loginForm.username },
      });


           }
         


    },
   




    );





         
    //    this.$refs.loginForm.validate((valid) => {
    //           if (valid) {
    //               alert(this.loginForm.username);
    //           } else {
    //               this.$message.error('登录出错请重新输入');
    //               return false;
    //           }
    //      });
        //this.$router.push("Da");
      //   setTimeout(()=>{
        
    
      // },1000)
      //window.open('http://localhost:52330/gao/src/components/xin.html');
      }
      ,
     async submit(){
      this.$router.push("Zu");
//      }, async submitLogin5(){
//       axios.get('http://your-ngrok-domain/api/login', {
//   name: '听安',
//   pass: '123'
// })
     }, async submitLogin9(){
      await request.get("/user/music000")
      
     },
     // 直接跳转到小说阅读器页面
    //  goToNovel() {
    //    console.log('正在跳转到小说阅读器...');
    //    // 使用路由对象直接跳转
    //    router.push('/novel-simple');
    //  }


    },
  


    

};
</script>

<style  scoped>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        
        
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: aliceblue;
        border:1px solid rgb(125, 43, 226);
        box-shadow: 0 0 25px #cc85ff;
        
    }
    .loginTitle{
        /* margin: 0px auto 48px auto; */
        text-align: center;
        font-size: 40px;
        margin: 10px;
        /* color:rgb(255, 174, 0); */
    }
    .loginRemember{
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
    .button-spacer {
        height: 10px;
    }
</style>
<style>
#building{
background:url("../assets/ba.jpg");
top:26%;

left: 150px;
width: 30%;
height:49%;
position: fixed;
background-size:100% 100%;}
#bac{
background:url("../assets/4.jpg");
top:26%;
left: 1128px;
width: 30%;
height:49%;
position: fixed;
background-size:100% 100%;}
</style>
