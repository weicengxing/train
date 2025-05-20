<template>
    <div> HJSHJGH
      <h1>{{ m }}</h1>
        <el-table :data="tableData" style="width:17cm;height: 50cm" >
     <el-table-column prop="date" label="Date" width="200" height="1000" />
    <el-table-column prop="name" label="Name" width="200" height="300"  />
    <el-table-column prop="address" label="Address" width="300" height="300" />
  </el-table> 
  
  
    </div>
  </template>
  
  <!-- <script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    }
  }
  </script> -->
   <!-- <script>


   export default {
    name: 'HellWorld',
    props: {
      msg: String
    },
    
     
} -->
 <!-- </script> -->
 <script lang="ts" setup>
 const tableData = [
   {
     date: '2016-05-03',
     name: '张一玉',
     address: 'No. 189, Grove St, Los Angeles',
   },
   {
     date: '2016-05-02',
     name: 'Tom',
     address: 'No. 189, Grove St, Los Angeles',
   },
   {
     date: '2016-05-04',
     name: 'Tom',
     address: 'No. 189, Grove St, Los Angeles',
   },
   {
     date: '2016-05-01',
     name: 'Tom',
     address: 'No. 189, Grove St, Los Angeles',
   },
 ]
 var m=1;
 {/* export default {
    name: 'HellWorld',
    props: {
      msg: String
            }
            } */}
 </script> 
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  
  