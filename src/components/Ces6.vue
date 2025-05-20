<template>
    <div>
      <Sidebar /> <!-- 引入侧边栏导航栏组件 -->
      <router-view /> <!-- 渲染当前激活的路由组件 -->
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/Ces5.vue'
  
  export default {
    components: {
      Sidebar
    },
    // 组件逻辑
  }
  </script>
  
  <style>
  /* 组件样式 */
  </style>