<template>
    
   <div id="building" > </div>
    <div id="bu" ></div>
    <div id="b" ></div>
    
    
  
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  //数据
 
  //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
  async created() {
      setTimeout(()=>{
    this.$router.push("Tu1");
      },1500)
  },
 

    
    
 

})
</script>




<style>

#building{
background:url("../assets/4.jpg");
top:24%;

left: 5%;
width: 30%;
height:59%;
position: fixed;
background-size:100% 100%;}
.commbutton{
   margin-left: 45%;
   margin-top: 15%;
}
#bu{
background:url("../assets/5.jpg");
top:24%;

left: 37%;
width: 30%;
height:59%;
position: fixed;
background-size:100% 100%;}
.commbutton{
   margin-left: 45%;
   margin-top: 15%;
}
#b{
background:url("../assets/6.jpg");
top:24%;

left: 69%;
width: 30%;
height:59%;
position: fixed;
background-size:100% 100%;}
.commbutton{
   margin-left: 45%;
   margin-top: 15%;
}

</style>

