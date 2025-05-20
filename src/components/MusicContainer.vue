<template>
  <div class="music-container" :class="{ 'playing': playerState.isPlaying, 'collapsed': collapsed }">
    <div class="music-toggle" @click="toggleCollapse">
      <el-icon v-if="collapsed"><Headset /></el-icon>
      <el-icon v-else><Close /></el-icon>
    </div>
    
    <!-- 添加始终可见的浮动图标 -->
    <div class="float-indicator" v-if="collapsed && playerState.musicList.length > 0" @click="toggleCollapse">
      <el-icon><Mic /></el-icon>
      <div class="playing-dots" v-if="playerState.isPlaying">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    
    <!-- 原有内容 -->
    <div class="music-content" v-if="!collapsed && playerState.musicList.length > 0">
      <div class="music-header">
        <div class="album-cover" :style="coverStyle">
          <div class="vinyl-disk" :class="{ 'spinning': playerState.isPlaying }"></div>
        </div>
        <div class="music-info">
          <div class="song-title">{{ getCurrentSong?.title || '暂无播放' }}</div>
          <div class="song-artist">{{ getCurrentSong?.zuo || getCurrentSong?.artist || '' }}</div>
          <div class="time-info">
            <span>{{ formatTime(playerState.currentTime) }}</span>
            <span> / </span>
            <span>{{ formatTime(playerState.duration) }}</span>
          </div>
        </div>
      </div>
      
      <div class="progress-bar" @click="updateProgress">
        <div class="progress-bg"></div>
        <div class="progress-current" :style="{ width: currentProgress + '%' }"></div>
        <div class="progress-handle" :style="{ left: currentProgress + '%' }"
             @mousedown="startDrag" @touchstart="startDrag"></div>
      </div>
      
      <div class="music-controls">
        <button class="control-btn volume-btn" @click="toggleMute">
          <el-icon v-if="isMuted"><Mute /></el-icon>
          <el-icon v-else><Headset /></el-icon>
          <div class="volume-slider" @click.stop>
            <div class="volume-bar" @click="updateVolume">
              <div class="volume-bg"></div>
              <div class="volume-current" :style="{ width: playerState.volume * 100 + '%' }"></div>
              <div class="volume-handle" 
                   :style="{ left: playerState.volume * 100 + '%' }"
                   @mousedown="startVolumeDrag"
                   @touchstart="startVolumeDrag"></div>
            </div>
          </div>
        </button>
        <button class="control-btn" @click="prevSong">
          <el-icon><Back /></el-icon>
        </button>
        <button class="control-btn play-btn" @click="togglePlay">
          <el-icon v-if="playerState.isPlaying"><VideoPause /></el-icon>
          <el-icon v-else><VideoPlay /></el-icon>
        </button>
        <button class="control-btn" @click="nextSong">
          <el-icon><Right /></el-icon>
        </button>
        <button class="control-btn mode-btn" @click="switchPlayMode">
          <el-icon v-if="playerState.playMode === 1"><Sort /></el-icon>
          <el-icon v-else-if="playerState.playMode === 2"><Refresh /></el-icon>
          <el-icon v-else><Top /></el-icon>
        </button>
      </div>
    </div>
    
    <div class="mini-player" v-if="collapsed && playerState.musicList.length > 0">
      <div class="mini-album" :style="coverStyle" :class="{ 'spinning': playerState.isPlaying }"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { playerState, playerControls } from '../utils/musicPlayer';
import musicPlayer, { formatTime } from '../utils/musicPlayer';
import { Headset, Mute, Back, Right, VideoPause, VideoPlay, Sort, Refresh, Top, Close } from '@element-plus/icons-vue';

const collapsed = ref(false);
const audioElement = ref<HTMLAudioElement | null>(null);
const currentProgress = ref(0);
const progressInterval = ref<number | null>(null);
const isDragging = ref(false);
const isMuted = ref(false);
const isDraggingVolume = ref(false);

