<template>
  <el-main class="custom-main">
    <div class="container">
      <!-- 左侧边栏 -->
      <div class="sidebar-buttons">
        <div class="sidebar-item" @click="cha()"><el-icon><Position /></el-icon><span>直达</span></div>
        <div class="sidebar-item" @click="xunding()"><el-icon><Tickets /></el-icon><span>订单</span></div>
        <div class="sidebar-item" @click="zhuan()"><el-icon><Switch /></el-icon><span>中转</span></div>
        <div class="sidebar-item" @click="ce()"><el-icon><Headset /></el-icon><span>测试(music)</span></div>
        <div class="sidebar-item" @click="talk()"><el-icon><ChatDotRound /></el-icon><span>测试(talk)</span></div>
        <div class="sidebar-item" @click="novel()"><el-icon><Collection /></el-icon><span>测试(novel)</span></div>

        <!-- 测试(question) 下拉 -->
        <el-dropdown trigger="hover" @command="handleQuestionCommand" popper-class="custom-dropdown">
          <div class="sidebar-item">
            <el-icon><QuestionFilled /></el-icon><span>测试(question)</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="claude">Claude Sonnet 4</el-dropdown-item>
              <el-dropdown-item command="chatgpt">Chatgpt/Gemini/Grok</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 测试(3D) 级联下拉 -->
        <el-dropdown trigger="hover" @command="handle3DCommand" popper-class="custom-dropdown" :hide-timeout="200">
          <div class="sidebar-item">
            <el-icon><Box /></el-icon><span>测试(3D)</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- 太阳系级联菜单 -->
              <el-dropdown-item :divided="true">
                <el-dropdown placement="right-start" trigger="hover" @command="handleSolarCommand" popper-class="custom-dropdown cascade-dropdown" :show-timeout="50">
                  <span class="cascade-trigger">太阳系</span>
                  <el-icon class="el-icon--right"><ArrowRight /></el-icon>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <!-- 添加 @click.stop 以防止父菜单关闭 -->
                      <el-dropdown-item command="solar-v1" @click.stop>1.0</el-dropdown-item>
                      <el-dropdown-item command="solar-v2" @click.stop>2.0</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-dropdown-item>
              <!-- 我的世界直接选项 -->
               <el-dropdown-item :divided="true">
                <el-dropdown placement="right-start" trigger="hover" @command="handleSolarCommand" popper-class="custom-dropdown cascade-dropdown" :show-timeout="50">
                  <span class="cascade-trigger">我的世界</span>
                  <el-icon class="el-icon--right"><ArrowRight /></el-icon>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <!-- 添加 @click.stop 以防止父菜单关闭 -->
                      <el-dropdown-item command="world-v1" @click.stop>1.0(此版本需要较大内存，请清理后台)</el-dropdown-item>
                      <el-dropdown-item command="world-v2" @click.stop>2.0</el-dropdown-item>
                      <el-dropdown-item command="world-v3" @click.stop>3.0(推荐)</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
         <div class="sidebar-item" @click="question2()"><el-icon><QuestionFilled /></el-icon><span>测试(question2)</span></div>
      </div>

      <!-- 中间主内容区 -->
      <div class="main-content" ref="mainContent">
        <div class="glass-panel">
          <AuraWing /> 
          <div class="main-title">欢迎来到火车站系统</div>
          <div class="o">用户：{{ name }}</div>
          <input
            style="margin-right: 10px; margin-bottom: 20px; color: #fff;"
            type="file"
            id="fi"
            accept=".jpg"
            @click="shua()"
          />
          <div class="p">
            <img :src="imgStr" alt="" class="im" />
          </div>
          <div class="i">请选择出行日期</div>
          <div>
            <el-calendar v-model="value" class="b" />
          </div>
          <div class="input-group">
            <el-input v-model="qi" placeholder="请输入起始点" clearable></el-input>
            <el-input v-model="zh" placeholder="请输入终止点" clearable></el-input>
          </div>
        </div>
      </div>
      
      <!-- 右侧星空动画区 -->
      <div class="animation-area" ref="animationArea">
        <div class="star-bg" ref="starBgContainer"></div>
        <div class="shooting-star-bg" ref="shootingStarContainer"></div>
      </div>
    </div>
  </el-main>
