<template>
     <div>
    <div class="k">张一玉</div>
    </div>
    <div>
        <el-button type="primary" class="commbutton" @click="sub()"   round>下一页</el-button>
      
  </div>
    <div id="building" >
        
<div class="jk">你<sub>在</sub>干<sup>嘛</sup></div>
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
this.$router.push("Gei");

}


    
  },
});
</script>



<style>
.k{
    margin-top: 60px;
    font-size: 40px;
}
.jk{
   
    font-style:italic;
      font-weight:100;

    margin-top:50%;
    font-size: 40px;
    color: rgb(127, 255, 133);
}
#building{
background:url("../assets/2.jpg");
top:24%;

left: 35%;
width: 30%;
height:59%;
position: fixed;
background-size:100% 100%;}
.commbutton{
    margin-left: 45%;
    margin-top: 15%;
}

</style>