// 在组件挂载时获取音频实例并设置进度更新
onMounted(() => {
  audioElement.value = musicPlayer.getAudioInstance();
  
  // 定时更新进度条
  progressInterval.value = window.setInterval(() => {
    if (playerState.isPlaying && !isDragging.value) {
      currentProgress.value = playerControls.getCurrentProgress();
    }
  }, 1000);

  // 监听全局鼠标事件，用于拖动进度条
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('touchend', stopDrag);
  
  // 监听全局鼠标事件，用于拖动音量滑块
  document.addEventListener('mousemove', onVolumeDrag);
  document.addEventListener('mouseup', stopVolumeDrag);
  document.addEventListener('touchmove', onVolumeDrag);
  document.addEventListener('touchend', stopVolumeDrag);
});

// 组件卸载时清理定时器和事件监听
onUnmounted(() => {
  if (progressInterval.value) {
    clearInterval(progressInterval.value);
  }
  
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', stopDrag);
  
  document.removeEventListener('mousemove', onVolumeDrag);
  document.removeEventListener('mouseup', stopVolumeDrag);
  document.removeEventListener('touchmove', onVolumeDrag);
  document.removeEventListener('touchend', stopVolumeDrag);
});

// 获取当前播放的歌曲
const getCurrentSong = computed(() => {
  if (!playerState.musicList || playerState.musicList.length === 0) {
    return null;
  }
  return playerState.currentSong || playerState.musicList[playerState.currentIndex];
});

// 获取封面样式
const coverStyle = computed(() => {
  const song = getCurrentSong.value;
  if (song && song.img) {
    return {
      backgroundImage: `url(/images/${song.img})`
    };
  }
  return {
    backgroundColor: '#409EFF'
  };
});

// 开始拖动进度条
const startDrag = (e: MouseEvent | TouchEvent) => {
  e.preventDefault();
  isDragging.value = true;
};

// 拖动进度条
const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  
  const progressBar = document.querySelector('.progress-bar');
  if (!progressBar) return;
  
  const rect = progressBar.getBoundingClientRect();
  const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
  
  let progress = ((clientX - rect.left) / rect.width) * 100;
  progress = Math.max(0, Math.min(100, progress));
  
  currentProgress.value = progress;
};

// 停止拖动并更新播放进度
const stopDrag = () => {
  if (isDragging.value) {
    isDragging.value = false;
    playerControls.setCurrentProgress(currentProgress.value);
  }
};

// 点击进度条更新进度
const updateProgress = (e: MouseEvent) => {
  const progressBar = e.currentTarget as HTMLElement;
  const rect = progressBar.getBoundingClientRect();
  const progress = ((e.clientX - rect.left) / rect.width) * 100;
  
  currentProgress.value = Math.max(0, Math.min(100, progress));
  playerControls.setCurrentProgress(currentProgress.value);
};

// 开始拖动音量滑块
const startVolumeDrag = (e: MouseEvent | TouchEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDraggingVolume.value = true;
};

// 拖动音量滑块
const onVolumeDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDraggingVolume.value) return;
  
  const volumeBar = document.querySelector('.volume-bar');
  if (!volumeBar) return;
  
  const rect = volumeBar.getBoundingClientRect();
  const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
  
  let volume = (clientX - rect.left) / rect.width;
  volume = Math.max(0, Math.min(1, volume));
  
  playerControls.setVolume(volume);
};

// 停止拖动音量滑块
const stopVolumeDrag = () => {
  isDraggingVolume.value = false;
};

// 点击音量条更新音量
const updateVolume = (e: MouseEvent) => {
  e.stopPropagation();
  const volumeBar = e.currentTarget as HTMLElement;
  const rect = volumeBar.getBoundingClientRect();
  let volume = (e.clientX - rect.left) / rect.width;
  
  volume = Math.max(0, Math.min(1, volume));
  playerControls.setVolume(volume);
};

// 切换静音
const toggleMute = () => {
  playerControls.toggleMute();
  isMuted.value = playerState.isMuted;
};

