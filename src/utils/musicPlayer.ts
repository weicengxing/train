// 全局音乐播放器服务
import { ref, reactive, watch } from 'vue';

// 实际音频播放器实例
let audioInstance: HTMLAudioElement | null = null;

// 格式化时间(将秒数转换为 mm:ss 格式)
export function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '00:00';
  seconds = Math.floor(seconds);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// 音乐播放状态
export const playerState = reactive({
  currentSong: null as any, // 当前播放的歌曲
  musicList: [] as any[], // 音乐列表
  isPlaying: false, // 是否正在播放
  currentIndex: 0, // 当前播放的索引
  darkTheme: false, // 主题
  playMode: 1, // 播放模式
  currentTime: 0, // 当前播放时间(秒)
  duration: 0, // 音频总时长(秒)
  volume: 1, // 音量(0-1)
  isMuted: false, // 是否静音
});

// 初始化音频实例
function initAudioInstance() {
  if (!audioInstance) {
    audioInstance = new Audio();
    
    // 设置初始音量
    audioInstance.volume = playerState.volume;
    
    // 监听音频事件
    audioInstance.addEventListener('ended', () => {
      // 播放结束后自动播放下一首
      playerControls.nextSong();
    });
    
    audioInstance.addEventListener('timeupdate', () => {
      playerState.currentTime = audioInstance.currentTime;
    });
    
    audioInstance.addEventListener('durationchange', () => {
      playerState.duration = audioInstance.duration;
    });
    
    audioInstance.addEventListener('volumechange', () => {
      playerState.volume = audioInstance.volume;
      playerState.isMuted = audioInstance.muted;
    });
    
    audioInstance.addEventListener('error', (e) => {
      console.error('音频播放错误', e);
      playerState.isPlaying = false;
    });
  }
  
  return audioInstance;
}

// 音乐播放控制方法
export const playerControls = {
  // 设置音乐列表
  setMusicList(list: any[]) {
    playerState.musicList = list;
    
    // 如果当前没有选中的歌曲，默认选择第一首
    if (playerState.musicList.length > 0 && !playerState.currentSong) {
      this.setCurrentSong(playerState.musicList[0], 0);
    }
  },
  
  // 设置当前播放的歌曲
  setCurrentSong(song: any, index: number) {
    playerState.currentSong = song;
    playerState.currentIndex = index;
    
    // 更新音频源
    const audio = initAudioInstance();
    if (song && song.src) {
      audio.src = song.src;
      
      // 重置时间
      playerState.currentTime = 0;
      playerState.duration = 0;
      
      // 如果当前状态是播放，则立即播放
      if (playerState.isPlaying) {
        audio.play().catch(err => console.error('无法自动播放歌曲', err));
      }
    }
  },
  
  // 设置播放状态
  setPlayingState(isPlaying: boolean) {
    playerState.isPlaying = isPlaying;
    
    const audio = initAudioInstance();
    if (isPlaying) {
      if (playerState.currentSong && playerState.currentSong.src) {
        audio.play().catch(err => {
          console.error('无法播放歌曲', err);
          playerState.isPlaying = false;
        });
      }
    } else {
      audio.pause();
    }
  },
  
  // 设置主题
  setTheme(isDark: boolean) {
    playerState.darkTheme = isDark;
  },
  
  // 设置播放模式
  setPlayMode(mode: number) {
    playerState.playMode = mode;
  },
  
  // 下一首
  nextSong() {
    if (playerState.musicList.length === 0) return;
    
    let nextIndex = playerState.currentIndex;
    
    // 根据播放模式决定下一首歌
    if (playerState.playMode === 3) {
      // 随机播放
      nextIndex = Math.floor(Math.random() * playerState.musicList.length);
    } else {
      // 顺序播放或循环播放
      nextIndex = (playerState.currentIndex + 1) % playerState.musicList.length;
    }
    
    this.setCurrentSong(playerState.musicList[nextIndex], nextIndex);
  },
  
  // 上一首
  prevSong() {
    if (playerState.musicList.length === 0) return;
    
    let prevIndex = playerState.currentIndex;
    
    // 根据播放模式决定上一首歌
    if (playerState.playMode === 3) {
      // 随机播放
      prevIndex = Math.floor(Math.random() * playerState.musicList.length);
    } else {
      // 顺序播放或循环播放
      prevIndex = (playerState.currentIndex - 1 + playerState.musicList.length) % playerState.musicList.length;
    }
    
    this.setCurrentSong(playerState.musicList[prevIndex], prevIndex);
  },
  
  // 获取当前播放进度（0-100）
  getCurrentProgress() {
    const audio = initAudioInstance();
    if (!audio || audio.duration === 0) return 0;
    return (audio.currentTime / audio.duration) * 100;
  },
  
  // 设置播放进度
  setCurrentProgress(progress: number) {
    const audio = initAudioInstance();
    if (!audio || audio.duration === 0) return;
    
    const seekTime = (progress / 100) * audio.duration;
    audio.currentTime = seekTime;
    playerState.currentTime = seekTime;
  },
  
  // 设置音量
  setVolume(volume: number) {
    const audio = initAudioInstance();
    if (!audio) return;
    
    volume = Math.max(0, Math.min(1, volume));
    audio.volume = volume;
    playerState.volume = volume;
  },
  
  // 设置静音状态
  setMuted(muted: boolean) {
    const audio = initAudioInstance();
    if (!audio) return;
    
    audio.muted = muted;
    playerState.isMuted = muted;
  },
  
  // 切换静音状态
  toggleMute() {
    const audio = initAudioInstance();
    if (!audio) return;
    
    audio.muted = !audio.muted;
    playerState.isMuted = audio.muted;
  }
};

// 监听状态变化
// 尝试从localStorage恢复播放状态
try {
  const savedState = localStorage.getItem('music_playing_state');
  if (savedState) {
    const state = JSON.parse(savedState);
    if (state.currentIndex !== undefined) {
      playerState.currentIndex = state.currentIndex;
    }
    if (state.playMode !== undefined) {
      playerState.playMode = state.playMode;
    }
    if (state.volume !== undefined) {
      playerState.volume = state.volume;
      const audio = initAudioInstance();
      if (audio) {
        audio.volume = state.volume;
      }
    }
  }
} catch (e) {
  console.error('恢复音乐播放状态失败', e);
}

// 导出默认对象便于使用
export default {
  state: playerState,
  controls: playerControls,
  getAudioInstance: initAudioInstance,
  formatTime
}; 