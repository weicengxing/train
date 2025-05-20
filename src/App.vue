<template>
  <!-- 
   
   -->
 
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
   <View_hh></View_hh>

  <!-- 全局音乐播放控制器 -->
  <MusicContainer />
</template>

<script lang="ts" setup>
import View_hh from './components/View.vue'
import MusicContainer from './components/MusicContainer.vue'
import { onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { playerState } from './utils/musicPlayer';

const route = useRoute();

// 在路由切换时保持音乐播放状态
watch(() => route.path, (newPath, oldPath) => {
  // 路由变化时，不需要做任何操作，音乐状态由全局状态维护
  console.log('路由变化，维持音乐播放状态', playerState.isPlaying);
});

// 在页面关闭前保存当前播放状态
onBeforeUnmount(() => {
  // 可以选择在这里将播放状态保存到localStorage
  try {
    localStorage.setItem('music_playing_state', JSON.stringify({
      isPlaying: playerState.isPlaying,
      currentIndex: playerState.currentIndex,
      playMode: playerState.playMode
    }));
  } catch (e) {
    console.error('保存音乐播放状态失败', e);
  }
});

// 页面加载时恢复播放状态
onMounted(() => {
  try {
    const savedState = localStorage.getItem('music_playing_state');
    if (savedState) {
      const state = JSON.parse(savedState);
      // 状态会在组件加载时恢复
      console.log('恢复音乐播放状态', state);
    }
  } catch (e) {
    console.error('恢复音乐播放状态失败', e);
  }
});

// export default {
//   name: 'App',
//   components: {
//     HellWorld
//   }
// }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #886e12;
  margin-top: 10px;
}
</style>
