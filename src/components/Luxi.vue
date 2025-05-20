<template>
    <div>
      <div class="l">{{ qi }}—————{{zh}} (直达)</div>
      <div class="yy">{{ parseInt(mon)+1 }}月{{day}}日</div>
      <el-button plain @click="ope()" type="primary">
        
        Click to open Message Box
        <el-icon><Open /></el-icon>
      </el-button>
      <p></p>
      <el-tooltip :content="'Switch value: ' + kai" placement="top">
    <el-switch
    @click="tishi()"
      v-model="kai"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      active-value="100"
      inactive-value="0"

    />
  </el-tooltip>
  
      <!-- <el-icon><Plus /></el-icon>
      <el-icon :size="30" color="teal"><Lock />ll</el-icon> -->


        <el-table
        
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
        <el-table-column label="序号"  width="50" color="black">
          <template v-slot="scope">
            {{ scope.$index + 1 }}
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
        <el-table-column label="头像" color="black"  width="100" >
          <template v-slot="scope">
              <img :src= scope.row.path height="100px">

          </template>
        </el-table-column>
        <el-table-column label="余票" color="black"  width="100">
          <template v-slot="scope">
            {{ scope.row.yu }}
          </template>
        </el-table-column>
        <el-table-column label="操作" color="black"  width="300">
          <template v-slot="scope">
            <!-- <el-button type="primary" @click="e(scope.row.ban)" icon="View" 
              >查看</el-button
            >
            图标在前 -->
            <el-button type="primary" @click="e(scope.row.ban)" 
              >查看
              <el-icon><View /></el-icon>
              </el-button
            >
            <el-button type="primary" @click="xunyuding(scope.row.ban,scope.row.yu)"
              >预订
              <el-icon><CircleCheck /></el-icon>
              </el-button
            >
            <el-button type="primary"  @click="haop (scope.row)">
    窗口
    <el-icon><Reading /></el-icon>
  </el-button>
  <el-dialog v-model="open" title="数据" width="500" center>
    <!-- <span>
      It should be noted that the content will not be aligned in center by
      default
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="haop2()">Cancel</el-button>
        <el-button type="primary" @click="haop2()">
          Confirm
        </el-button>
      </div>
    </template> -->
    <el-form :model="form" :rules="rules" ref="form">
          <el-form-item
            label="车次"
            
           >   <el-input v-model="che"></el-input>
          </el-form-item>
          <el-form-item
            label="余票"
            
           >   <el-input v-model="yu"></el-input>
          </el-form-item>
          <el-form-item label="地区" >
        <el-select v-model="region" placeholder="Please select a zone">
          <el-option label=" No.1 上海 " value="shanghai" />
          <el-option label=" No.2 北京" value="beijing" />
        </el-select>
      </el-form-item>
      <el-cascader :options="options"  class="hh" clearable />
      <img src="../assets/1.jpg" width="100" height="100" />
          <el-button type="primary" class="z"  @click="haop2()" icon="close">关闭</el-button>
        
    </el-form>
  </el-dialog>
          </template>
        </el-table-column>
       
      </el-table>
      <!-- <el-dialog :visible.sync="getmessage">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="">
      
        <el-input v-model="ruleForm" placeholder="标题信息" style="margin-top: 10px;"></el-input>
        

      </el-form-item>
      </el-form>
    </el-dialog> -->
    <!-- <el-dialog	title="个人信息修改"
:visible.sync="open" height="50%"
>
<el-form ref="form":model="hang">
<el-form-item class="span" label="输入
姓名"prop="name">
<el-input v-model="input"
placeholder="请输入姓名"class="input"></el-input>
</el-form-item>
<el-button type="primary">确定
</el-button>
<el-button>取消</el-button>
</el-form>
</el-dialog> -->
      <div>暂无更多信息</div>
      <div>
        <el-button type="primary" @click="fan(name) " icon="Back"
              >返回
             </el-button
            >
      </div>
      
   
   
    </div>
</template>