</template>

<script lang="ts">
import {
  Position, Tickets, Switch, Headset, ChatDotRound, Collection, QuestionFilled, ArrowRight, Box
} from '@element-plus/icons-vue'
import { ref, onMounted, onBeforeUnmount, defineComponent } from 'vue'
import router from '../router';
import request from "../utils/request";
import { ElMessage } from 'element-plus';
import AuraWing from './AuraWing.vue';

export default defineComponent({
  components: {
    AuraWing,
    Position, Tickets, Switch, Headset, ChatDotRound, Collection, QuestionFilled, ArrowRight, Box
  },
  data: () => ({
    qi: "", 
    zh: "", 
    name: "", 
    imgStr: "", 
    value: ref(new Date()),
  }),
  async created() {
    const res = this.$route.query.xin;
    if (res) {
      this.name = res.toString();
    } else {
      const res1 = this.$route.query.name;
      if (res1) this.name = res1.toString();
    }
    if (this.name) {
      const fd = new FormData();
      fd.append("manage", this.name);
      request.post("/user/getPhoto", fd).then(res => { this.imgStr = `https://raw.githubusercontent.com/weicengxing100/images/main/${this.name.replace('/src/assets/', '')}`; });
    }
  },
  methods: {
    cha() {
      const mon = this.value.getMonth();
      const day = this.value.getDate();
      router.push({ path: "Lu", query: { qi: this.qi, zh: this.zh, name: this.name, mon, day } });
    },
    novel() {
      router.push({ path: "novel-simple", query: { name: this.name } });
    },
    shua() {
      ElMessage({ type: 'success', message: '请在10秒内选出头像' });
      this.sleep(10000).then(() => {
        const file = document.querySelector("#fi") as HTMLInputElement;
        if (file && file.files && file.files.length > 0) {
          const fd = new FormData();
          fd.append("pic", file.files[0]);
          fd.append("manage", this.name);
          this.imgStr=  URL.createObjectURL(file.files[0]);           
          request.post("/user/upload3", fd)}})
    },
    sleep(time: number) {
      return new Promise(resolve => setTimeout(resolve, time));
    },
    ce() {
      router.push({ path: "Ce", query: { name: this.name } });
    },
     question2() {
      router.push({ path: "ques2", query: { name: this.name } });
    },
    talk() {
      router.push({ path: "Talk", query: { name: this.name } });
    },
    zhuan() {
      const mon = this.value.getMonth();
      const day = this.value.getDate();
      router.push({ path: "Zhuan", query: { qi: this.qi, zh: this.zh, name: this.name, mon, day } });
    },
    xunding() {
      router.push({ path: "Di", query: { name: this.name } });
    },
    handleQuestionCommand(command: string) {
      if (command === 'claude') window.open('https://easychat.top', '_blank');
      else if (command === 'chatgpt') window.open('https://52chatgpt.top/', '_blank');
    },
    // 处理3D菜单的命令（处理我的世界选项）
    handle3DCommand(command: string) {
      if (command === 'world') {
        window.open('https://52chatgpt.top/', '_blank');
      }
    },
    // 处理太阳系级联菜单的命令
    handleSolarCommand(command: string) {
      if (command === 'solar-v1') {
        window.open('xing2.html', '_blank');
      } else if (command === 'solar-v2') {
        window.open('xing4.html', '_blank');
      }
       else if (command === 'world-v1') {
        window.open('shijie.html', '_blank');
      } else if (command === 'world-v2') {
        window.open('shijie2.html', '_blank');
      }
      else if (command === 'world-v3') {
        window.open('shijie3.html', '_blank');
      }
    },
    createStars() {
      const container = this.$refs.starBgContainer as HTMLElement | null;
      const area = this.$refs.animationArea as HTMLElement | null;
      if (!container || !area) return;
      container.innerHTML = '';
      const areaWidth = area.offsetWidth;
      const areaHeight = area.offsetHeight;
      if (areaWidth === 0 || areaHeight === 0) return;
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.classList.add('star-particle');
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * areaWidth}px`;
        star.style.top = `${Math.random() * areaHeight}px`;
        star.style.animationDuration = `${Math.random() * 3 + 3}s`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        container.appendChild(star);
      }
    },
    createShootingStars() {
      const container = this.$refs.shootingStarContainer as HTMLElement | null;
      const area = this.$refs.animationArea as HTMLElement | null;
      if (!container || !area) return;
      container.innerHTML = '';
      const areaWidth = area.offsetWidth;
      const areaHeight = area.offsetHeight;
      const colors = ['cyan', 'pink', 'gold'];
      for (let i = 0; i < 5; i++) {
        const shootingStar = document.createElement('div');
        const colorClass = colors[Math.floor(Math.random() * colors.length)];
        shootingStar.classList.add('shooting-star', colorClass);
        shootingStar.style.top = `${Math.random() * areaHeight * 0.6}px`;
        shootingStar.style.left = `${Math.random() * areaWidth}px`;
        shootingStar.style.animationDelay = `${Math.random() * 10 + 2}s`;
        container.appendChild(shootingStar);
      }
    },
    handleResize() {
      this.createStars();
      this.createShootingStars();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.createStars();
      this.createShootingStars();
    });
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
});
</script>

<style scoped>
/* --- 全局美化与布局 --- */
.custom-main {
  padding: 0;
  background-color: #000;
  overflow: hidden;
}
.container {
  display: flex;
  width: 100%;
  height: 100vh;
}

/* 隐藏滚动条，但保留滚动能力 */
/* Webkit：Chrome、Safari、Edge Chromium */
.custom-main::-webkit-scrollbar,
.main-content::-webkit-scrollbar {
  width: 0;
  height: 0;
}
/* Firefox */
.custom-main,
.main-content {
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE 10+ */
}

/* --- 侧边栏美化 --- */
.sidebar-buttons {
  flex: 0 0 280px;
  background: rgba(14, 23, 41, 0.8);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(0, 195, 255, 0.3);
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-shadow: 5px 0 25px rgba(0, 195, 255, 0.2);
  z-index: 10;
}
.sidebar-buttons > .el-dropdown {
  display: block;
}
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px 30px;
  cursor: pointer;
  font-size: 16px;
  color: #cdeeff;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  text-shadow: 0 0 5px rgba(0, 195, 255, 0.5);
}
.sidebar-item .el-icon {
  font-size: 20px;
}
.sidebar-item:hover,
:deep(.el-dropdown.is-active .sidebar-item),
.el-dropdown:focus-within .sidebar-item {
  background: rgba(0, 195, 255, 0.1);
  border-left: 3px solid #00c3ff;
  color: #fff;
  transform: translateX(5px);
}

/* --- 中间内容区美化 --- */
.main-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
}
.main-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #00c3ff, #f700ff, #ffdd00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 15px rgba(0, 195, 255, 0.5);
}
.im {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #00c3ff;
  box-shadow: 0 0 20px #00c3ff;
  margin-bottom: 20px;
}
.p {
  margin: 0;
}
.i {
  font-size: 20px;
  color: #a9d6e5;
  margin-bottom: 10px;
  margin-top: 20px;
}
.o {
  font-size: 24px;
  color: #fca311;
  margin-bottom: 20px;
}
.input-group {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}
.glass-panel {
  width: 100%;
  max-width: 800px;
  background: rgba(20, 30, 54, 0.7);
  backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(0, 195, 255, 0.2);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  text-align: center;
  position: relative;
}
:deep(.aura-wing-wrapper) {
  position: absolute;
  top: -40px;
  right: 0;
  transform: translateX(35%) translateY(-15%);
  z-index: -1;
  pointer-events: none;
  opacity: 0.8;
}

/* --- Element Plus 组件美化 --- */
:deep(.el-calendar),
:deep(.el-input) {
  --el-fill-color-blank: transparent;
  --el-border-color: rgba(0, 195, 255, 0.3);
  --el-text-color-regular: #cdeeff;
}
:deep(.el-calendar__header) {
  border-bottom: 1px solid var(--el-border-color);
}
:deep(.el-calendar-table .el-calendar-day) {
  height: 40px;
}
:deep(.el-input__wrapper) {
  background: rgba(0, 195, 255, 0.05);
  box-shadow: none;
  transition: all 0.3s ease;
}
:deep(.el-input__wrapper.is-focus) {
  background: rgba(0, 195, 255, 0.1);
  box-shadow: 0 0 15px rgba(0, 195, 255, 0.5);
}

/* --- 星空动画区 --- */
.animation-area {
  flex: 0 0 350px;
  position: relative;
  overflow: hidden;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
}
.star-bg,
.shooting-star-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
:deep(.star-particle) {
  position: absolute;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 8px #fff, 0 0 16px #fff, 0 0 28px #0ff, 0 0 42px #0ff;
  animation: flash 4s linear infinite;
}
@keyframes flash {
  0%, 95% { opacity: 0; transform: scale(0.5); }
  98% { opacity: 1; transform: scale(1.5); }
  100% { opacity: 0; transform: scale(0.5); }
}
:deep(.shooting-star) {
  position: absolute;
  height: 2px;
  border-radius: 999px;
  animation: shoot 3s linear infinite;
}
:deep(.shooting-star.cyan) {
  background: linear-gradient(-45deg, #59d0ff, rgba(0, 0, 255, 0));
  filter: drop-shadow(0 0 6px #69f3ff);
}
:deep(.shooting-star.pink) {
  background: linear-gradient(-45deg, #ff5e9a, rgba(255, 0, 0, 0));
  filter: drop-shadow(0 0 6px #ff5e9a);
}
:deep(.shooting-star.gold) {
  background: linear-gradient(-45deg, #ffdc73, rgba(255, 255, 0, 0));
  filter: drop-shadow(0 0 6px #ffdc73);
}
@keyframes shoot {
  0% {
    transform: translateX(0) translateY(0) rotate(45deg);
    opacity: 1;
    width: 0;
  }
  70% {
    opacity: 1;
    width: 200px;
  }
  100% {
    transform: translateX(300px) translateY(300px) rotate(45deg);
    opacity: 0;
    width: 200px;
  }
}
</style>

<style>
/* 
 * 移除页面滚动条
 * 这将隐藏浏览器默认的滚动条，保持UI的整洁和沉浸感。
 */
body {
  overflow: hidden !important;
}

.custom-dropdown .el-popper__arrow::before {
  background: #1e293b;
  border-color: rgba(0, 195, 255, 0.3);
}
.el-dropdown-menu.custom-dropdown,
.el-dropdown-menu.el-dropdown-menu--dropdown {
  background-color: #1e293b !important;
  border: 1px solid rgba(0, 195, 255, 0.3) !important;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 195, 255, 0.2);
  padding: 6px;
  backdrop-filter: blur(10px);
}
.el-dropdown-menu__item {
  color: #cdeeff;
  transition: all 0.2s ease;
}
.el-dropdown-menu__item:hover {
  background-color: rgba(0, 195, 255, 0.1);
  color: #ffffff;
  border-radius: 4px;
}
.el-dropdown-menu__item .el-icon.el-icon--right {
  margin-left: auto;
  margin-right: -5px;
}

/* 级联下拉菜单特殊样式 */
.cascade-dropdown .el-dropdown-menu {
  background-color: #1e293b !important;
  border: 1px solid rgba(0, 195, 255, 0.3) !important;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 195, 255, 0.2);
  backdrop-filter: blur(10px);
}

/* 级联触发器文字颜色 */
.cascade-trigger {
  color: #cdeeff !important;
}

/* 防止级联菜单项被点击时关闭父菜单 */
.el-dropdown-menu__item .el-dropdown {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-dropdown-menu__item .el-dropdown:hover {
  background-color: transparent;
}

/* 让分割线颜色更匹配主题 */
.el-dropdown-menu__item--divided {
  border-top: 1px solid rgba(0, 195, 255, 0.2);
}
</style>