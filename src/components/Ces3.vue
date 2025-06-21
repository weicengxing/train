<template>
  <div v-for="[key, item] in downlist">
      <div style="width: 100%; background-color: #f3f3f3; border: 1px solid #ccc;">
        <div 
          style="height: 20px; background-color: #4caf50;" 
          :style="{ width: item.progress + '%' }">
        </div>
      </div>
      <p>{{ item.progress.toFixed(2) }}% 下载中({{ item.cfile }})...已下载{{item.cpro/1000}}KB  总大小{{item.tpro/1000}}KB  当前网速{{item.speed}}KB/S 预计剩余{{item.shengtim}}S</p>
    </div>
 <el-table
ref="muti"
 
 
    :data="song"
    :header-cell-style="{
      color: '#2E2E2E',
      fontSize: '10px',
      fontWeight: '400',
    
      
    }"
    :row-style="{ height: '1px' }"
    
    style="width: 100%"
    class="i"
  >
  
 
  <el-table-column label=""  width="50" color="black" v-if="value2">
    <template v-slot="scope">
      <b class="xuh">
       {{ scope.row.xu }}
      </b>
      </template>
     
   
  </el-table-column>
    <el-table-column label="" color="black"  width="140" >
      <template v-slot="scope">
        <a class="title" >
        {{ scope.row.title }}
        </a>
        <p class="zuo">
        {{  scope.row.zuo }}
        </p>
      </template>
    </el-table-column>
      <el-table-column label=""   color="black">
        <template v-slot="scope">
       <img :src="`/images/${scope.row.img}`" height="80px" class="im" v-if=scope.row.img>
      </template>
   
  </el-table-column>
    <el-table-column label=""  :width="wid" color="black">
      
      <!-- {{ scope.$index + 1 }} -->
   
  </el-table-column>

   
    <el-table-column label="" color="black"  width="50">
      <template v-slot="scope">
        <el-icon  @click="onbo(scope.row.xu)" color="#FF0000"><VideoPlay /></el-icon>
      </template>
    </el-table-column>
    <el-table-column label="" color="black"  width="50">
      <template v-slot="scope">
        <el-icon @click="mv(scope.row.xu)" color="#3399FF" ><VideoCamera /></el-icon>
      </template>
    </el-table-column>
    <el-table-column label="" color="black"  width="50">
      <template v-slot="scope">
        <el-icon @click="Down(scope.row.title)" color="#00CD66" ><Download /></el-icon>
      </template>
    </el-table-column>
    <el-table-column label="" color="black"  width="50">
      <template v-slot="scope">
        <el-icon @click="Down4(scope.row.title)" color="#FFD700" ><Download /></el-icon>
      </template>
    </el-table-column>
    
  </el-table>
  
  <p></p>
<div class="l">
   
  
  <el-pagination
    v-model:current-page="currentPage3"
    v-model:page-size="pageSize3"
    :size="size"
    :disabled="disabled"
    :background="background"
    layout="prev, pager, next, jumper"
    :total="size"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >

  </el-pagination>
  <p><el-switch v-model="value1" />
</p>
  <div v-show="value1">
    <el-input v-model="sou"style="width: 250px;">
</el-input>
<el-select v-model="mol2" placeholder="选择搜索模式" style="width: 150px;">
      <el-option  value="关键字" ><el-icon color="#8470FF"><Link /></el-icon>关键字</el-option>
      <el-option  value="相关页" ><el-icon color="#00FF7F"><position /></el-icon>相关页</el-option>
     
    </el-select>
<el-button type="primary" @click="sousu()" plain="true" class="po">
  <el-icon color="#CC00CC"><Search /></el-icon>搜索
 </el-button>
