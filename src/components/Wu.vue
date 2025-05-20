<template>
   
    <div class="a">
      <d class="p"> {{ wuwu }}</d>
      {{ a }}
      <d class="b">  {{ b }}</d>
      {{ a }}
      <d class="o">  {{ c }}</d>
      {{  }}
       <d class="p"> {{ wu }}</d>
       {{ m }}
       <d class="b"> {{ n}}</d>
       {{ j }}
       <d class="o"> {{ k }}</d>
       {{ i }}
       <d class="o"> {{ k }}</d>
       {{  }}
       <d class="p"> {{ wu }}</d>
       {{ m }}
       <d class="b"> {{ n}}</d>
       {{ j }}
       <d class="o"> {{ k }}</d>
       {{ i }}
       <d class="o"> {{ k }}</d>
       {{  }}
       <d class="p"> {{ wu }}</d>
       {{ m }}
       <d class="b"> {{ n}}</d>
       {{ j }}
       <d class="o"> {{ k }}</d>
       {{ i }}
       <d class="o"> {{ k }}</d>
       {{  }}
       <d class="p"> {{ wuwu }}</d>
       {{ a }}
       <d class="b"> {{ b }}</d>
       {{ a }}
       <d class="o"> {{ k }}</d>
       {{ w }}
       <d class="o"> {{ k }}</d>
       {{  }}
       {{ t }}
       <d class="p"> {{ wu }}</d>
       {{ a }}
       <d class="b"> {{ n }}</d>
       ****************
       <d class="o"> {{ k }}</d>
       *******
       <d class="o"> {{ k }}</d>
       {{  }}
       {{ t }}
       <d class="p"> {{ wu }}</d>
       {{ a }}
       <d class="b"> {{ n }}</d>
       ****************
       <d class="o"> {{ k }}</d>
       *******
       <d class="o"> {{ k }}</d>
       {{  }}
       {{ t }}
       <d class="p"> {{ wu }}</d>
       {{ a }}
       <d class="b"> {{ n }}</d>
       ****************
       <d class="o"> {{ k }}</d>
       *******
       <d class="o"> {{ k }}</d>
       {{  }}
       <d class="p"> {{ wuwu }}</d>
      {{ a }}
      <d class="b">  {{ b }}</d>
      {{ a }}
      <d class="o">  {{ c }}</d>
      {{  }}
       
       
       
       

       
       
       

        
       
    </div>
    


</template>
<script lang="ts">
 import { defineComponent } from 'vue';
 export default defineComponent({
   //数据
  
   //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
//    async created() {
//        setTimeout(()=>{
//      this.$router.push("Wu");
//        },1500)
//    },
data: () => ({
    user:[],
       studentId: 45,
       wuwu:"5 5 5 5 5 5",
       a:"*****",
       b:"2 2 2 2 2 2",
       c:"0 0 0 0 0 0",
       wu:"5",
       m:"***************************",
       n:"2",
       j:"*****",
       k:"0",
       i:"*******",
       w:"********",
       
       
       t:"**********",
   
  }),
   created() {
       setTimeout(()=>{
    window.open('http://localhost:52330/gao/src/components/xin.html')
       },3000)
   },
  
 
     
     
  
 
 })
 </script>
<style>
.a{
    top:20%;
    left:36%;
    position: fixed;
    width:592.1px;
   /* padding: 57%;
    margin: 2%; */
    font-size: 30px;
   
}
.u{
   padding: 0%;
    margin-top: 0%;
    font-size: 30px;
   
}
.p{
    
    color:rgb(255, 0, 60);
    font-size: 30px;
    
}
.b{
    
    color:aqua
}
.o{
    
    color:darkviolet
}
</style>