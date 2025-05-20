<template>
    <div>
    <div class="k">张一玉</div>

    </div>
    
    <div class="op">点累了，让它自己跳转吧</div>
   
    <div>
        <el-button type="primary"  @click="sub()" class="commbutton"  round>下一页</el-button>
        </div>
    <div id="building" >
        
<div class="jk">
    <em>
    给<sup>你</sup>看<sub>这</sub>个
    </em>

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
this.$router.push("Tu");

}


    
  },
});
</script>
<style>
.op{color:black;
    font-size: 20px;
    width: 22px;
    margin-left: 85%;
    margin-top: 15%;
}
.k{
    margin-top: 60px;
    font-size: 40px;
}
.jk{
    margin-top:50%;
    font-size: 40px;
    font-style:italic;
      font-weight:100;

    color: rgb(255, 127, 127)
    ;
}
.commbutton{
    margin-left: 45%;
    margin-top: 0%;
}

#building{
background:url("../assets/3.jpg");
top:24%;

left: 35%;
width: 30%;
height:70%;
position: fixed;
background-size:100% 100%;}

</style>

