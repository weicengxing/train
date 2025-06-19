<template>
  <div class="music-app-container">
    <!-- Main Content Area with Glassmorphism Effect -->
    <div class="main-content">

      <!-- ===== Download Progress Section ===== -->
      <div v-if="downlist && downlist.size > 0" class="downloads-section">
        <div v-for="[key, item] in downlist" :key="key" class="download-item">
          <div class="download-info">
            <span class="download-filename">{{ item.cfile }}</span>
            <span class="download-progress-text">{{ item.progress.toFixed(2) }}%</span>
          </div>
          <div class="progress-bar-bg">
            <div 
              class="progress-bar-fill" 
              :style="{ width: item.progress + '%' }">
            </div>
          </div>
          <div class="download-stats">
            <span><el-icon><Download /></el-icon> {{ (item.cpro / 1024).toFixed(1) }} / {{ (item.tpro / 1024).toFixed(1) }} KB</span>
            <span><el-icon><Position /></el-icon> {{ item.speed }} KB/s</span>
            <span><el-icon><Timer /></el-icon> {{ item.shengtim }}s left</span>
          </div>
        </div>
      </div>

      <!-- ===== Music Table ===== -->
      <el-table
        ref="muti"
        :data="song"
        style="width: 100%"
        class="music-table"
      >
        <el-table-column label="" width="50" v-if="value2">
          <template v-slot="scope">
            <b class="table-xu">{{ scope.row.xu }}</b>
          </template>
        </el-table-column>

        <el-table-column label="" width="200">
          <template v-slot="scope">
            <div class="song-info">
              <a class="song-title">{{ scope.row.title }}</a>
              <p class="song-artist">{{ scope.row.zuo }}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="" width="120">
          <template v-slot="scope">
            <img :src="`/images/${scope.row.img}`" class="album-art" v-if="scope.row.img">
          </template>
        </el-table-column>

        <el-table-column label="" :width="wid" />

        <el-table-column label="" width="220" align="right">
          <template v-slot="scope">
            <div class="action-icons">
              <el-tooltip content="Play" placement="top">
                <el-icon @click="onbo(scope.row.xu)" class="icon-play" color="#FF0000"><VideoPlay /></el-icon>
              </el-tooltip>
              <el-tooltip content="Watch MV" placement="top">
                <el-icon @click="mv(scope.row.xu)" class="icon-mv" color="#3399FF"><VideoCamera /></el-icon>
              </el-tooltip>
              <el-tooltip content="Download MP3" placement="top">
                <el-icon @click="Down(scope.row.title)" class="icon-download-mp3" color="#00CD66"><Download /></el-icon>
              </el-tooltip>
              <el-tooltip content="Download MP4" placement="top">
                <el-icon @click="Down4(scope.row.title)" class="icon-download-mp4" color="#FFD700"><Download /></el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- ===== Pagination & Controls Panel ===== -->
      <div class="controls-panel">
        <el-pagination
          v-model:current-page="currentPage3"
          v-model:page-size="pageSize3"
          :size="size"
          :disabled="disabled"
          :background="true"
          layout="prev, pager, next"
          :total="size"
          @current-change="handleCurrentChange"
        />

        <div class="settings-toggle">
          <span>Settings</span>
          <el-switch v-model="value1" />
        </div>
      </div>
      
      <el-collapse-transition>
        <div v-show="value1" class="advanced-controls">
          <div class="control-group search-group">
            <el-input v-model="sou" placeholder="Enter song name or keyword" />
            <el-select v-model="mol2" placeholder="Search Mode">
              <el-option value="关键字"><el-icon><Link /></el-icon> Keyword</el-option>
              <el-option value="相关页"><el-icon><Position /></el-icon> Related</el-option>
            </el-select>
            <el-button type="primary" @click="sousu()" plain class="glow-button">
              <el-icon><Search /></el-icon>Search
            </el-button>
          </div>

          <div class="control-group settings-group">
            <el-switch v-model="value2" @click="xuhao()" style="--el-switch-on-color: #c026d3;"/>
            <span class="setting-label">Show No.</span>

            <el-select v-model="region" placeholder="Rows">
              <el-option v-for="i in 9" :key="i" :label="`${i} rows`" :value="i" />
            </el-select>

            <el-select v-model="mol" placeholder="Play Mode">
              <el-option value="顺序播放"><el-icon><Right /></el-icon> Sequence</el-option>
              <el-option value="循环播放"><el-icon><Sort /></el-icon> Loop</el-option>
              <el-option value="随机播放"><el-icon><Rank /></el-icon> Shuffle</el-option>
            </el-select>
            
            <el-button type="success" @click="hand()" plain class="glow-button">
                <el-icon><Star /></el-icon>Set Rows
            </el-button>
            <el-button type="primary" @click="quemo()" plain class="glow-button">
                <el-icon><Compass /></el-icon>Set Mode
            </el-button>
          </div>
        </div>
      </el-collapse-transition>
    </div>

    <!-- ===== Apple Music Player ===== -->
    <div class="player-wrapper">
      <AppleMusicPlayer 
        :playSongSrc="cmusic"
        :xian="$musicPlayer.state.playMode || moshi"
        :cSong="$musicPlayer.state.currentIndex || index"
        :max="maxmu"      
        progressColor="rgba(224, 49, 142, 0.8)"  
        diskHW="110px"   
        :musicList="$musicPlayer.state.musicList.length > 0 ? $musicPlayer.state.musicList : musicList2" 
        :darkTheme="true" 
        :offsetY="28"
        @play="onMusicPlay"
        @pause="onMusicPause"
        @song-change="onSongChange"
      >
        <!-- The player already has nice icons, so custom slots can be omitted for a cleaner look -->
      </AppleMusicPlayer>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // Your script remains UNCHANGED. All the logic is preserved.
  import {ref, onMounted, getCurrentInstance} from 'vue'
  import router from "../router";
  import { ElMessage, ElCollapseTransition  } from 'element-plus'
  import { getRowIdentity } from 'element-plus/es/components/table/src/util.mjs';
  import request from "../utils/request";
  import axios from 'axios'
  import { Download, Position, Timer, Compass, Link, Rank, Right, Search, Sort, Star, VideoCamera, VideoPlay } from '@element-plus/icons-vue';
  // 导入全局音乐播放器服务
  import musicPlayer, { playerState, playerControls } from '../utils/musicPlayer';
  
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
  const musicList2=ref();
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
  index.value=parseInt(val)-1;
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
  const kk=ref('https://www.vae.zhangweicheng.xyz/music/%E7%A5%96%E6%B5%B7%20-%20%E5%A5%BD%E8%BF%90%E6%9D%A5.mp3')
  
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

    maxmu.value=musicList2.value.length
    wid.value=170;
  })
  const l=()=>{
    var fd=new FormData();
    fd.append("page","1")
    request.post("/deal/getpagemu",fd).then(res=>{
      song.value=res.data;
    });
    request.post("/deal/getpagesizemu").then(res=>{
      size.value=res.data*100;
    });
  }
  const xuhao=()=>{
    if(wid.value==170){wid.value=220;}
    else wid.value=170;
  }
  const Down=async (title:string)=>{
    const downloadState = {
      progress: 0,
      cpro: 0,
      tpro: 0,
      speed: "0.00",
      lastpro:0,
      lasttim:Date.now(),
      cfile:title+".mp3",
      shengtim: "∞"
    };
    downlist.value.set(title+".mp3", downloadState);
    
    axios({
      url: 'https://e451-58-194-169-164.ngrok-free.app/deal/down',
      method: 'POST',
      params: { page:title },
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total) {
          downloadState.cpro = progressEvent.loaded;
          downloadState.tpro = progressEvent.total;
          downloadState.progress = (progressEvent.loaded / progressEvent.total) * 100;
          calculateInstantaneousSpeed(title+".mp3")
        }
      }
    }).then(response => {
      const blob = new Blob([response.data], { type: 'audio/mpeg' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = title + ".mp3";
      link.click();
      downlist.value.delete(title+".mp3");
    });
  }
  const Down4=async (title:string)=>{
    const downloadState = {
      progress: 0,
      cpro: 0,
      tpro: 0,
      speed: "0.00",
      lastpro:0,
      lasttim:Date.now(),
      cfile:title+".mp4",
      shengtim: "∞"
    };
    downlist.value.set(title+".mp4", downloadState);
    
    axios({
      url: 'https://e451-58-194-169-164.ngrok-free.app/deal/down4',
      method: 'POST',
      params: { page:title },
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total) {
          downloadState.cpro = progressEvent.loaded;
          downloadState.tpro = progressEvent.total;
          downloadState.progress = (progressEvent.loaded / progressEvent.total) * 100;
          calculateInstantaneousSpeed(title+".mp4")
        }
      }
    }).then(response => {
      const blob = new Blob([response.data], { type: 'video/mp4' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = title + ".mp4";
      link.click();
      downlist.value.delete(title+".mp4");
    });
  }
  const calculateInstantaneousSpeed=(title:string)=> {
    const cdown=downlist.value.get(title);
    if (!cdown) return;
        
    const currentTime = Date.now();
    const elapsedTime = (currentTime - cdown.lasttim) / 1000;

    if (elapsedTime > 0.5) { // Update speed every 0.5s to avoid erratic values
      const speedBps = (cdown.cpro - cdown.lastpro) / elapsedTime;
      const speedKBps = speedBps / 1024;
      cdown.speed = speedKBps.toFixed(2);
      
      const remainingBytes = cdown.tpro - cdown.cpro;
      if (speedBps > 0) {
        cdown.shengtim = (remainingBytes / speedBps).toFixed(1);
      } else {
        cdown.shengtim = "∞";
      }

      cdown.lasttim = currentTime;
      cdown.lastpro = cdown.cpro;
    }
  }

  const quemo=()=>{
    if(mol.value=="顺序播放") moshi.value=1;
    else if(mol.value=="循环播放") moshi.value=2;
    else moshi.value=3;
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
        message: 'Sorry, no MV resource available.',
      })
    } 
  }
  
  const onMusicPlay = () => { playerControls.setPlayingState(true); };
  const onMusicPause = () => { playerControls.setPlayingState(false); };
  const onSongChange = (song: any, index: number) => {
    playerControls.setCurrentSong(song, index);
    index.value = index;
  };
