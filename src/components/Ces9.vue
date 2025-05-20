<template>
    <SpriteAnimation
      spriteUrl="/images/th.jpg"
      :frameWidth="(626/3)"
      :frameHeight="208.5"
      :frames="6"
      :framesPerRow="3"
      :frameRate="12"
      :autoPlay="true"
      :loop="true"
    />
  </template>
  
  <script setup>
  import SpriteAnimation from '../components/SpriteAnimation.vue'
  </script>