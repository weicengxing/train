<template>
    <el-table
ref="multipleTableRef"
:data="state.tableData"
style="width: 100%"
@selection-change="handleSelectionChange"
> 
<el-table-column type="selection" width="55" />
<el-table-column type="index" label="序号" width="55" />
<el-table-column property="remark" label="用户名" width="120"/>
<el-table-column property="name" label="姓名" width="250" />
<el-table-column property="address" label="备注"/>
</el-table>
</template>
<script>
import {reactive,watch,ref, onMounted} from 'vue'
// import axios from 'axios'
// import { roleTypes } from 'element-plus'
const multipleTableRef = ref()
const state = reactive({
tableData:[
{
remark: '张三',
name: 'Tom',
address: 'No. 189, Grove St, Los Angeles',
status: 2,
},
{
remark: '李四',
name: 'Tom',
address: 'No. 189, Grove St, Los Angeles',
status: 1,
},
{
remark: '王五',
name: 'Tom',
address: 'No. 189, Grove St, Los Angeles',
status: 1,
},

]
})
onMounted(() => {
console.log(multipleTableRef.value);
state.tableData.forEach(row => {
if (row.status == 1){
 multipleTableRef.value.toggleRowSelection(row,true)
}else {
  multipleTableRef.value.toggleRowSelection(row,false)
} 
})
})

const handleSelectionChange = (val) => {
console.log(val);
}
</script>