<p></p>
<el-switch v-model="value2" @click="xuhao()"/>
  <el-select v-model="region" placeholder="选择每页行数" width="20px">
      <el-option label="1 " value=1 />
      <el-option label="2" value=2 />
      <el-option label="3 " value=3 />
      <el-option label="4" value=4 />
      <el-option label="5 " value=5 />
      <el-option label="6" value=6 />
      <el-option label="7 " value=7 />
      <el-option label="8 " value=8 />
      <el-option label="9 " value=9 />
    </el-select>
    
    <el-select v-model="mol" placeholder="选择播放模式" width="20px">
      <el-option  value="顺序播放" ><el-icon color="#00FF00"><Right /></el-icon>顺序播放</el-option>
      <el-option  value="循环播放" ><el-icon color="#88DDDD"><Sort /></el-icon>循环播放</el-option>
      <el-option  value="随机播放" ><el-icon color="#00FFFF"><Rank /></el-icon>随机播放</el-option>
     
     

    </el-select>
    <p class="qu">
 <el-button type="success" @click="hand()" plain="true">
  <el-icon color="#FF3333"><Star /></el-icon>确定行
 </el-button>
 <el-button type="primary" @click="quemo()" plain="true">
  <el-icon color="#CC00CC"><Compass /></el-icon>确定模
 </el-button>
 
</p>

  </div>
    </div>
    <p></p>

<div style="padding-top:10%;display: flex; justify-content: center; align-items: center;">
  <div style="height: 200px;width: 500px;border:1px solid #ccc;padding: 20px">
    
    <!-- === START: Integrated Apple Music Player (Corrected Style) === -->
    <div class="integrated-player-wrapper">
      <audio ref='audioRef'></audio>
      <div class='player'>
        <!-- Left Column: Album Art + Controls -->
        <div class="player-left-column">
           <div 
            class="disk_img" 
            :style="{
              backgroundImage: player_playSongSrc.img ? `url('/images/${player_playSongSrc.img}')` : ''
            }"
          ></div>
          <div class="player-controls-bar">
            <div class="control_btn" @click="player_switchSong(false)">
              <span>上一首</span>
            </div>
            <div class="control_btn" @click="player_playSong()">
              <span>
                <div v-show="!player_isPaused">暂停</div>
                <div v-show="player_isPaused">播放</div>
              </span>
            </div>
            <div class="control_btn" @click="player_switchSong(true)">
              <span>下一首</span>
            </div>
          </div>
        </div>
        
        <!-- Right Column: Metadata + Lyrics -->
        <div class="player_control">
          <div class="song-meta">
             <p class="song-title">{{ player_playSongSrc.title }} - {{ player_playSongSrc.zuo }}</p>
             <!-- You can add more metadata here if available in your data objects -->
             <!-- <p class="song-credits">词: {{ player_playSongSrc.ci }}</p> -->
          </div>
          <div class="lyricBox">
            <div :style="player_lycStyle" class="lyricStyle">
              <p 
                v-for="(item, i) in player_lyricList"  
                :key="i" 
                :style="{
                  color: player_currentLyc == i ? '#007aff' : '',
                  fontWeight: player_currentLyc == i ? 'bold' : 'normal'
                }"
              >{{ item.lyc }}</p>
            </div>
          </div>
          <!-- PROGRESS BAR MOVED OUTSIDE of .player_control -->
        </div>
      </div>
      <!-- Progress Bar is now at the bottom of the wrapper -->
      <div 
          class="progress-container" 
          ref='progresscontainerRef'
          @click="player_setProgressBtn"
        >
          <div 
            ref='progressRef' 
            class="progress" 
            :style="{'backgroundColor': 'rgba(211, 16, 16, 0.5)'}"
          ></div>
        </div>
    </div>
    <!-- === END: Integrated Apple Music Player === -->
  
  </div>