<script lang="ts" >
import axios from "axios";
import {type Hang } from "../model/general";
import { studentDelete } from "../Ser/infoServ";
import { defineComponent } from "vue";
import request from "../utils/request";
import router from "../router";
import { ref } from 'vue'
import { ElMessage,ElMessageBox  } from 'element-plus'
import { markRaw } from 'vue'
import { Delete } from '@element-plus/icons-vue'


const centerDialogVisible = ref(false);



export default defineComponent({
  //数据
  data: () => ({
    hang:[] as Hang[] ,
    qi:"",
    zh:"",
    name:"",
    yuding:"",
    uu:"",
    mon:"",
    day:"",
   open:false,
    ruleForm:"",
    rules:"",
    input:"",
    che: ""  ,
    yu:"",
    region:"",
    value:"",
    imjj:"/src/assets/1.jpg",
    kai:"0",
    options: [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
],
    K1032:"" ,
       
   
  }),
  //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
  async created() {
    this.ha();

  },
  methods: {
   

async ha(){
   const res=this.$route.query.qi;
    if(res!=null)
    this.qi=res.toString();
    const res2=this.$route.query.zh;
    if(res2!=null)
    this.zh=res2.toString();
    const res3=this.$route.query.name;
    if(res3!=null)
    this.name=res3.toString();
    const res4=this.$route.query.mon;
    if(res4!=null)
    this.mon=res4.toString();
     
    const res5=this.$route.query.day;
    if(res5!=null)
    this.day=res5.toString();
    
     request.get("user/gethang?qi="+this.qi+"&zh="+this.zh+"&mon="+this.mon+"&day="+this.day).then(res => {
        //if (res.code === '0') {
          this.hang = res.data;
         
          if(this.hang[0]==null) alert("抱歉，暂未查询到相关车次")
          
        });

        var fd=new FormData();
fd.append("manage",this.name)
request.post("/user/getPhoto",fd).then(res=>{
  this.K1032=res.data;


 });

  



},
 async e(ban :string ){
  
  router.push({
    
        path: "juti",
        query: { banc: ban ,
          qi:this.qi,
          zh:this.zh,
          name:this.name,
            mon:(parseInt(this.mon)+1)+"",
            day:this.day,
        },

      });

},
async haop(rows:any ){
  this.che = rows.ban;
  this.yu=rows.yu;
  this.open=true;
  

},
async haop2( ){
  alert(this.region)
  this.open=false;

  

},
async ope( ){
  
  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      center: true,
      //icon:Delete,
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
  

},
async tishi( ){
  if(this.kai=="100"){
    ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
    
    plain: true,
  })
  }
  else {
   
    ElMessage({
    message: 'Oops, this is a error message.',
    type: 'error',
    plain: true,
  })
  }

  

},
async uyoding(ban:string){
  
  await request.get("user/uyoding?name="+this.name+"&ban="+ban+"&qi="+this.qi+"&zh="+this.zh+"&mon="+this.mon+"&day="+this.day).then(res => {
        this.uu=res.data;
         
          
        });

},
async uyu(ban:string){

  await request.get("user/xunyudi?ban="+ban+"&mon="+this.mon+"&day="+this.day).then(res => {
        this.yuding=res.data;
        this.uyoding(ban);
         this.ha();
        alert(this.yuding);
              
         
          
        });
},
async xunyuding(ban :string,yupiao:number ){
 await request.get("user/xunyuding?ban="+ban+"&name="+this.name).then(res => {
        //if (res.code === '0') {
          this.yuding = res.data;
         
          if(this.yuding=="1")  alert("已预订本车次,请注意是否需要变更车站");
          else{
            if(yupiao==0){
              alert("抱歉,暂无余票");
            }
            else{
              
            this.uyu(ban );
        
            }


          }

          
        });
  

},
fan( name :string){
  router.push({
    
    path: "Zhu",
    query: { name:name
        
    },

  });
}


}
})

</script>   
<style>
.l{
  margin-top: 0%;
  margin-bottom: 7%;
font-size: 30px;
}
.z{
  margin-left: 40%;
  margin-bottom: 7%;

}
.yy{
  
  margin-bottom: 5%;
font-size: 25px;
}
.hh{
  width:100%;
  margin-bottom: 5%;
}

</style>