</script>

<style scoped>
/* ===== Global Container & Theme ===== */
.music-app-container {
  background: linear-gradient(135deg, #1f005c, #0d1127, #1a0033);
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.main-content, .player-wrapper {
  width: 100%;
  max-width: 1200px;
  background: rgba(20, 15, 45, 0.5);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 8px 32px 0 rgba(1, 0, 5, 0.37);
  transition: all 0.3s ease;
}

/* ===== Downloads Section ===== */
.downloads-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.download-item {
  color: #e0e0e0;
}
.download-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}
.download-filename {
  font-weight: 500;
  color: #fff;
}
.progress-bar-bg {
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #4f46e5, #c026d3);
  border-radius: 4px;
  transition: width 0.3s ease-out;
}
.download-stats {
  margin-top: 0.5rem;
  display: flex;
  gap: 1.5rem;
  font-size: 0.8rem;
  color: #a0a0a0;
  align-items: center;
}
.download-stats span {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* ===== Music Table Customization ===== */
.music-table {
  background-color: transparent !important;
  --el-table-border-color: rgba(255, 255, 255, 0.15);
  --el-table-header-bg-color: transparent;
  --el-table-tr-bg-color: transparent;
  --el-table-row-hover-bg-color: rgba(255, 255, 255, 0.05);
}

:deep(.el-table th), :deep(.el-table tr) {
  background-color: transparent !important;
  color: #a0a0a0;
  border-color: rgba(255, 255, 255, 0.15);
}

:deep(.el-table__header-wrapper th .cell) {
  color: #a0a0a0;
  font-weight: 600;
  text-transform: uppercase;
}

:deep(.el-table__body tr:hover > td) {
    background-color: var(--el-table-row-hover-bg-color) !important;
}

.table-xu {
  font-style: italic;
  font-weight: bold;
  font-size: 1.1rem;
  color: #c026d3;
}
.song-title {
  font-size: 1rem;
   color:crimson;
  font-weight: 600;
}
.song-artist {
  font-size: 0.85rem;
  color: #a0a0a0;
  margin: 0.25rem 0 0 0;
}
.album-art {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  transition: transform 0.3s ease;
}
.album-art:hover {
  transform: scale(1.1);
}

.action-icons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
.action-icons .el-icon {
  font-size: 22px;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}
.action-icons .el-icon:hover {
  transform: scale(1.2);
}
.icon-play:hover { color: #f44336; }
.icon-mv:hover { color: #2196f3; }
.icon-download-mp3:hover { color: #4caf50; }
.icon-download-mp4:hover { color: #ffeb3b; }

/* ===== Controls & Pagination ===== */
.controls-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding: 0 0.5rem;
}

.settings-toggle {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #a0a0a0;
}
.settings-toggle span {
  font-size: 0.9rem;
}

:deep(.el-pagination.is-background .el-pager li),
:deep(.el-pagination.is-background .btn-prev),
:deep(.el-pagination.is-background .btn-next) {
  background-color: rgba(255, 255, 255, 0.1);
  color: #f0f0f0;
}
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background: linear-gradient(90deg, #4f46e5, #c026d3);
  color: white;
}

.advanced-controls {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.control-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.setting-label {
  color: #a0a0a0;
  font-size: 0.9rem;
  margin-left: -0.5rem;
  margin-right: 1rem;
}
/* Custom styles for El-Select and El-Input */
:deep(.el-input__wrapper), :deep(.el-select .el-input__wrapper) {
    background-color: rgba(0, 0, 0, 0.3) !important;
    box-shadow: none !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 8px;
    color: white;
}
:deep(.el-input__inner) {
  color: #e0e0e0 !important;
}

/* ===== Glowing Button ===== */
.glow-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #c026d3;
  color: #e0e0e0;
  transition: all 0.3s ease;
}
.glow-button:hover, .glow-button:focus {
  color: white;
  background: #c026d3;
  border-color: #c026d3;
  box-shadow: 0 0 10px #c026d3, 0 0 20px #c026d3, 0 0 40px #c026d3;
}

/* ===== Apple Music Player Wrapper ===== */
.player-wrapper {
  padding: 1rem;
}
/* The AppleMusicPlayer component has its own dark theme, which we enable via props. 
   These overrides ensure it fits perfectly within our glassmorphism container. */
:deep(.apple-music-player) {
  background: transparent !important;
  box-shadow: none !important;
}

</style>