</div>

  </template>
  <script lang="ts" setup>
  import {ref, onMounted, getCurrentInstance, computed, watch} from 'vue' // Added computed and watch
  import router from "../router";
  import { ElMessage  } from 'element-plus'
  import { getRowIdentity } from 'element-plus/es/components/table/src/util.mjs';
  import request from "../utils/request";
  import axios from 'axios'
  import { Download, Position } from '@element-plus/icons-vue';
  import musicPlayer, { playerState, playerControls } from '../utils/musicPlayer';
  import{userurl} from '/public/config.ts'
  const background = ref(false)
  const disabled = ref(false)
  const currentPage3 = ref(1)
  const imagename=ref("不得不爱.jpg");
  const sou=ref("请输入歌名");
  const size=ref();
  const value1=ref(true);
  const downlist=ref();
  const value2=ref(true);
  const pageSize3 = ref(100)
  const io=ref(4);
  const wid=ref(190);
  const mol=ref();
  const mol2=ref();
  const region=ref();
  const maxmu=ref();
  const darkTheme=ref(false)
  const musicList2=ref([]); // Initialize as empty array
  const song=ref();
  const cmusic=ref();
  const index=ref();
  const moshi=ref(1);
  const title=ref("haha");
  const name=ref();

  const hand=async ()=>{
    var fd=new FormData();
    fd.append("pag",region.value+"")
    await request.post("/deal/getrow",fd);
    fd.append("page","1")
    request.post("/deal/getpagesizemu").then(res=>{
      size.value=res.data*100;
    });
    request.post("/deal/getpagemu",fd).then(res=>{
      song.value=res.data;
    });
  };

  const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
  }

  const onbo = (val: string) => {
    // This now directly controls the player via a watch effect
    index.value = parseInt(val) - 1;
  }
  
  const sousu = () => {
    var fd=new FormData();
    fd.append("page",sou.value)
    fd.append("mo",mol2.value)
    request.post("/deal/sousu",fd).then(res=>{
      song.value=res.data;
      if(mol2.value=="相关页"){
        request.post("/deal/getpage3").then(res=>{
          currentPage3.value=res.data;
        });
      }
    });
  }

  const handleCurrentChange = (val: number) => {
    var fd=new FormData();
    fd.append("page",currentPage3.value+"")
    request.post("/deal/getpagemu",fd).then(res=>{
      song.value=res.data;
    });
  }
  
  onMounted(async ()=>{
     downlist.value=new Map();

    request.post("/deal/getmusic").then(res=>{
      musicList2.value=res.data;
      if (!playerState.musicList || playerState.musicList.length === 0) {
        playerControls.setMusicList(res.data);
      }
      if (playerState.isPlaying && playerState.currentSong) {
        index.value = playerState.currentIndex;
        moshi.value = playerState.playMode;
      }
      // Initialize the player once the music list is loaded
      player_init();
    });
    
    request.post("/deal/getrow2").then(res=>{
      region.value=res.data;
    });
    
    var fd=new FormData();
    fd.append("page","1")
    await request.post("/deal/getpagemu",fd).then(res=>{
      song.value=res.data;
    });
    await request.post("/deal/getpagesizemu").then(res=>{
      size.value=res.data*100;
    });

    maxmu.value = computed(() => player_musicList.value.length);
    wid.value=170;
  })
  
  const xuhao=()=>{
    if(wid.value==170){wid.value=220;}
    else wid.value=170;
  }
  
   const Down=async (title:string)=>{
    const downloadState = {
      progress: ref(0),
      cpro: ref(0),
      tpro: ref(0),
      speed: ref(0),
      lastpro:ref(0),
      lasttim:ref(0),
      cfile:ref(title+".mp3"),
      shengtim:ref(0)
    };
    downlist.value.set(title+".mp3", downloadState);
    
    axios({
      url: `${userurl}/deal/down`,  // 后端接口
      method: 'POST',
      params: {
        page:title
      },
      responseType: 'blob'  // 设置为 blob 以处理文件流
    ,
    onDownloadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
        downloadState.cpro.value = progressEvent.loaded;
        downloadState.tpro.value = progressEvent.total;
        
        downloadState.progress.value = (progressEvent.loaded / progressEvent.total) * 100;
        calculateInstantaneousSpeed(title+".mp3")
      }
    }
  }).then(response => {
   
    const blob = new Blob([response.data], { type: 'audio/mpeg' });
   
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = title;  // 设置下载文件名
    link.click();
    downlist.value.delete(title+".mp3");
  });
  }
  const Down4=async (title:string)=>{
    const downloadState = {
      progress: ref(0),
      cpro: ref(0),
      tpro: ref(0),
      speed: ref(0),
      lastpro:ref(0),
      lasttim:ref(0),
      cfile:ref(title+".mp4"),
      shengtim:ref(0)
    };
    downlist.value.set(title+".mp4", downloadState);
    
    axios({
      url: `${userurl}/deal/down4`,  // 后端接口
      method: 'POST',
      params: {
        page:title
      },
      responseType: 'blob'  // 设置为 blob 以处理文件流
    ,
    
    onDownloadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
        downloadState.cpro.value = progressEvent.loaded;
        downloadState.tpro.value = progressEvent.total;
        
        downloadState.progress.value = (progressEvent.loaded / progressEvent.total) * 100;
        calculateInstantaneousSpeed(title+".mp4")
      }
    }
  }).then(response => {
   
    const blob = new Blob([response.data], { type: 'video/mp4' }); // 创建 MP4 文件 Blob
   
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = title;  // 设置下载文件名
    link.click();
    downlist.value.delete(title+".mp4");
  });
  }
  
 const calculateInstantaneousSpeed=(title:string)=> {
    const cdown=downlist.value.get(title);
           
    
    
    const currentTime = Date.now();  // 当前时间
       
    const elapsedTime = (currentTime - cdown.lasttim) / 1000;  // 秒数

    if (elapsedTime > 0) {
      // 计算瞬间网速：当前已下载字节数 - 上次已下载字节数 / 时间差（秒）
      const speed2 = (cdown.cpro - cdown.lastpro) / elapsedTime / 1024;  // 转换为 KB/s
      
      cdown.shengtim=((cdown.tpro-cdown.cpro)/(speed2*1024)).toFixed(2);
      cdown.speed = speed2.toFixed(2);  // 保留两位小数
      
    }

    // 更新最后一次下载的时间和已下载字节数
    cdown.lasttim = currentTime;
    cdown.lastpro = cdown.cpro;
    
    
  }

  const quemo=()=>{
    if(mol.value=="顺序播放") { moshi.value=1; }
    else if(mol.value=="循环播放") { moshi.value=2; }
    else { moshi.value=3; }
  }

  const mv=(i:string)=>{
    var mv=musicList2.value[parseInt(i)-1].mv;
    var mv2=musicList2.value[parseInt(i)-1].mvad;
    
    if(mv!=""&&mv!=null){
      var title=musicList2.value[parseInt(i)-1].title;
      var zuo=musicList2.value[parseInt(i)-1].zuo;
      var tu=musicList2.value[parseInt(i)-1].img;
      
      router.push({
           path: "Cmv",
           query: { title, zuo, mv, tu, mv2 },
      });
    } else {
      ElMessage({
        type: 'error',
        message: '抱歉，暂无视频资源',
      })
    } 
  }
  
  // Event handlers that update the global state
  const onMusicPlay = () => {
    playerControls.setPlayingState(true);
  };
  const onMusicPause = () => {
    playerControls.setPlayingState(false);
  };
  const onSongChange = (song: any, newIndex: number) => {
    playerControls.setCurrentSong(song, newIndex);
    index.value = newIndex; // Sync local index
  };

