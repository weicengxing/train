<template>
  <div class="vip-badge">
    <div class="purple-flow"></div>
    <div class="ornate-border"></div>
    <div class="heraldic-pattern"></div>
    <div class="border-sparkles">
      <!-- 随机位置的闪光 -->
      <div class="border-sparkle" style="top: 10px; left: 10px;"></div>
      <div class="border-sparkle" style="top: 50px; right: 20px;"></div>
      <div class="border-sparkle" style="bottom: 30px; left: 40px;"></div>
      <div class="border-sparkle" style="bottom: 10px; right: 10px;"></div>
      <div class="border-sparkle" style="top: 20px; right: 50px;"></div>
    </div>
    <div class="royal-crown">
      <div class="center-peak"></div>
      <div class="jewels">
        <div class="jewel"></div>
        <div class="jewel"></div>
        <div class="jewel"></div>
      </div>
    </div>
    <div class="vip-text">VIP</div>
    <div class="light-effect"></div>
  </div>
</template>

<script>
export default {
  name: 'VipBadge',
};
</script>

<style scoped>
@keyframes purple-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes jewel-shimmer {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(10deg); }
}
@keyframes crown-shine {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
@keyframes silver-border-glow {
  0%, 100% {
    box-shadow:
      0 0 10px #C0C0C0,
      0 0 20px silver,
      0 0 30px #E6E6E6;
    border-color: #C0C0C0;
  }
  50% {
    box-shadow:
      0 0 20px silver,
      0 0 40px #E6E6E6,
      0 0 60px white;
    border-color: white;
  }
}
@keyframes border-sparkle {
  0%, 100% { opacity: 0; }
  50% {
    opacity: 1;
    transform: rotate(360deg) scale(1.2);
  }
}

.vip-badge {
  width: 1px; /* 减小宽度 */
  height: 0.6px; /* 减小高度 */
  background: linear-gradient(135deg, #FFD700, #DAA520);
  border-radius: 20px; /* 减小圆角 */
  position: relative;
  overflow: hidden;
  box-shadow:
    0 10px 22px rgba(0,0,0,0.5), /* 减小阴影 */
    0 5px 12px rgba(255,215,0,0.4); /* 减小阴影 */
  border: 4px solid #B8860B; /* 减小边框 */
  animation: silver-border-glow 3s infinite;
  transform: perspective(750px) rotateX(15deg) rotateY(-15deg); /* 调整透视 */
}
.border-sparkles {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  pointer-events: none;
  z-index: 10;
}
.border-sparkle {
  position: absolute;
  width: 10px; /* 减小闪光大小 */
  height: 10px; /* 减小闪光大小 */
  background: radial-gradient(circle, white, silver, transparent);
  border-radius: 50%;
  opacity: 0;
  animation: border-sparkle 2s infinite;
}
.purple-flow {
  position: absolute;
  top: -5px; /* 调整位置 */
  left: -5px; /* 调整位置 */
  right: -5px; /* 调整位置 */
  height: 25px; /* 减小高度 */
  background: linear-gradient(
    45deg,
    #8A2BE2,
    #9400D3,
    #4B0082,
    #8A2BE2
  );
  background-size: 400% 400%;
  animation: purple-flow 10s ease infinite;
  opacity: 0.7;
  filter: blur(8px); /* 减小模糊 */
  z-index: 2;
}
.vip-badge::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: repeating-linear-gradient(
    45deg,
    rgba(255,255,255,0.07) 0%,
    rgba(255,255,255,0.07) 10%,
    transparent 10%,
    transparent 20%
  );
  transform: rotate(45deg);
  z-index: 3;
}
.ornate-border {
  position: absolute;
  top: -8px; /* 调整位置 */
  left: -8px; /* 调整位置 */
  right: -8px; /* 调整位置 */
  bottom: -8px; /* 调整位置 */
  border: 8px solid transparent; /* 减小边框 */
  border-image: repeating-linear-gradient(
    45deg,
    #FFD700,
    #B8860B 10%,
    #FFD700 20%
  ) 1;
  z-index: 4;
}
.heraldic-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 12px, /* 调整图案大小 */
      rgba(0,0,0,0.06) 12px,
      rgba(0,0,0,0.06) 24px /* 调整图案大小 */
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 12px, /* 调整图案大小 */
      rgba(0,0,0,0.04) 12px,
      rgba(0,0,0,0.04) 24px /* 调整图案大小 */
    );
  opacity: 0.4;
  z-index: 5;
}
.vip-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 45px; /* 减小字体大小 */
  font-weight: bold;
  color: silver;
  text-shadow:
    2px 2px 4px rgba(0,0,0,0.6), /* 减小阴影 */
    -2px -2px 4px rgba(255,255,255,0.4); /* 减小阴影 */
  letter-spacing: 6px; /* 减小字间距 */
  z-index: 6;
}
.royal-crown {
  position: absolute;
  top: -25px; /* 调整位置 */
  left: 50%;
  transform: translateX(-50%);
  width: 125px; /* 减小宽度 */
  height: 60px; /* 减小高度 */
  z-index: 7;
  animation: crown-shine 4s infinite;
}
.royal-crown::before,
.royal-crown::after {
  content: '';
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
  border-left: 30px solid transparent; /* 减小尺寸 */
  border-right: 30px solid transparent; /* 减小尺寸 */
  border-bottom: 45px solid #FFD700; /* 减小尺寸 */
  filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.4)); /* 减小阴影 */
}
.royal-crown::before {
  left: 0;
  transform: rotate(-25deg);
}
.royal-crown::after {
  right: 0;
  transform: rotate(25deg);
}
.royal-crown .center-peak {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 25px solid transparent; /* 减小尺寸 */
  border-right: 25px solid transparent; /* 减小尺寸 */
  border-bottom: 50px solid #DAA520; /* 减小尺寸 */
  filter: drop-shadow(1.5px 1.5px 1.5px rgba(0,0,0,0.5)); /* 减小阴影 */
}
.royal-crown .jewels {
  position: absolute;
  top: 15px; /* 调整位置 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px; /* 减小间距 */
}
.jewel {
  width: 12px; /* 减小宝石大小 */
  height: 12px; /* 减小宝石大小 */
  background: radial-gradient(circle at center, #FF4500, #8B0000);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(255,69,0,0.8); /* 减小阴影 */
  animation: jewel-shimmer 3s infinite;
}
.light-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.2) 0%,
    rgba(255,255,255,0) 50%
  );
  z-index: 8;
  pointer-events: none;
}
</style>
