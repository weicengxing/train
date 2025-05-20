<template>
    <div>
      <!--
      <video :src="videoSrc" :poster="videoImg" :autoplay="playStatus" height="421" width="700" :muted="muteStatus">
        your browser does not support the video tag
      </video>
      <button @click="playClick" :class="{hide: isPlay}">点击播放</button> -->
      <div class="kk">{{title}}</div>
      
      <div class="ll" >{{zuo}}</div>
      <!--class="video-js vjs-default-skin vjs-big-play-centered" -->
      <video    :preload="preload"
              :poster="`/images/${tu}`" :height="height" :width="width" align="center" :controls="controls"  :autoplay="autoplay">
        <source :src="`${mv}`" type="video/mp4"></source>
      </video>
    </div>
    <p></p>
    <div>
      
      <iframe :src="`${mv2}`"width="100%" height="500" frameborder="0" allowfullscreen></iframe>

    </div>
    <el-button type="primary" @click="fan()" plain="true">
        <el-icon color="FF3333"><DArrowLeft /></el-icon>返回
     </el-button>
</template>

<!-- <script>
export default {
  name: 'Video',
  data () {
    return {
      videoSrc: 'src/MV/把回忆拼好给你.ifox',
      videoImg: 'src/assets/Lone.jpg',
      playStatus: '',
      muteStatus: '',
      isMute: true,
      isPlay: false,
      width: '820', // 设置视频播放器的显示宽度（以像素为单位）
      height: '500', // 设置视频播放器的显示高度（以像素为单位）
      preload: 'auto', //  建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
      controls: true, // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
      autoplay: ''
    }
  }
   

  // 自动播放属性,muted:静音播放
  // autoplay: 'muted',

}

</script> -->
<script lang="ts">
import axios from "axios";
// import {type Hang } from "../model/general";
import { studentDelete } from "../Ser/infoServ";
import { ref } from 'vue'
import { defineComponent } from "vue";
import request from "../utils/request";
import router from "../router";
import { title } from "process";
export default defineComponent({
  //数据
  data: () => ({
    videoSrc: 'https://www.bilibili.com/video/BV1o94y1J7ph/',
      videoImg: 'src/assets/Lone.jpg',
      playStatus: '',
      muteStatus: '',
      isMute: true,
      isPlay: false,
      width: '820', // 设置视频播放器的显示宽度（以像素为单位）
      height: '500', // 设置视频播放器的显示高度（以像素为单位）
      preload: 'auto', //  建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
      controls: true, // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
      autoplay: false,
      title:"",
      zuo:"",
      mv:"",
      tu:"",
      mv2:"",
   
  }),
  
  //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
  async created() {
    this.ha();

  },
  methods: {
   

async ha(){
    const res=this.$route.query.title;
    if(res!=null)
   this.title=res.toString();
   const res1=this.$route.query.zuo;
    if(res1!=null)
   this.zuo=res1.toString();
   const res2=this.$route.query.mv;
    if(res2!=null)
   this.mv=res2.toString();
   const res3=this.$route.query.tu;
    if(res3!=null)
   this.tu=res3.toString();
   const res4=this.$route.query.mv2;
    if(res4!=null)
   this.mv2=res4.toString();


},

que(){
  
  
          
    


},
fan(){
   
    router.push({
       
    path: "Ce",
   

  });

}

}
})

</script>   
<style scoped >
.kk{
    font-size: 30px;
    color: brown;
    
}
.ll{margin-top: 1%;
    font-size: 20px;
    font-style:italic;
    color:aqua;
}
</style>