// 切换播放/暂停
const togglePlay = () => {
  if (audioElement.value) {
    if (playerState.isPlaying) {
      audioElement.value.pause();
      playerControls.setPlayingState(false);
    } else {
      audioElement.value.play().catch(err => {
        console.error('播放失败', err);
      });
      playerControls.setPlayingState(true);
    }
  } else {
    playerControls.setPlayingState(!playerState.isPlaying);
  }
};

// 下一首
const nextSong = () => {
  playerControls.nextSong();
};

// 上一首
const prevSong = () => {
  playerControls.prevSong();
};

// 切换播放模式
const switchPlayMode = () => {
  const nextMode = (playerState.playMode % 3) + 1; // 在1-3之间循环
  playerControls.setPlayMode(nextMode);
};

// 切换折叠状态
const toggleCollapse = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style scoped>
.music-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  width: 320px;
  padding: A15px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  overflow: hidden;
}

.music-container.collapsed {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  padding: 0;
}

.music-toggle {
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  font-size: 18px;
  color: #409EFF;
  z-index: 2;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.music-toggle:hover {
  background-color: rgba(64, 158, 255, 0.1);
}

/* 浮动图标样式 */
.float-indicator {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
  z-index: 10;
}

.float-indicator:hover {
  transform: scale(1.1);
}

/* 脉冲动画效果 */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(64, 158, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 5px rgba(64, 158, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(64, 158, 255, 0);
  }
}

/* 播放指示器动画 */
.playing-dots {
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2px;
}

.playing-dots span {
  display: inline-block;
  width: 3px;
  height: 3px;
  background-color: white;
  border-radius: 50%;
}

.playing-dots span:nth-child(1) {
  animation: bounce 0.8s ease infinite;
}

.playing-dots span:nth-child(2) {
  animation: bounce 0.8s ease 0.2s infinite;
}

.playing-dots span:nth-child(3) {
  animation: bounce 0.8s ease 0.4s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.music-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.album-cover {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.vinyl-disk {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: radial-gradient(circle, #000 0%, #000 20%, transparent 20%, transparent 40%, #000 40%, #000 42%, transparent 42%, transparent 60%, #000 60%, #000 62%, transparent 62%);
  opacity: 0.7;
  transition: transform 0.3s ease;
}

.vinyl-disk.spinning {
  animation: spin 5s linear infinite;
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.music-info {
  flex: 1;
  padding-left: 15px;
  overflow: hidden;
}

.song-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #303133;
}

.song-artist {
  font-size: 14px;
  color: #909399;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.time-info {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  margin: 10px 0 20px;
  position: relative;
  cursor: pointer;
}

.progress-bg {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  border-radius: 2px;
}

.progress-current {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #409EFF;
  border-radius: 2px;
  transition: width 0.3s linear;
}

.progress-handle {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  background-color: #409EFF;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: left 0.3s linear;
}

.music-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}

.control-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #606266;
  transition: all 0.2s;
}

.control-btn:hover {
  color: #409EFF;
  transform: scale(1.1);
}

.play-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #ecf5ff;
  font-size: 22px;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
}

.play-btn:hover {
  background-color: #d6ecff;
}

.playing .play-btn {
  background-color: #409EFF;
  color: white;
}

.mode-btn {
  font-size: 18px;
}

.mini-player {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-album {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.mini-album.spinning {
  animation: spin 5s linear infinite;
}

.volume-btn {
  font-size: 18px;
  position: relative;
}

.volume-slider {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) rotate(-90deg);
  width: 80px;
  height: 30px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  z-index: 10;
}

.volume-btn:hover .volume-slider {
  display: flex;
}

.volume-bar {
  width: 100%;
  height: 4px;
  position: relative;
  cursor: pointer;
}

.volume-bg {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  border-radius: 2px;
}

.volume-current {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #409EFF;
  border-radius: 2px;
}

.volume-handle {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  background-color: #409EFF;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

/* 适配移动设备 */
@media (max-width: 768px) {
  .music-container {
    width: 300px;
    bottom: 15px;
    right: 15px;
  }
}
</style> 