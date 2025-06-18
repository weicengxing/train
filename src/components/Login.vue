<template>
  <div class="login-page">
    <!-- 动态粒子背景 -->
    <div class="particles-bg"></div>

    <div class="main-container">
      <!-- 左侧装饰动画 -->
      <div class="decorative-column">
        <spriteanimation
          class="sprite-display"
          spriteUrl="/images/th0.jpg"
          :frameWidth="(626/3)"
          :frameHeight="208.5"
          :frames="6"
          :framesPerRow="3"
          :frameRate="12"
          :autoPlay="true"
          :loop="true"
        />
        <!-- 第二个动画可以放在另一侧，或者像这样堆叠 -->
      </div>
      
      <!-- 中心登录表单 -->
      <div class="form-column">
        <el-form :rules="rules" ref="loginForm" :model="loginForm" class="glass-form">
          <img src="../assets/11.jpg" class="system-logo" />
          <div class="loginTitle">
            火车登录系统
          </div>
          <el-form-item prop="username">
            <el-input 
              type="text" 
              v-model="loginForm.username" 
              placeholder="请输入授权账号" 
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input 
              type="password" 
              v-model="loginForm.password" 
              placeholder="请输入访问凭证" 
              :prefix-icon="Lock"
            />
          </el-form-item>
          <el-checkbox v-model="checked" class="loginRemember">记住凭证</el-checkbox>
          <el-button type="primary" class="login-button" @click="submitLogin">授权访问</el-button>
          <div class="button-spacer"></div>
          <el-button class="register-button" @click="submit">申请账号</el-button>
        </el-form>
      </div>

      <!-- 右侧装饰动画 -->
      <div class="decorative-column">
         <spriteanimation
          class="sprite-display"
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

    </div>
  </div>
</template>

<script>
// [重要] 您的脚本逻辑已完整保留，未做任何修改
import request from "../utils/request";
import axios from 'axios'
import spriteanimation from "../components/SpriteAnimation.vue";
import router from "../router/index";
import { message } from "../Tools/Message";
// [新增] 导入 Element Plus 图标
import { User, Lock } from '@element-plus/icons-vue'

export default {
  name: "Login",
  components: {
    spriteanimation
  },
  // [新增] 为图标注册
  setup() {
    return {
      User,
      Lock
    }
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
        username:[{required:true,message:"请输入用户名",trigger:"blur"},{ min: 1, max: 14, message: '长度在 1 到 14 个字符', trigger: 'blur' }],
        password:[{required:true,message:"请输入密码",trigger:"blur"},,{ min: 1,  message: '密码长度要大于1', trigger: 'blur' }],
      }
    }
  },
  methods:{
    async submitLogin(){
      await request.get("/user/getxin?name="+this.loginForm.username+"&pass="+this.loginForm.password).then(res => {
        this.xin = res.data;
        if(this.xin=="0"){this.$message.error("用户名或密码不正确");}
        if(this.xin=="1"){
          message(this,"登录成功");
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
      });
    },
    async submit(){
      this.$router.push("Zu");
    },
    async submitLogin9(){
      await request.get("/user/music000")
    },
  },
};
</script>

<style scoped>
/* --- 全局布局与背景 --- */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #0c0c1e;
  position: relative;
}

.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  /* 使用 box-shadow 创建粒子 */
  box-shadow: 
    /* ... 随机生成大量粒子 ... */
    -37vw 24vh 1px 1px #fff, 14vw 2vh 0px 1px #fff, 7vw 8vh 1px 1px #fff, -14vw 27vh 1px 0px #fff, -25vw 23vh 0px 1px #fff, 
    2vw 36vh 1px 1px #fff, 47vw 41vh 1px 1px #fff, -4vw 3vh 1px 0px #fff, 10vw 4vh 1px 0px #fff, -3vw 37vh 0px 0px #fff, 
    -46vw 3vh 0px 0px #fff, 13vw 10vh 0px 1px #fff, -43vw 41vh 1px 1px #fff, 20vw 1vh 0px 1px #fff, 3vw 16vh 0px 0px #fff, 
    49vw 19vh 0px 1px #fff, -44vw 46vh 1px 0px #fff, 45vw 24vh 1px 0px #fff, 49vw 16vh 1px 1px #fff, -41vw 11vh 0px 1px #fff,
    /* ... 更多粒子 ... */
    -10vw 80vh 1px 1px #fff, 90vw 20vh 0px 1px #fff, 57vw 8vh 1px 1px #fff, -10vw 50vh 1px 0px #fff, -75vw 33vh 0px 1px #fff;
  animation: particles-anim 200s linear infinite;
}

@keyframes particles-anim {
  from { transform: translateY(0); }
  to { transform: translateY(-100vh); }
}

.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  z-index: 1;
}

.decorative-column, .form-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sprite-display {
  border: 1px solid rgba(0, 195, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 195, 255, 0.3);
  filter: drop-shadow(0 0 10px #00c3ff);
  opacity: 0.8;
}

/* --- 玻璃质感表单 --- */
.glass-form {
  width: 400px;
  padding: 40px;
  background: rgba(20, 30, 54, 0.7);
  backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(0, 195, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.system-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #00c3ff;
  box-shadow: 0 0 15px #00c3ff;
  margin-bottom: 20px;
}

.loginTitle {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
  background: linear-gradient(45deg, #00c3ff, #f700ff, #ffdd00);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-shadow: 0 0 10px rgba(0, 195, 255, 0.5);
}

.loginRemember {
  text-align: left;
  margin-bottom: 25px;
  /* 美化 checkbox */
  :deep(.el-checkbox__label) {
    color: #a9d6e5;
  }
  :deep(.el-checkbox__inner) {
    background-color: transparent;
    border-color: rgba(0, 195, 255, 0.5);
  }
}

.button-spacer {
  height: 15px;
}

/* --- 美化 Element Plus 组件 --- */
:deep(.el-form-item) {
  margin-bottom: 25px;
}

:deep(.el-input__wrapper) {
  background: rgba(0, 195, 255, 0.05) !important;
  box-shadow: none !important;
  border: 1px solid rgba(0, 195, 255, 0.3);
  border-radius: 8px;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper.is-focus) {
  background: rgba(0, 195, 255, 0.1) !important;
  box-shadow: 0 0 15px rgba(0, 195, 255, 0.5) !important;
  border-color: #00c3ff;
}

:deep(.el-input__inner) {
  color: #cdeeff;
}

:deep(.el-input__prefix .el-icon) {
  color: #00c3ff;
}

/* 登录按钮 */
.login-button {
  width: 100%;
  height: 45px;
  font-size: 16px;
  background: linear-gradient(45deg, #00c3ff, #007bff);
  border: none;
  transition: all 0.3s ease;
}
.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(0, 195, 255, 0.4);
}

/* 注册按钮 */
.register-button {
  width: 100%;
  height: 45px;
  font-size: 16px;
  background: transparent;
  border: 1px solid #00c3ff;
  color: #00c3ff;
  transition: all 0.3s ease;
}
.register-button:hover {
  background: rgba(0, 195, 255, 0.1);
  box-shadow: 0 0 15px rgba(0, 195, 255, 0.3);
}

/* 移除不再需要的旧样式 */
</style>