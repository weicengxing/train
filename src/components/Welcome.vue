<template>
    <div class="container">
      <div style="margin-top: -440px; margin-left: 40%;">
        <SpriteAnimation
          spriteUrl="/images/th2.jpg"
          :frameWidth="256"
          :frameHeight="256"
          :frames="16"
          :framesPerRow="4"
          :frameRate="12"
          :autoPlay="true"
          :loop="true"
        />
      </div>
      
      <h1 class="welcome-text" ref="welcomeText">
        欢迎来到这个网站，在进入之前，请先向本网站的创建者————宇宙最强的技术拥有者张先生致敬!
      </h1>
      
      <div class="button-container" ref="buttonContainer">
        <button @click="showRespect" class="respect-button">
          致敬
        </button>
      </div>
  
      <div
        v-for="n in 20"
        :key="n"
        class="floating-cube"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${-(Math.random() * 10)}s`,
          opacity: 0.1 + Math.random() * 0.3
        }"
      ></div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import gsap from 'gsap'
  import router from '../router/index'
  import SpriteAnimation from '../components/SpriteAnimation.vue'
  
  export default defineComponent({
    name: 'YourComponent',
    components: {
      SpriteAnimation,
    },
    setup() {
      const welcomeText = ref<HTMLElement | null>(null)
      const buttonContainer = ref<HTMLElement | null>(null)
  
      onMounted(() => {
        // 初始动画
        gsap.to(welcomeText.value, {
          opacity: 1,
          duration: 2,
          ease: 'power2.out',
        })
  
        gsap.to(buttonContainer.value, {
          opacity: 1,
          duration: 1,
          delay: 2,
          ease: 'power2.out',
        })
  
        // 创建背景粒子
        createParticles()
        // 创建星星
        createStars()
      })
  
      const createParticles = () => {
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div')
          particle.className = 'particle'
  
          const size = Math.random() * 5
          particle.style.width = `${size}px`
          particle.style.height = `${size}px`
  
          particle.style.left = `${Math.random() * 100}%`
          particle.style.top = `${Math.random() * 100}%`
  
          document.querySelector('.container')?.appendChild(particle)
  
          animateParticle(particle)
        }
      }
  
      const animateParticle = (particle: HTMLElement) => {
        gsap.to(particle, {
          x: Math.random() * 400 - 200,
          y: Math.random() * 400 - 200,
          duration: Math.random() * 10 + 5,
          opacity: Math.random(),
          repeat: -1,
          yoyo: true,
          ease: 'none',
        })
      }

      const createStars = () => {
        for (let i = 0; i < 100; i++) { // 创建100颗星星
          const star = document.createElement('div')
          star.className = 'star'

          const size = Math.random() * 2 + 1 // 星星大小 1px to 3px
          star.style.width = `${size}px`
          star.style.height = `${size}px`

          star.style.left = `${Math.random() * 100}%`
          star.style.top = `${Math.random() * 100}%`

          document.querySelector('.container')?.appendChild(star)

          animateStar(star)
        }
      }

      const animateStar = (star: HTMLElement) => {
        // 位置动画
        gsap.to(star, {
          x: Math.random() * window.innerWidth - window.innerWidth / 2,
          y: Math.random() * window.innerHeight - window.innerHeight / 2,
          duration: Math.random() * 30 + 20, // 较慢的移动速度 (20-50s)
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        // 闪烁动画 (透明度) - 使用 CSS 动画
        // gsap.to(star, {
        //   opacity: Math.random() * 0.7 + 0.3, // 透明度在 0.3 和 1.0 之间变化
        //   duration: Math.random() * 2 + 1,    // 闪烁速度 (1-3s)
        //   repeat: -1,
        //   yoyo: true,
        //   ease: 'power1.inOut',
        // })
      }
  
      const showRespect = async () => {
        // 创建烟花效果
        for (let i = 0; i < 30; i++) {
          createFirework()
        }
  
        // 按钮动画
        gsap.to('.respect-button', {
          scale: 1.2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        })
  
        // 获取路由参数
        const xin = ref<string | null>(null)
        const res = new URLSearchParams(window.location.search).get('xin')
        xin.value = res || 'default'
  
       
  
        router.push({
          path: 'Zhu',
          query: { xin: xin.value },
        })
      }
  
      // 增强版的烟花效果，粒子扩散和颜色变化
      const createFirework = () => {
        const firework = document.createElement('div')
        firework.className = 'firework'
  
        const size = Math.random() * 4 + 2
        firework.style.width = `${size}px`
        firework.style.height = `${size}px`
        firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`
        firework.style.borderRadius = '50%'
  
        document.querySelector('.container')?.appendChild(firework)
  
        const angle = Math.random() * Math.PI * 2
        const strength = Math.random() * 300 + 100
        const x = Math.cos(angle) * strength
        const y = Math.sin(angle) * strength
  
        // 小粒子的扩散效果
        const particlesCount = 50
        for (let i = 0; i < particlesCount; i++) {
          const particle = document.createElement('div')
          particle.className = 'firework-particle'
  
          const size = Math.random() * 4 + 2
          particle.style.width = `${size}px`
          particle.style.height = `${size}px`
          particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`
          particle.style.borderRadius = '50%'
          particle.style.position = 'absolute'
  
          firework.appendChild(particle)
  
          // 粒子飞散的动画
          gsap.to(particle, {
            x: `+=${x + Math.random() * 150 - 75}`,
            y: `+=${y + Math.random() * 150 - 75}`,
            scale: 0,
            opacity: 0,
            duration: Math.random() * 2 + 1,
            ease: 'power1.out',
            onComplete: () => particle.remove(),
          })
        }
  
        // 添加烟花尾迹效果
        const trailCount = 10
        for (let i = 0; i < trailCount; i++) {
          createTrail(firework, x, y)
        }
  
        gsap.fromTo(
          firework,
          {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            scale: 0,
          },
          {
            x: `+=${x}`,
            y: `+=${y}`,
            scale: 2,
            duration: 1.5,
            ease: 'power1.out',
            opacity: 0,
            onComplete: () => firework.remove(),
          }
        )
      }
  
      // 增加烟花尾迹效果
      const createTrail = (firework: HTMLElement, x: number, y: number) => {
        const trail = document.createElement('div')
        trail.className = 'firework-trail'
  
        const size = Math.random() * 3 + 1
        trail.style.width = `${size}px`
        trail.style.height = `${size}px`
        trail.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`
        trail.style.borderRadius = '50%'
        trail.style.position = 'absolute'
  
        firework.appendChild(trail)
  
        const angle = Math.random() * Math.PI * 2
        const strength = Math.random() * 100 + 50
        const xTrail = Math.cos(angle) * strength
        const yTrail = Math.sin(angle) * strength
  
        gsap.to(trail, {
          x: `+=${xTrail}`,
          y: `+=${yTrail}`,
          opacity: 0,
          scale: 0,
          duration: 1.5,
          ease: 'power1.out',
          onComplete: () => trail.remove(),
        })
      }
  
      return {
        welcomeText,
        buttonContainer,
        showRespect,
      }
    },
  })
  </script>
  
  <style scoped>
  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(45deg, #0f2027, #203a43, #2c5364);
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Twinkle animation for stars */
  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.8;
    }
    50% {
      opacity: 0.2;
    }
  }

  .welcome-text {
    animation: colorChange 5s infinite;
    font-size: 30px;
    text-align: center;
    margin-left: -50%;
  }
  
  .particle {
    position: absolute;
    background: white;
    border-radius: 50%;
    pointer-events: none;
  }

  .star {
    position: absolute;
    background: white; /* 星星颜色 */
    border-radius: 50%;
    pointer-events: none;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 224, 0.5); /* 发光效果 */
    animation: twinkle 2s ease-in-out infinite alternate; /* 应用闪烁动画 */
  }
  
  .floating-cube {
    width: 50px;
    height: 50px;
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    animation: float 10s infinite ease-in-out;
  }
  
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(100px, 100px) rotate(90deg); }
    50% { transform: translate(0, 200px) rotate(180deg); }
    75% { transform: translate(-100px, 100px) rotate(270deg); }
  }
  
  @keyframes colorChange {
    0% { color: red; }
    25% { color: blue; }
    50% { color: green; }
    75% { color: purple; }
    100% { color: orange; }
  }
  
  .button-container {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
  
  .respect-button {
    padding: 15px 30px;
    font-size: 1.2rem;
    background: linear-gradient(45deg, #ff6b6b, #ff8e53);
    border: none;
    border-radius: 25px;
    color: white;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .respect-button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }
  
  .firework {
    position: absolute;
    pointer-events: none;
  }
  
  .firework-particle {
    position: absolute;
    pointer-events: none;
    border-radius: 50%;
    background: hsl(0, 100%, 50%);
    opacity: 1;
  }
  
  .firework-trail {
    position: absolute;
    pointer-events: none;
    background: hsl(0, 100%, 50%);
    opacity: 0.7;
  }
  </style>
