import { createApp } from "vue";
import App from "./App.vue";

// import "~/styles/element/index.scss";

import ElementPlus from "element-plus";
// import all element css, uncommented next line


// or use cdn, uncomment cdn link in `index.html`



import * as ElementPlusIconsVue from '@element-plus/icons-vue'



import AppleMusicPlayer from 'apple-music-player'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/index.css'
import router from "./router";
import './style.css'

// 导入全局音乐播放器服务
import musicPlayer from './utils/musicPlayer'

const app = createApp(App);

// 将音乐播放器服务添加到全局属性中
app.config.globalProperties.$musicPlayer = musicPlayer;

app.use(AppleMusicPlayer)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus);
app.use(router);
app.mount("#app");