// =========== START: Integrated Player Logic ============

const audioRef = ref<HTMLAudioElement>();
const progressRef = ref<HTMLElement>();
const progresscontainerRef = ref<HTMLElement>();

// The player's internal state. Prefixed with `player_` to avoid conflicts.
const player_songIndex = ref(0);
const player_currentLyc = ref(0);
const player_lyricList = ref<any[]>([]);
const player_lycStyle = ref({});
const player_isPaused = ref(true); // true = paused, false = playing
const LYRIC_LINE_HEIGHT = 24; // Define lyric line height as a constant

// The music list for the player, derived from your main component's state
const player_musicList = computed(() => {
  return musicPlayer.state.musicList.length > 0 ? musicPlayer.state.musicList : musicList2.value;
});

// The currently playing song object
const player_playSongSrc = computed(() => {
  return player_musicList.value[player_songIndex.value] || {};
});

// Watch for changes from the main component's `index` (e.g., when you click a song in the table)
watch(index, (newIndex) => {
  if (newIndex !== undefined && newIndex !== player_songIndex.value) {
    player_songIndex.value = newIndex;
  }
});

// Watch for changes in the current song to update audio src and lyrics
watch(player_playSongSrc, (newSong, oldSong) => {
  if (newSong && newSong.src) {
    if (audioRef.value) {
      audioRef.value.src = newSong.src;
      player_getLyric();
      audioRef.value.play().then(() => {
         player_isPaused.value = false;
         onMusicPlay(); // Call parent handler
      }).catch(e => console.error("Play failed:", e));
      onSongChange(newSong, player_songIndex.value); // Call parent handler
    }
  }
});

