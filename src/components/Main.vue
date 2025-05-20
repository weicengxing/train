<template>
    <div class="page-body">
        <PageNav></PageNav>

        <router-view/>
        
    </div>
    <div class="bottom">
      <PageBottom></PageBottom>
    </div>
  </template>
  
  <script setup>
  import PageNav from "../components/Moban.vue"
  import PartnerView from "../components/Login.vue"
  import PageBottom from "../components/Header.vue"
import router from "../router/index2";
  </script>
  
  <style scoped>
  .page-body {
    display: flex;
  }
  </style>