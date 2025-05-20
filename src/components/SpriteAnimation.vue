<!-- SpriteAnimation.vue -->
<template>
    <div class="sprite-container">
      <div 
        class="sprite" 
        :style="spriteStyle"
        @click="isPlaying ? pauseAnimation() : playAnimation()"
      ></div>
      <!-- <div class="controls">
        <button @click="isPlaying ? pauseAnimation() : playAnimation()">
          {{ isPlaying ? '暂停' : '播放' }}
        </button>
        <button @click="resetAnimation">重置</button>
      </div> -->
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  
  const props = defineProps({
    // 雪碧图的URL
    spriteUrl: {
      type: String,
      required: true
    },
    // 单帧宽度
    frameWidth: {
      type: Number,
      required: true
    },
    // 单帧高度
    frameHeight: {
      type: Number,
      required: true
    },
    // 总帧数
    frames: {
      type: Number,
      required: true
    },
    // 每行帧数
    framesPerRow: {
      type: Number,
      required: true
    },
    // 帧率 (fps)
    frameRate: {
      type: Number,
      default: 24
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 是否循环播放
    loop: {
      type: Boolean,
      default: true
    }
  })
  
  const currentFrame = ref(0)
  const isPlaying = ref(props.autoPlay)
  let animationInterval = null
  
  // 计算当前帧的位置
  const spriteStyle = computed(() => {
    const row = Math.floor(currentFrame.value / props.framesPerRow)
    const col = currentFrame.value % props.framesPerRow
    
    return {
      width: `${props.frameWidth}px`,
      height: `${200}px`,//可以把200替换为props.frameHeight
      backgroundImage: `url(${props.spriteUrl})`,
      backgroundPosition: `-${col * props.frameWidth}px -${row * props.frameHeight}px`,
      backgroundSize: `${props.frameWidth * props.framesPerRow}px auto`
    }
  })
  
  const playAnimation = () => {
    if (!isPlaying.value) {
      isPlaying.value = true
      startInterval()
    }
  }
  
  const pauseAnimation = () => {
    isPlaying.value = false
    if (animationInterval) {
      clearInterval(animationInterval)
    }
  }
  
  const resetAnimation = () => {
    currentFrame.value = 0
    if (!isPlaying.value) {
      playAnimation()
    }
  }
  
  const startInterval = () => {
    animationInterval = setInterval(() => {
      currentFrame.value++
      if (currentFrame.value >= props.frames) {
        if (props.loop) {
          currentFrame.value = 0
        } else {
          pauseAnimation()
          currentFrame.value = props.frames - 1
        }
      }
    }, 1000 / props.frameRate)
  }
  
  onMounted(() => {
    if (props.autoPlay) {
      startInterval()
    }



    
  })
  
  onUnmounted(() => {
    if (animationInterval) {
      clearInterval(animationInterval)
    }
  })
 
// 在 SpriteAnimation.vue 文件末尾添加（在 style 标签之前）

  </script>
  
  <style scoped>
  .sprite-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .sprite {
    background-repeat: no-repeat;
    cursor: pointer;
  }
  
  .controls {
    display: flex;
    gap: 0.5rem;
  }
  
  .controls button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .controls button:hover {
    background-color: #45a049;
  }
  </style>