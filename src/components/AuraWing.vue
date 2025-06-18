<template>
  <div class="aura-wing-wrapper">
    <svg 
      class="wing-svg"
      viewBox="0 0 300 300" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="aura-wing-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#00e5ff;" />
          <stop offset="50%" style="stop-color:#ff00e1;" />
          <stop offset="100%" style="stop-color:#ffdc73;" />
        </linearGradient>
        <!-- [改动] 增强了光晕效果的范围 -->
        <filter id="aura-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <g class="wing-group" filter="url(#aura-glow)">
        <g class="feathers-back">
          <path d="M150 150 Q180 100 280 80 L290 150 Q220 160 150 150 Z" class="feather-1" />
          <path d="M150 150 Q200 120 300 125 L300 180 Q230 180 150 150 Z" class="feather-2" />
        </g>
        <g class="feathers-mid">
          <path d="M150 150 Q190 180 290 200 L295 240 Q220 220 150 150 Z" class="feather-3" />
          <path d="M150 150 Q170 210 270 250 L275 280 Q210 240 150 150 Z" class="feather-4" />
        </g>
        <g class="feathers-front">
          <path d="M150 150 Q160 140 250 130 L265 170 Q200 160 150 150 Z" class="feather-main-1" />
          <path d="M150 150 Q170 180 260 195 L270 225 Q210 195 150 150 Z" class="feather-main-2" />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
/* [改动] 显著增大了翅膀的尺寸 */
.aura-wing-wrapper {
  width: 400px;
  height: 400px;
}
.wing-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.wing-group {
  fill: url(#aura-wing-gradient);
  animation: wing-breathe 6s ease-in-out infinite;
  transform-origin: 150px 150px;
}
@keyframes wing-breathe {
  0%, 100% { transform: scale(0.95) rotateZ(-5deg); }
  50% { transform: scale(1.05) rotateZ(5deg); }
}
.feathers-back { animation: float 7s ease-in-out infinite reverse; }
.feathers-mid { animation: float 8s ease-in-out infinite; }
.feathers-front { animation: float 6s ease-in-out infinite reverse; }
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.feather-1 { animation: flutter 5s ease-in-out infinite 0.2s; }
.feather-2 { animation: flutter 6s ease-in-out infinite 0.4s; }
.feather-3 { animation: flutter 5.5s ease-in-out infinite 0.6s; }
.feather-4 { animation: flutter 6.5s ease-in-out infinite 0.8s; }
@keyframes flutter {
  0%, 100% { transform: rotateZ(0); }
  50% { transform: rotateZ(3deg); }
}
</style>