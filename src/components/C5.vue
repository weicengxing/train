<template>
  <div class="vip-badge">
    <div class="purple-flow"></div>
    <div class="badge-content">
      <div class="ornate-border"></div>
      <div class="heraldic-pattern"></div>
      <div class="border-sparkles">
        <div class="border-sparkle" style="--tx:10%; --ty:10%;"></div>
        <div class="border-sparkle" style="--tx:80%; --ty:50%;"></div>
        <div class="border-sparkle" style="--tx:40%; --ty:70%;"></div>
        <div class="border-sparkle" style="--tx:90%; --ty:90%;"></div>
        <div class="border-sparkle" style="--tx:50%; --ty:20%;"></div>
      </div>
      <div class="royal-crown">
        <div class="royal-crown-peak"></div>
        <div class="royal-crown-side-left"></div>
        <div class="royal-crown-side-right"></div>
        <div class="royal-crown-jewels">
          <div class="crown-jewel"></div>
          <div class="crown-jewel"></div>
          <div class="crown-jewel"></div>
        </div>
      </div>
      <div class="vip-text">VIP</div>
      <div class="light-effect"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ResponsiveVIPBadge',
});
</script>

<style scoped>
/* Container sizing: scales responsively */
.vip-badge {
  width: 100%;
  max-width: 350px;
  aspect-ratio: 350 / 230;
  position: relative;
  overflow: hidden;
  border-radius: 40px;
  background: linear-gradient(135deg, #FFD700, #DAA520);
  border: calc(8 / 350 * 100%) solid #B8860B;
  box-shadow:
    0 calc(20 / 230 * 100%) calc(45 / 230 * 100%) rgba(0,0,0,0.5),
    0 calc(10 / 230 * 100%) calc(25 / 230 * 100%) rgba(255,215,0,0.4);
  animation: silver-border-glow 3s infinite;
  transform: perspective(1500px) rotateX(15deg) rotateY(-15deg);
  display: flex;
  flex-direction: column;
  container-type: size;
}

@keyframes purple-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes jewel-shimmer {
  0%,100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(10deg); }
}
@keyframes crown-shine {
  0%,100% { opacity: 0.7; }
  50% { opacity: 1; }
}
@keyframes silver-border-glow {
  0%,100% {
    box-shadow:
      0 0 calc(10 / 230 * 100%) #C0C0C0,
      0 0 calc(20 / 230 * 100%) silver,
      0 0 calc(30 / 230 * 100%) #E6E6E6;
    border-color: #C0C0C0;
  }
  50% {
    box-shadow:
      0 0 calc(20 / 230 * 100%) silver,
      0 0 calc(40 / 230 * 100%) #E6E6E6,
      0 0 calc(60 / 230 * 100%) white;
    border-color: white;
  }
}
@keyframes border-sparkle {
  0%,100% { opacity: 0; }
  50% {
    opacity: 1;
    transform: rotate(360deg) scale(1.2);
  }
}

.purple-flow {
  position: absolute;
  inset: 0 0 auto auto;
  width: 100%;
  height: 10%;
  background: linear-gradient(45deg, #8A2BE2, #9400D3, #4B0082, #8A2BE2);
  background-size: 400% 400%;
  animation: purple-flow 10s ease infinite;
  opacity: 0.7;
  filter: blur(15px);
  z-index: 2;
}

.badge-content {
  position: relative;
  flex-grow: 1;
  overflow: hidden;
}

.ornate-border {
  position: absolute;
  inset: 0;
  border: 2% solid transparent;
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
  inset: 0;
  background-image:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 6%,
      rgba(0,0,0,0.06) 6%,
      rgba(0,0,0,0.06) 12%
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 6%,
      rgba(0,0,0,0.04) 6%,
      rgba(0,0,0,0.04) 12%
    );
  opacity: 0.4;
  z-index: 5;
}

.border-sparkles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

.border-sparkle {
  position: absolute;
  top: var(--ty);
  left: var(--tx);
  width: 3%;
  height: 3%;
  background: radial-gradient(circle, white, silver, transparent);
  border-radius: 50%;
  opacity: 0;
  animation: border-sparkle 2s infinite;
}

.royal-crown {
  position: absolute;
  top: 0;
  left: 50%;
  width: 57.14%; /* 200/350 */
  height: 43.48%; /* 100/230 */
  transform: translateX(-50%);
  z-index: 7;
}

.royal-crown-peak {
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 0;
  border-left: 14.29% solid transparent;  /* 50/350 */
  border-right: 14.29% solid transparent;
  border-bottom: 34.78% solid #FFD700; /* 80/230 */
  transform: translateX(-50%);
}

.royal-crown-side-left,
.royal-crown-side-right {
  position: absolute;
  top: 0;
  width: 14.29%;
  height: 0;
  border-left: 14.29% solid transparent;
  border-right: 14.29% solid transparent;
  border-bottom: 30.43% solid #DAA520; /* 70/230 */
}
.royal-crown-side-left { left: 0; transform: rotate(-20deg); }
.royal-crown-side-right { right: 0; transform: rotate(20deg); }

.royal-crown-jewels {
  position: absolute;
  top: 21.74%; /* 50/230 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2.86%; /* 10/350 */
}

.crown-jewel {
  width: 5.71%; /* 20/350 */
  height: 8.70%; /* 20/230 */
  background: radial-gradient(circle at center, #FF4500, #8B0000);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255,69,0,0.7);
  animation: jewel-shimmer 3s infinite;
}

.vip-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18.29%; /* approx 4rem relative to 350px */
  font-weight: bold;
  color: silver;
  text-shadow:
    4px 4px 8px rgba(0,0,0,0.6),
    -4px -4px 8px rgba(255,255,255,0.4);
  letter-spacing: 3.43%; /* 12px/350px */
  z-index: 6;
}

.light-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.2) 0%,
    rgba(255,255,255,0) 50%
  );
  z-index: 8;
  pointer-events: none;
}
</style>