const player_getLyric = () => {
  const result = player_playSongSrc.value.lyric;
  if (result) {
    let lyricData: any[] = [];
    result.split(/[\n]/).forEach((item: string) => {
      const temp = item.split(/\[(.+?)\]/);
      if (temp.length > 2) {
        lyricData.push({ time: temp[1], lyc: temp[2] });
      }
    });
    player_lyricList.value = lyricData.filter(v => v.lyc && v.lyc.trim() !== '');
  } else {
    // No lyrics found, display a placeholder
    player_lyricList.value = [{ time: '00:01.00', lyc: '暂无歌词' }];
  }
  player_currentLyc.value = 0;
  player_lycStyle.value = { transform: `translateY(0px)` };
};

const player_timeUpdateListener = () => {
  // Update progress bar
  if (audioRef.value && progressRef.value) {
    const { duration, currentTime } = audioRef.value;
    if (duration) {
      const progressPercent = (currentTime / duration) * 100;
      progressRef.value.style.width = `${progressPercent}%`;
    }
  }

  // Update lyrics
  if (player_playSongSrc.value.lyric && audioRef.value) {
    const currentTime = audioRef.value.currentTime;
    for (let i = player_lyricList.value.length - 1; i >= 0; i--) {
        const lyricTimeParts = player_lyricList.value[i].time.split(/[:.]/);
        const lyricTime = parseInt(lyricTimeParts[0]) * 60 + parseInt(lyricTimeParts[1]) + parseInt(lyricTimeParts[2]) / 100;
        if (currentTime >= lyricTime) {
            if (player_currentLyc.value !== i) {
                player_currentLyc.value = i;
                player_lycStyle.value = { transform: `translateY(-${LYRIC_LINE_HEIGHT * i}px)` };
            }
            break;
        }
    }
  }
};

const player_endedListener = () => {
  const playMode = $musicPlayer.state.playMode || moshi.value;
  if (playMode === 1) { // Sequence
    player_switchSong(true);
  } else if (playMode === 2) { // Loop
    if(audioRef.value) {
      audioRef.value.currentTime = 0;
      audioRef.value.play();
    }
  } else { // Random
    let newIndex;
    const totalSongs = player_musicList.value.length;
    if (totalSongs <= 1) {
        newIndex = 0;
    } else {
        do {
            newIndex = Math.floor(Math.random() * totalSongs);
        } while (newIndex === player_songIndex.value);
    }
    player_songIndex.value = newIndex;
  }
};

