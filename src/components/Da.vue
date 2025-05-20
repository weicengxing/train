<template>
    
     <div>
        <div class="k">张一玉</div>
        <div>
        <el-button type="primary"  @click="sub()"   round>下一页</el-button>
        </div>
        <div class="l"> 只惊倾城</div>
        <div class="o"> 美丽不惊世</div>
    <div id="building" >
       
    
<div class="jk"><sup>冰</sup><sub>雪</sub></div>
    </div>
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
   
   
sub(){
this.$router.push("Ni");

}


    
  },
});
</script>

<style>
.l{
    font-style: italic;
   
    color: rgb(160, 95, 144);
    margin-left: 30%;
    margin-top: 8%;
    font-size: 30px;
    width:32px;
}
.o{
    font-style: italic;
    color: cadetblue;
    margin-left: 27%;
    margin-top:1% ;
    font-size: 30px;
    width:32px;
}

.k{
    margin-top: 60px;
    font-size: 40px;
}
.jk{
   
   
    /* font-style:italic; */
      font-weight:100;

    margin-top:50%;
    font-size: 40px;
    color: rgb(255, 127, 208);
}

#building{
background:url("../assets/1.jpg");
top:24%;

left: 35%;
width: 30%;

height:59%;
position: fixed; 

 background-size:100% 100%;
}

</style>

