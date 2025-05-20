<template>
    <div class="videoWrap">
      <video-player  
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"
        @statechanged="playerStateChanged($event)"
        @ready="playerReadied">
      </video-player>
    </div>
  </template>
  
  <script>
  import { videoPlayer } from 'vue-video-player';
  import 'video.js/dist/video-js.css';
  
  import test from '../assets/lu.mp4';
  import img from '../assets/1.jpg'
  export default {
    data() {
      return {
        playerOptions : {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, // 如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '15:6', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [],
          poster: "", // 封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true, // 时间分割线
            durationDisplay: true, // 总时间
            remainingTimeDisplay: true, // 剩余播放时间
            progressControl: true, // 进度条 
            fullscreenToggle: true  // 全屏按钮
          }
        }
      };
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player;
      },
    },
    components: {
      videoPlayer
    },
    methods: {
     
   
      // 播放回调
      onPlayerPlay(player) {
        console.log("player play!", player);
      },
      // 暂停回调
      onPlayerPause(player) {
        console.log("player pause!", player);
      },
      // 视频播完回调
      onPlayerEnded(player) {
        console.log("player end!", player);
      },
      // DOM元素上的readyState更改导致播放停止
      onPlayerWaiting(player) {
        console.log("Player Waiting",player);
      },
      // 已开始播放回调
      onPlayerPlaying(player) {
        console.log("Player Playing",player);
      },
      // 当播放器在当前播放位置下载数据时触发
      onPlayerLoadeddata(player) {
        console.log("Player Loadeddata",player);
      },
      // 当前播放位置发生变化时触发。
      onPlayerTimeupdate(player) {
        console.log("Player Timeupdate",player);
      },
      // 媒体的readyState为HAVE\_FUTURE\_DATA或更高
      onPlayerCanplay(player) {
        console.log('player Canplay!', player)
      },
      // 媒体的readyState为HAVE\_ENOUGH\_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
      onPlayerCanplaythrough(player) {
        console.log('player Canplaythrough!', player)
      },
      //播放状态改变回调
      playerStateChanged(playerCurrentState) {
        console.log("player current update state", playerCurrentState);
      },
      //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
      playerReadied(player) {
        console.log("example player 1 readied", player);
      },
    
    mounted(){
      this.playerOptions.poster = img;
      const video = {
        src: test,  // 路径
        type: 'video/mp4'  // 类型
      };
      this.playerOptions.sources.push(video);
      console.log(test)
    }
}}
  </script>
  
  <style lang="stylus" scoped>

   
</style>
    