const player_init = () => {
  if (audioRef.value) {
    audioRef.value.addEventListener("timeupdate", player_timeUpdateListener);
    audioRef.value.addEventListener("ended", player_endedListener);
    audioRef.value.addEventListener('error', () => console.warn('Audio file failed to load.'));
    // Set initial state from global player
    if(playerState.currentSong && playerState.musicList.length > 0) {
      player_songIndex.value = playerState.currentIndex;
      player_isPaused.value = !playerState.isPlaying;
      // Manually trigger the first load if needed
      if(audioRef.value.src !== playerState.currentSong.src) {
        audioRef.value.src = playerState.currentSong.src;
        player_getLyric();
      }
      if(playerState.isPlaying) {
        audioRef.value.play().catch(e => {});
      }
    }
  }
};

const player_playSong = () => {
  if (!audioRef.value) return;
  if (audioRef.value.paused) {
    audioRef.value.play().then(() => {
      player_isPaused.value = false;
      onMusicPlay();
    });
  } else {
    audioRef.value.pause();
    player_isPaused.value = true;
    onMusicPause();
  }
};

const player_switchSong = (isNext: boolean) => {
  const totalSongs = player_musicList.value.length;
  if (totalSongs === 0) return;
  
  let newIndex = player_songIndex.value;
  if (isNext) {
    newIndex = (newIndex + 1) % totalSongs;
  } else {
    newIndex = (newIndex - 1 + totalSongs) % totalSongs;
  }
  player_songIndex.value = newIndex;
};

const player_setProgressBtn = (e: MouseEvent) => {
  if (audioRef.value && progresscontainerRef.value) {
    const width = progresscontainerRef.value.clientWidth;
    const clickX = e.offsetX;
    const duration = audioRef.value.duration;
    if (duration) {
      audioRef.value.currentTime = (clickX / width) * duration;
    }
  }
};

// =========== END: Integrated Player Logic ============

  </script>
  <style scoped>
  .title{
    font-size: 16px;
    color:crimson;
   font-style: italic;
  }
  .zuo{
    font-size: 12px;
  }
 .el-select{
  width: 200px;
  margin-left: 6%
 }
 .po{
  margin-left: 6%
 }
   .xuh{
    font-style: italic;
    color: blueviolet;
   } 
   .im{
   width:80px;
   object-fit: cover;
   border-radius: 16%;
 }
  </style>
<style>
/* === START: CSS for Integrated Player === */

.integrated-player-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.player {
  width: 100%;
  /* Let the player's height be flexible */
  flex: 1; 
  display: flex;
  align-items: center;
}

/* Left Column */
.player-left-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px; /* MODIFIED: Increased to fit larger album art */
}

.disk_img {
  width: 140px; /* MODIFIED: Increased size */
  height: 140px; /* MODIFIED: Increased size */
  background-size: cover;
  background-position: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.player-controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 15px;
}

.control_btn {
  cursor: pointer;
  font-size: 16.5px;
  color:#FFA500;
  user-select: none;
  transition: color 0.2s;
}
.control_btn:hover {
  color: #000;
}

/* Right Column */
.player_control {
  flex: 1;
  height: 100%;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  /* MODIFIED: Removed 'justify-content' to allow items to stack from top */
}

.song-meta {
  padding-bottom: 10px;
}

.song-meta p {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-title {
  font-size: 16px;
  font-weight: 500;
  color: #d32f2f; /* Red color from image */
}

.song-credits {
  font-size: 14px;
  color: #444;
  margin-top: 4px;
}

.lyricBox {
  /* MODIFIED: Removed fixed height to allow flex-grow to work */
  overflow: hidden;
  position: relative;
  flex-grow: 1;
}

.lyricStyle p {
  margin: 0;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
  transition: color 0.3s, font-weight 0.3s;
}

/* 进度条现在位于播放器底部 */
.progress-container {
  width: 100%;
  height: 2px; /* 稍微增加高度让进度条更明显 */
  background: #eee;
  border-radius: 3px;
  cursor: pointer;
  position: relative; /* 确保进度条在底部 */
}

.progress {
  background: #d32f2f; /* 使用红色主题色 */
  width: 0%;
  height: 100%;
  border-radius: 3px;
  transition: width 0.1s linear;
}
/* === END: CSS for Integrated Player === */
</style>