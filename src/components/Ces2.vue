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

   
    <div style="padding-top:10%;display: flex;
    justify-content: center;
    align-items: center;">
  <!--    一般需要有一个div包着，设置div的宽高，播放器跟随父级宽高-->

      <div style="height: 200px;width: 500px;border:1px solid #ccc;padding: 20px">
        <AppleMusicPlayer 
        :playSongSrc="cmusic"
        :xian="$musicPlayer.state.playMode || moshi"
        :cSong="$musicPlayer.state.currentIndex || index"
        :max="maxmu"      
        progressColor="rgba(211, 16, 16, 0.1)"  
        diskHW="110px"   
        :musicList="$musicPlayer.state.musicList.length > 0 ? $musicPlayer.state.musicList : musicList2" 
        :darkTheme="$musicPlayer.state.darkTheme || darkTheme" 
        :offsetY="28"
        @play="onMusicPlay"
        @pause="onMusicPause"
        @song-change="onSongChange"
        >
        <!-- 这些可以换成图标按钮 -->
          <template #next>
            下一首
          </template>
          <template #last>
            上一首
          </template>
          <template #pause>
            暂停
          </template>
          <template #play>
            播放
          </template>
               
                
        </AppleMusicPlayer>
      
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import {ref, onMounted, getCurrentInstance} from 'vue'
  import router from "../router";
  // import type { ComponentSize } from 'element-plus'
  import { ElMessage  } from 'element-plus'
  import { getRowIdentity } from 'element-plus/es/components/table/src/util.mjs';
  import msg1 from 'apple-music-player/components/appleMusic/index.vue'
  import request from "../utils/request";
  import axios from 'axios'
  import { Download, Position } from '@element-plus/icons-vue';
  // 导入全局音乐播放器服务
  import musicPlayer, { playerState, playerControls } from '../utils/musicPlayer';
  //import {met} from'./Ces4.vue'
  //主题
  const background = ref(false)
  //const progress=ref(0);
  //const cpro=ref(0);
  //const tpro=ref(0);
  //const cfile=ref("");
  //const speed=ref("");
  //const lastLoaded=ref(0);
  //const lastUpdateTime=ref();
 // const isDownloading=ref(false);
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
  //const size=ref("20px");
  const hand=async ()=>{
    
   //var ja=JSON.stringify(msg1)
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
   

  //   if(region.value!=null)
  //   index.value=(currentPage3.value-1)*region.value+val-1;
  //  else{
  //   index.value=(currentPage3.value-1)*5+val-1;
  //  }

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
  //歌曲列表
  //'https://www.vae.zhangweicheng.xyz/music/%E7%A5%96%E6%B5%B7%20-%20%E5%A5%BD%E8%BF%90%E6%9D%A5.mp3'
  // const musicList=[
  //    {title:'好运来',img:'https://www.vae.zhangweicheng.xyz/VAE_Article_ShouTu/vae/6802ac85-9f22-4cc4-b812-87238f103c36.jpg',src:kk.value,lyric:'[00:00.00]好运来-祖海\n' 
  //    +
  //         '[00:02.60]词：车行\n' +
  //         '[00:05.20]曲：戚建波\n' +
  //         '[00:07.80]好运来祝你好运来\n' +
  //         '[00:11.19]\n' +
  //         '[00:11.79]好运带来了喜和爱\n' +
  //         '[00:16.15]好运来我们好运来\n' +
  //         '[00:20.29]迎着好运兴旺发达通四海\n' +
  //         '[00:24.78]\n' +
  //         '[00:29.17]叠个千纸鹤再系个红飘带\n' +
  //         '[00:32.72]\n' +
  //         '[00:33.23]愿善良的人们天天好运来\n' +
  //         '[00:37.36]你勤劳生活美你健康春常在\n' +
  //         '[00:41.71]你一生的忙碌为了笑逐颜开\n' +
  //         '[00:46.71]\n' +
  //         '[00:47.36]打个中国结请春风剪个彩\n' +
  //         '[00:51.40]愿祖国的日月年年好运来\n' +
  //         '[00:55.56]你凤舞太平年你龙腾新时代\n' +
  //         '[01:00.04]你幸福的家园迎来百花盛开\n' +
  //         '[01:05.36]好运来祝你好运来\n' +
  //         '[01:09.68]好运带来了喜和爱\n' +
  //         '[01:13.91]好运来我们好运来\n' +
  //         '[01:18.17]迎着好运兴旺发达通四海\n' +
  //         '[01:24.22]\n' +
  //         '[01:33.43]叠个千纸鹤再系个红飘带\n' +
  //         '[01:37.46]愿善良的人们天天好运来\n' +
  //         '[01:41.64]你勤劳生活美你健康春常在\n' +
  //         '[01:46.00]你一生的忙碌为了笑逐颜开\n' +
  //         '[01:50.95]\n' +
  //         '[01:51.46]打个中国结请春风剪个彩\n' +
  //         '[01:55.74]愿祖国的日月年年好运来\n' +
  //         '[01:59.87]你凤舞太平年你龙腾新时代\n' +
  //         '[02:04.18]你幸福的家园迎来百花盛开\n' +
  //         '[02:09.62]好运来祝你好运来\n' +
  //         '[02:14.05]好运带来了喜和爱\n' +
  //         '[02:18.24]好运来我们好运来\n' +
  //         '[02:22.52]迎着好运兴旺发达通四海\n' +
  //         '[02:26.74]好运来祝你好运来\n' +
  //         '[02:31.10]好运带来了喜和爱\n' +
  //         '[02:35.35]好运来我们好运来\n' +
  //         '[02:39.63]迎着好运兴旺发达通四海\n' +
  //         '[02:45.09]\n' +
  //         '[02:59.12]好运来祝你好运来\n' +
  //         '[03:03.26]好运带来了喜和爱\n' +
  //         '[03:07.43]好运来我们好运来\n' +
  //         '[03:11.68]迎着好运兴旺发达通四海\n' +
  //         '[03:16.02]通四海好运来'
  //   },


  // ];
  onMounted(async ()=>{
     downlist.value=new Map();

    request.post("/deal/getmusic").then(res=>{
      musicList2.value=res.data;
      // 初始化全局音乐播放器的音乐列表
      if (!playerState.musicList || playerState.musicList.length === 0) {
        playerControls.setMusicList(res.data);
      }
      
      // 恢复播放状态
      if (playerState.isPlaying && playerState.currentSong) {
        // 如果有正在播放的歌曲，确保组件状态与全局状态一致
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
      url: 'https://965c-58-194-169-164.ngrok-free.app/deal/down',  // 后端接口
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
      url: 'https://965c-58-194-169-164.ngrok-free.app/deal/down4',  // 后端接口
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
    if(mol.value=="顺序播放")
     {moshi.value=1;
      moshi.value=1;
     }

   else  if(mol.value=="循环播放")
    { moshi.value=2;
     moshi.value=2;
    
    }
  else{
    moshi.value=3;
    moshi.value=3;
  }
   
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
         query: { 
           title:title,
           zuo:zuo,
           mv:mv,
           tu:tu,
           mv2:mv2,

             
         },
     
       });
      }
      else{
        ElMessage({
          type: 'error',
          message: '抱歉，暂无视频资源',
        })
      } 
   
  }
  
  // 监听音乐播放事件
  const onMusicPlay = () => {
    playerControls.setPlayingState(true);
  };
  
  // 监听音乐暂停事件
  const onMusicPause = () => {
    playerControls.setPlayingState(false);
  };
  
  // 监听歌曲变更事件
  const onSongChange = (song: any, index: number) => {
    // 更新全局状态
    playerControls.setCurrentSong(song, index);
    
    // 同步本地状态
    index.value = index;
  };
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
  .select{
   width: 20px;
  
    
  }
  /* .qu{
   margin-left: 10%;
  } */
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