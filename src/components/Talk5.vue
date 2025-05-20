<template>
    <el-checkbox-group v-model="checkedCities" :min="1" :max="2" width="12px">
      <el-checkbox v-for="city in cities" :key="city"  :value="city" width="100%">
       <div>{{ city }}</div> 
        {{ "ll" }}
        
      </el-checkbox>
    </el-checkbox-group>
    <div class="ex" @click="up('l')">哈哈</div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  const mainColor=ref('blue')
  const checkedCities = ref(['Shanghai', 'Beijing'])

  const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
  const up = (val: string) => {
    
   document.documentElement.style.setProperty('--mai',mainColor.value)
     
  
    //   if(region.value!=null)
    //   index.value=(currentPage3.value-1)*region.value+val-1;
    //  else{
    //   index.value=(currentPage3.value-1)*5+val-1;
    //  }
  
    }
  </script>
  <style>
  .ex{
    color:var(--mai)
  }
  </style>