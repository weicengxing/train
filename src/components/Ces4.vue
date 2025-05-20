<template>
    <el-table
        v-loading="loading"
        ref="muti"
      :row-key="getRowIdentity"
      @selection-change="handsel"
        :data="hang"
        :header-cell-style="{
          color: '#2E2E2E',
          fontSize: '10px',
          fontWeight: '400',
        
          
        }"
        :row-style="{ height: '1px' }"
        
        style="width: 100%"
        class="i"
      >
      
      <el-table-column   type="selection"  width="55" >
        

      </el-table-column>
    
        <el-table-column label="序号"  width="50" color="black">
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        
        <el-table-column label="日期" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.ri }}
          </template>
        </el-table-column>
        <el-table-column label="出发站" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.qi }}
          </template>
        </el-table-column>
        <el-table-column label="终点站" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.zh }}
          </template>
        </el-table-column>
        <el-table-column label="出发时间" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.atime }}
          </template>
        </el-table-column>
        <el-table-column label="抵达时间" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.stime }}
          </template>
        </el-table-column>
        <el-table-column label="费用" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.fee }}
          </template>
        </el-table-column>
        <el-table-column label="车次" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.ban }}
          </template>
        </el-table-column>
        <el-table-column label="总时长" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.len }}
          </template>
        </el-table-column>
        <el-table-column label="总票" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.zong }}
          </template>
        </el-table-column>
        
        <el-table-column label="余票" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.yu }}
          </template>
        </el-table-column>
        <el-table-column label="操作" color="black"  width="230">
          <template v-slot="scope">
            <el-button type="primary" @click="" icon="edit"
              >编辑</el-button
            >
            
            <el-button type="danger" @click="" icon="delete"
              >删除</el-button
            >
          </template>
        </el-table-column>
       
      </el-table>
      <div>暂无更多信息</div>
      <p></p>
    <div class="l">
       
      
      <el-pagination
        v-model:current-page="currentPage3"
        v-model:page-size="pageSize3"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="prev, pager, next, jumper"
        :total="size"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
     
     
    </div>
    <p></p>
    <!-- <div>
      <el-button type="success" @click="l" >确定</el-button>
     </div> -->
  
  </template>
  <script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import request from "../utils/request";
  import type { ComponentSize } from 'element-plus'
  import router from "../router";
import { getRowIdentity } from 'element-plus/es/components/table/src/util.mjs';
  const currentPage3 = ref(1)
  const size=ref();
  const pageSize3 = ref(100)
  const selectid=ref([]);
 
 const handsel=(val)=>{
    if(val){
        val.forEach((row)=>
    {
        if(row){
selectid.value.push(row.id);
        }
    }
    )
    }
    //alert(selectid.value)
    
 }
  const background = ref(false)
  const disabled = ref(false)
  var fd=new FormData();
const hang=ref([]);
  const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
  }
  const handleCurrentChange = (val: number) => {
    var fd=new FormData();
fd.append("page",currentPage3.value+"")
request.post("/user/getpage",fd).then(res=>{
  hang.value=res.data;


 });
  }
  function met(){
   
   alert("kk");

 
 }
  const l=()=>{
   
    var fd=new FormData();
fd.append("page",currentPage3.value+"")
request.post("/user/getpage",fd).then(res=>{
  hang.value=res.data;


 });

  
  }
  onMounted(()=>{
    var fd=new FormData();
fd.append("page","1")
    request.post("/user/getpage",fd).then(res=>{
  hang.value=res.data;


 });
  request.post("/user/getpagesize").then(res=>{
  size.value=res.data*100;


 });
 

  })
  
  </script>
  
  <style scoped>
  .l{
    margin-left: 30%;
  }
  .m{
    margin-left: 20px;
  }
  </style> 