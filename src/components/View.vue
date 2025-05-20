<!-- <template>
  <div>
    <router-link to="/">Home</router-link> 
    
    <router-link to="/cai">About</router-link>
  </div>
  
</template>
<script setup>
</script>
<style  scoped>
div {
  position: fixed;
  bottom: 50;
  width: 20%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  display: flex;
  justify-content: space-around;
}
</style> -->


<template>
  <div>
    <!-- <button class="commbutton" @click="submit()">提交</button> -->
  </div>
</template>
<script lang="ts">
//import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    
  }),
  created() {
    
  },
  methods: {
   
    // 查询请求
     
//      convertToPinyin(ad:any) {
//       const pinyin = require('pinyin');

//   const options = {
//     style: 'normal', // 普通风格，不带声调
//     heteronym: false // 无多音字模式
//   };

//   const result = pinyin(ad, options).join(' ');

//   return result;
// }我真的已经尽力了
submit(){
this.$router.push("Tab");

}


    
  },
});
</script>
