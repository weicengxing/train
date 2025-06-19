<template>
    <div style="padding: 10px; margin-bottom: 50px">
      <el-row>
        <el-col :span="8">
          <el-card style="width: 100%; min-height: 100%; color: #333">
           <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc">在线用户<span style="font-size: 12px">（点击聊天气泡开始聊天）</span></div>
            <!-- <div style="padding: 10px 0" v-for="user in users" :key="user.username">
              <span>{{ user.username }}</span>
             
                 <el-icon  @click="chatUser = user.username"><ChatDotRound /></el-icon>
              <span style="font-size: 12px;color: limegreen; margin-left: 5px" v-if="user.username === chatUser">chatting...</span>
            </div> -->
            <el-table
       
        ref="muti"
     
     
        :data="users"
        :header-cell-style="{
          color: '#2E2E2E',
          fontSize: '10px',
          fontWeight: '400',
        
          
        }"
        :row-style="{ height: '1px' }"
        
        style="width: 100%"
        class="i"
      >
      <el-table-column label="" color="black"  width="85" >
       
        <template v-slot="scope">
          <el-badge :value="parseInt(scope.row.shz)" :max="6" class="item" :show-zero=show
          :hidden="scope.row.username==chatUser">
            <img :src="`/images/${scope.row.img.replace('/src/assets/', '')}`" class="d">
            
          </el-badge>
        </template>
       
    </el-table-column>
     
     
       
     
        <el-table-column label="" color="black"  width="140" >
          <template v-slot="scope">
            <a class="title" >
            {{ scope.row.username }}
            </a>
            <p class="zuo" v-if="scope.row.type!='invite'&&scope.row.qunid==null ">
             {{ scope.row.last }}

            </p>
            <p class="zuo" v-if="scope.row.type!='invite'&&scope.row.qunid ">
            <liu style="color:red;">{{ scope.row.from+":" }}</liu> {{ scope.row.last }}

            </p>
            <p class="zu" v-if="scope.row.type=='invite' ">
              <el-icon><Share /></el-icon>
      <o style="color:brown;margin-left: 8px;">进群链接</o>
            
            </p>
          </template>
       
       
       
      </el-table-column>
    
      <el-table-column label="" color="black"  width="10" >
       
       
       
      </el-table-column>
      <el-table-column label="" color="black"  width="50" >
        <template v-slot="scope">
        <el-icon  @click="xuanr(scope.row.username,scope.row.qunid) " color="#FF3333"><ChatDotRound /></el-icon>
       </template>
       
    </el-table-column>
     
    <el-table-column label="" color="black"  width="100" >
        <template v-slot="scope">
    
        <span style="font-size: 12px;color: limegreen; margin-left: 5px" v-if="scope.row.username == chatUser">chatting...</span>
       </template>
       
    </el-table-column>
        
      </el-table>
          </el-card>
        </el-col>
        <el-col :span="16">
        <div style="width: 800px; margin: 0 auto; background-color: white;
                    border-radius: 5px; box-shadow: 0 0 10px #ccc">
          <div style="text-align: center; line-height: 50px;" >
            Web聊天室（{{ chat }}）
          </div>
          <div style="height: 450px; overflow:auto; border-top: 1px solid #ccc" >
            
          <div v-for="(item,index) in contentList"  >
            <div v-if="item.scha=='1'&&index==0" class="l">{{ item.daya+"  " }}{{ item.timea }}</div>
            <div v-if="item.scha=='1'&&index!=0"class="m">{{ item.daya+"  " }}{{ item.timea }}</div>

            <div v-if="item.fromw!=userna&&item.idxiao!=0" >
              
            <p style="padding-top: 72px;"></p> 
           
            <img :src=item.headImgUrl width="70px" class="a" >
                <div class="chat-bubble left" v-if="item.textType=='text'" >
                
        {{ item.content }}
                </div>
                 <div v-if="item.textType=='image'" >
            <img :src=item.content  class="c">
                  </div>
                  <div v-if="item.textType=='invite'" class="k">
                    <el-result
        icon="success"
        title="点击进群"
        @click="jinqun(item.fromw,item.content)"
      >
      </el-result>
                  </div>

            </div>
            <div v-if="item.fromw==userna">
            <p style="padding-top: 72px;"></p> 
            <el-icon class="v" @click="che(index)" v-if="chexian==1&&gouli[index].xuan==1"><CircleCheck /></el-icon>
            <el-icon class="u" @click="che(index)" v-if=" chexian==1&&gouli[index].xuan==0"><Check /></el-icon>
            <img :src=toux width="70px" class="b" >
            <div class="chat-bubble right" v-if="item.textType=='text'" >
                
        {{ item.content }}
            </div>
            <div v-if="item.textType=='image'" >
            <img :src=item.content  class="e">
        </div>
        <div v-if="item.textType=='invite'" class="j">
                    <el-result
        icon="success"
        title="点击进群"
        @click="jinqun(item.fromw,item.content)"
      >
      </el-result>
                  </div>
            </div>
          </div>
      
        
          </div>






          <div style="height: 100px">
            <textarea v-model="text" style="height: 60px; width: 100%; padding: 20px; border: none; border-top: 1px solid #ccc;
             border-bottom: 1px solid #ccc; outline: none">
             
             </textarea>
            <div style="text-align: right; padding-right: 10px">
                <input
      style="margin-right: 10px"
              type="file"
              id="fi"
              accept=".jpg" 
               @click="shua()"
    ></input>
    <el-button type="primary" size="mini" @click="sendtu" v-if="chexian==0">发送图片</el-button>
              <el-button type="primary" size="mini" @click="send" v-if="chexian==0">发送</el-button>
              <el-button type="primary" size="mini" @click="chexian=1" v-if="chexian==0">撤回</el-button>
              
              <el-button type="primary" size="mini" @click="chequ" v-if="chexian==1">确定</el-button>
              <el-button type="primary" size="mini" @click="qu" v-if="chexian==1">取消</el-button>
              <el-button type="primary" size="mini" @click="jianqun" v-if="chexian==0">建群</el-button>
             
              <el-select
    v-model="xuqun"
    clearable
    placeholder="选择群聊"
    style="width: 240px ;margin-top: 10px;margin-right: 6px"
    v-if="yaoxian==1&&qunli[0].id!=-1&&chexian==0"
  >
    <el-option
      v-for="item in qunli"
      :key="item.id"
      :label="item.nam"
      :value="item.id"
      
    />
  </el-select>
              <el-button type="primary" size="mini" @click="yao" v-if="chexian==0">邀请</el-button>
            </div>
          </div>
        </div>
      </el-col>
      </el-row>
    </div>
    <el-dialog v-model="open" title="建群中..." width="500" center>
     <div style="margin-left: 45%;margin-bottom: 20px;">{{ "群聊名" }}</div> <el-input v-model="nam" style="margin-bottom: 20px;"></el-input>
      <el-button type="success"  @click="jianqun2" style="margin-left: 35%;">确定</el-button>
      <el-button type="primary" @click="open=false" >取消</el-button>
               
      </el-dialog>
  </template>
  <script >
  import request from "@/utils/request";
  import reque from "../utils/request";
  import { ElMessage,ElMessageBox  } from 'element-plus'
import { da } from "element-plus/es/locales.mjs";
  let socket;
  export default {
    name: "Im",
    data() {
      return {
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        user: {},
        isCollapse: false,
        users: [],
        chatUser: '',
        open:false,
        text: "",
        messages: [],
        content: '',
        userna:'',
        toux:'',
        show:false,
        id:1,
        shz:0,
        nam:'',
        lastt:'',
        scon:"",
       goucolor:'',
       chexian:0,
       yaoxian:0,
       xuqun:'选择群聊',
       chat:'',
       gouli:[
        {"id":0,
        "xuan":0,}
        ,
       ],
       qunli:'',
       contentList:[
						{"idxiao": 0,
						"fromw":"",
            "tow":"",
						"headImgUrl":"/src/assets/4.jpg",
						"textType": "text",
						"content": "",
					},

					// {
					// 	"id": 2,
					// 	"type": 2,
					// 	"textType": "text",
					// 	"headImgUrl": "/static/girl.jpeg",
					// 	"content": "对呀，这都被你发现了，只是我爸妈不让我养.对呀，这都被你发现了，只是我爸妈不让我养.",
					// },
					// {
					// 	"id": 3,
					// 	"type": 1,
					// 	"textType": "text",
					// 	"headImgUrl": "/src/assets/4.jpg",
					// 	"content": "把你的兴趣给剥夺了，我之前养过一只萨摩，去年送给朋友了。",
					// },
					// {
					// 	"id": 4,
					// 	"type": 2,
					// 	"textType": "text",
					// 	"headImgUrl": "/static/girl.jpeg",
					// 	"content": "你也喜欢养宠物啊?",
					// },
					// {
					// 	"id": 5,
					// 	"type": 1,
					// 	"textType": "text",
					// 	"headImgUrl": "/src/assets/4.jpg",
					// 	"content": "是啊，猜我现在养的啥?",
					// },
					// {
					// 	"id": 6,
					// 	"type": 2,
					// 	"textType": "text",
					// 	"headImgUrl": "/static/girl.jpeg",
					// 	"content": "小猫?",
					// },
					// {
					// 	"id": 7,
					// 	"type": 1,
					// 	"textType": "text",
					// 	"headImgUrl":"/src/assets/4.jpg",
					// 	"content": "不对，养了一只小仓鼠",
					// },
					// {
					// 	"id": 8,
					// 	"type": 1,
					// 	"textType": "image",
					// 	"headImgUrl": "/src/assets/4.jpg",
					// 	"content": "/src/assets/3.jpg",
					// },
					// {
					// 	"id": 9,
					// 	"type": 2,
					// 	"textType": "text",
					// 	"headImgUrl": "/static/girl.jpeg",
					// 	"content": "真的好可爱啊",
					// },
					// {
					// 	"id": 10,
					// 	"type": 2,
					// 	"textType": "text",
					// 	"headImgUrl": "/static/girl.jpeg",
					// 	"content": "看的我也想养一只",
					// }, {
					// 	"id": 11,
					// 	"type": 1,
					// 	"textType": "text",
					// 	"headImgUrl": "/src/assets/4.jpg",
					// 	"content": "要不我送你一只好啦",
					// },
					// {
					// 	"id": 12,
					// 	"type": 2,
					// 	"textType": "text",
					// 	"headImgUrl": "/st/girl.jpeg",
					// 	"content": "真的吗？",
					// }
      ]
      }
    },
    created() {
      this.init()
     
   







    },
    methods: {
      async  sendtu(){
        if (!this.chatUser) {
          this.$message({type: 'warning', message: "请选择聊天对象"})
          return;
        }
        var now=new Date();
            var day=now.toLocaleDateString();var time=now.toLocaleTimeString();
          var  a=mon+"g"+day; var b=this.scon;
            var scha;
           { var a1= (Integer.parseInt(a.substring(0,4))-Integer.parseInt(b.substring(0,4)))*365*24*3600;
       var b1=(Integer.parseInt(a.substring(5,7))-Integer.parseInt(b.substring(5,7)))*30*24*3600;
       var c1=(Integer.parseInt(a.substring(8,10))-Integer.parseInt(b.substring(8,10)))*24*3600;
       var d1=(Integer.parseInt(a.substring(11,13))-Integer.parseInt(b.substring(11,13)))*3600;
       var e1=(Integer.parseInt(a.substring(14,16))-Integer.parseInt(b.substring(14,16)))*60;
       var f1=(Integer.parseInt(a.substring(17,19))-Integer.parseInt(b.substring(17,19)));
       if(a1+b1+c1+d1+e1+f1>=300) scha= "1";
       else scha= "0";}
            const file = document.querySelector("#fi") ;
            var fd=new FormData();
            if (file.files == null || file.files.length == 0) {
          this.$message({type: 'warning', message: "请选择图片"})
          return;
        } 
            fd.append("pic",file.files[0])
            fd.append("sh",this.contentList.length+1)
  fd.append("manage",null)
 await reque.post("/user/upload3",fd).then(res => {
        this.id=res.data;
          
        });
  
          
           let message = {from:  this.userna, to: this.chatUser, text: "/src/zhong/"+(this.id)+".jpg",zho:1,textType:"image"}
           socket.send(JSON.stringify(message)); 
           
 
           this.contentList.push(
            {
						//"id": this.id,
					//	"type": 2,
          "fromw":this.userna,
						"textType": "image",
						"headImgUrl": "/src/assets/"+this.userna+".jpg",
						"content": "/src/zhong/"+(this.id)+".jpg",
					}
           )
          this.scon=mon+"g"+day;
          this.gouli.push(
            {
              "xuan":0
            }
          )
           
        },
          xuanr(to,qunid){
            
           
            this.chat=to;
          if(qunid!=null)
         {
          this.chatUser=qunid;
          
          let message = {to:qunid,zho:6 }
            socket.send(JSON.stringify(message));
            
            }
            else{
             
              this.chatUser=to;
            let message = {to:this.chatUser,zho:2 }
            socket.send(JSON.stringify(message));
            }
          
        },
        jianqun(){
          this.open=true;
        },
        jianqun2(){
          if(this.nam=='')  {this.$message({type: 'warning', message: "请输入群聊名"})
          return;}
          let message = {to:this.chatUser,zho:4,nam:this.nam }
          socket.send(JSON.stringify(message));
          this.open=false;
          
        },
        jinqun(jiaru,qun){
          if(this.userna==jiaru)  {this.$message({type: 'warning', message: "您已加入本群"})
          return;}
          let message = {jiaru:this.userna,zho:5,qun:qun }
          socket.send(JSON.stringify(message));
          
        },
        qu(){
            this.chexian=0;
            for(var i=0;i<this.gouli.length;i++){
                this.gouli[i].xuan=0;
            }
          
        },
     yao(){
          if(!this.chatUser) 
         {this.$message({type: 'warning', message: "请选择邀请对象"})
          return;}
          
          if(this.qunli=="")
          {this.$message({type: 'warning', message: "您暂时没有加入的群聊"})
          return;}
          if(this.yaoxian==0) this.yaoxian=1;
          if(this.xuqun=='选择群聊') 
         {this.$message({type: 'warning', message: "请选择群聊"})
          return;}
          
           if(this.yaoxian==1){
            var now=new Date();
            var day=now.toLocaleDateString();var time=now.toLocaleTimeString();
            var  a=day+"g"+time; var b=this.scon;
            var scha="";
            { var a1= (parseInt(a.substring(0,4))-parseInt(b.substring(0,4)))*365*24*3600;
            
            var b1=(parseInt(a.substring(5,7))-parseInt(b.substring(5,7)))*30*24*3600;
            var c1=(parseInt(a.substring(8,10))-parseInt(b.substring(8,10)))*24*3600;
            var d1=(parseInt(a.substring(11,13))-parseInt(b.substring(11,13)))*3600;
            var e1=(parseInt(a.substring(14,16))-parseInt(b.substring(14,16)))*60;
            var f1=(parseInt(a.substring(17,19))-parseInt(b.substring(17,19)));
           
            if(a1+b1+c1+d1+e1+f1>=300) scha= "1";
            else scha= "0";}
            this.contentList.push(
            {
						"fromw":this.userna,
            "tow":this.chatUser,
						"textType": "invite",
						// "headImgUrl": "/src/assets/"+this.userna+".jpg",
						"content": this.xuqun,
            "daya":day,
            "timea":time,
               "scha":scha,

					}
           )
           let message = {from: this.user.userna, to: this.chatUser, text: this.xuqun,textType:"invite",zho:1,day:day,time:time}
           socket.send(JSON.stringify(message));  
            this.xuqun=-1;
            this.yaoxian=0;
           }
          
        },
      send() {
       
        if (!this.chatUser) {
          this.$message({type: 'warning', message: "请选择聊天对象"})
          return;
        }
        if (!this.text) {
          this.$message({type: 'warning', message: "请输入内容"})
        } else {
          if (typeof (WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
          } else {
            console.log("您的浏览器支持WebSocket");
            // 组装待发送的消息 json
            // {"from": "zhang", "to": "admin", "text": "聊天文本"}
          var now=new Date();
            var day=now.toLocaleDateString();var time=now.toLocaleTimeString();
           
          var  a=day+"g"+time; var b=this.scon;
            var scha="";
            
           { var a1= (parseInt(a.substring(0,4))-parseInt(b.substring(0,4)))*365*24*3600;
            
       var b1=(parseInt(a.substring(5,7))-parseInt(b.substring(5,7)))*30*24*3600;
       var c1=(parseInt(a.substring(8,10))-parseInt(b.substring(8,10)))*24*3600;
       var d1=(parseInt(a.substring(11,13))-parseInt(b.substring(11,13)))*3600;
       var e1=(parseInt(a.substring(14,16))-parseInt(b.substring(14,16)))*60;
       var f1=(parseInt(a.substring(17,19))-parseInt(b.substring(17,19)));
      
       if(a1+b1+c1+d1+e1+f1>=300) scha= "1";
       else scha= "0";}
        
            let message = {from: this.userna, to: this.chatUser, text: this.text,textType:"text",zho:1,day:day,time:time}
            socket.send(JSON.stringify(message));  // 将组装好的json发送给服务端，由服务端进行转发
            this.messages.push({user:  this.userna, text: this.text})
            
            // 构建消息内容，本人消息
            this.gouli.push(
            {
              "xuan":0
            })

           // this.createContent(null, this.userna, this.text)
          
           this.contentList.push(
            {
						"fromw":this.userna,
            "tow":this.chatUser,
						"textType": "text",
						// "headImgUrl": "/src/assets/"+this.userna+".jpg",
						"content": this.text,
            "daya":day,
            "timea":time,
               "scha":scha,

					}
           )
          
         
            this.text = '';this.scon=mon+"g"+day;
          }
        }
      },
      createContent(remoteUser, nowUser, text) {  // 这个方法是用来将 json的聊天消息数据转换成 html的。
        let html
        // 当前用户消息
        if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
            
          html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
              "  <div class=\"el-col el-col-22\" style=\"text-align: right; padding-right: 10px;padding-top: 13px\">\n" +
              "    <div class=\"tip left\">" + text + "</div>\n" +
              "  </div>\n" +
              "  <div class=\"el-col el-col-2\">\n" +
              "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px;  line-height: 40px;\">\n" +
              "    < img src=\"/src/assets/不得不爱.jpg\" style=\"object-fit: cover;\">\n" +
              "  </span>\n" +
              "  </div>\n" +
              "</div>";
              
        } else if (remoteUser) {   // remoteUser表示远程用户聊天消息，蓝色的气泡
          html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
              "  <div class=\"el-col el-col-2\" style=\"text-align: right\">\n" +
              "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
              "    < img src=\"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png\" style=\"object-fit: cover;\">\n" +
              "  </span>\n" +
              "  </div>\n" +
              "  <div class=\"el-col el-col-22\" style=\"text-align: left; padding-left: 10px;padding-top: 13px\">\n" +
              "    <div class=\"tip right\">" + text + "</div>\n" +
              "  </div>\n" +
              "</div>";
        }
        console.log(html)
        this.content += html;
      },
        che(gouxu){
         
          //document.documentElement.style.setProperty('--mai',this.goucolor)
         if( this.gouli[gouxu].xuan==1) this.gouli[gouxu].xuan=0;
         else this.gouli[gouxu].xuan=1;
         
        }
,  chequ(){
  var now=new Date();
  var day=now.toLocaleDateString();var time=now.toLocaleTimeString();
  let message = {gouli:this.gouli,zho:3,to:this.chatUser ,day:day,time:time,}
  socket.send(JSON.stringify(message));
        this.chexian=0;
        
       },
      init() {
        
        this.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        let username = this.user.username;
                
                const res=this.$route.query.name;
    if(res!=null)
   username=res.toString();
this.userna=username;

        let _this = this;
        var fd=new FormData();
fd.append("manage",this.userna)
request.post("/user/getPhoto",fd).then(res=>{
  this.toux=res.data;
  
  
 });
        if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          console.log("您的浏览器支持WebSocket");
          let socketUrl = "wss://412c-58-194-169-164.ngrok-free.app/imserver/" + username;
          if (socket != null) {
            socket.close();
            socket = null;
          }
          // 开启一个websocket服务
          socket = new WebSocket(socketUrl);
          //打开事件
          socket.onopen = function () {
           // alert("websocket已打开");
          };
          //  浏览器端收消息，获得从服务端发送过来的文本消息
          socket.onmessage = function (msg) {
           // alert("收到数据====" + msg.data)
            let data = JSON.parse(msg.data)  // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
            if(data.al){
              if(data.al[0]=='加')
              ElMessage({
    message: data.ti,
    type: 'success',
    plain: true,
  })
  else  
              ElMessage({
    message: data.ti,
    type: 'warn',
    plain: true,
  })
            }
            if(data.qunli){
             
              _this.qunli=data.qunli;
              
            }
            if(data.ti){
            
              if(data.from==_this.userna){
              
           
              if(data.ti[0]=='已')
              {
              
                ElMessage({
    message: data.ti,
    type: 'success',
    plain: true,
  })
  
}
  else {
    
     ElMessage({
    message: data.ti,
    type: 'error',
    plain: true,
  })
  }
              
            }
              else if(data.from==_this.chatUser){
                
                ElMessage({
    message: data.ti,
    type: 'warn',
    plain: true,
  })
              }
            }
            if(data.contentList){
            
            _this.scon=data.contentList[data.contentList.length-1].daya+"g"+data.contentList[data.contentList.length-1].timea;
            _this.gouli=data.gou;
              _this.contentList=data.contentList;
              
            }
            else {
            if (data.users) {  // 获取在线人员信息
           
              _this.users = data.users.filter(user => user.username !== username)  // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
          
            } 
            if(data.text)
            {

             
             
              // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
              //  // {"from": "zhang", "text": "hello"}
              if (data.from == _this.chatUser) {
           
                _this.messages.push(data)
              
                _this.gouli.push(
            {
              "xuan":0
            }
          )
       
                // 构建消息内容
                //_this.createContent(data.from, null, data.text)
               
                if(data.text[0]!='/')

               { 
                
                _this.scon=data.daya+"g"+data.timea;
                _this.contentList.push(
            {
					   //	"id": this.id++,
						//"type": 1,
						"textType": "text",
						"headImgUrl": "/src/assets/"+data.juti+".jpg",
						"content": data.text,
            "daya":data.daya,
            "timea":data.timea,
            "scha":data.scha,
					}
           )}
           else{
         
            _this.contentList.push(
            {
						//"id": this.id++,
						//"type": 1,
            "fromw":this.userna,
						"textType": "image",
            "daya":data.daya,
            "timea":data.timea,
            "scha":data.scha,
						"headImgUrl": "/src/assets/"+data.from+".jpg",
						"content": "/src/zhong/"+this.id+".jpg",
					}
           )
           }
               
              }
            }
          }
          };
          //关闭事件
          socket.onclose = function () {
            console.log("websocket已关闭");
          };
          //发生了错误事件
          socket.onerror = function () {
            console.log("websocket发生了错误");
          }
        }
      }
    }
  }
  
  </script>
  <style>
     body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        padding: 20px;
    }

    .chat-container {
        display: flex;
        flex-direction: column;
        max-width: 600px;
        margin: 0 auto;
    }

    .chat-bubble {
        position: relative;
        padding: 10px 15px;
        border-radius: 10px;
        margin: 10px 0;
        max-width: 70%;
        line-height: 1.5;
    }

    .chat-bubble.left {
        text-align: left;
        
        left:30px;
        float: left;
        background-color: #e5e5ea;
        align-self: flex-start;
    }

    .chat-bubble.left::before {
        content: '';
        position: absolute;
        top: 15px;
        left: -10px;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-right-color: #e5e5ea;
        border-left: 0;
        border-top: 0;
        margin-top: -5px;
    }

    /* .chat-bubble.right {
        text-align: left;
        right:20px;
        display: inline-block;
        
        background-color: #007aff;
        color: white;
        align-self: flex-end;
    } */
    .chat-bubble.right {
       right:20px;
       text-align: left;
        float: right;
        background-color: #007aff;
        color: white;
        align-self: flex-end;
        max-width: 350px;
    }

    .chat-bubble.right::before {
        content: '';
        position: absolute;
        top: 15px;
        right: -10px;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-left-color: #007aff;
        border-right: 0;
        border-top: 0;
        margin-top: -5px;
    }
    .a{
      float: left;
      
       margin-left: 20px;
       height: 70px;
    object-fit: cover;
    border-radius: 10px;
    
    }
    .b{
        margin-right: 20px;
        float: right;
    height: 70px;
    object-fit: cover;
    border-radius: 10px;
    
    }
   
    .k{
        float: left;
      margin-left:20px;
      height: 50px;
      margin-top: -50px;
    }
    .j{
        float: right;
      margin-right:20px;
      height: 50px;
      margin-top: -50px;
    }
    .d{
        height:50px;
        width:50px;
        object-fit: cover;
        border-radius: 10px;
    }
    .zuo{
        font-size: 12px;
    }
    .title{
        font-size: 16px;
    }
    .e{
        float: right;
      margin-right:20px;
      height:70px;
    }
    .item {
  margin-top: 10px;
  margin-right: 40px;
  
}
.l{
  margin-top: 30px;margin-bottom: -70px;color:brown;
  font-style: italic;
  font-size:17px ;
}

.m{
  margin-top: 150px;margin-bottom: -70px;color:brown;
  font-style: italic;
  font-size:17px ;
}

  .u{
    width:40px;
      float: right;
      margin-top: 20px;
       margin-right: 20px;
       color:var(--mai)
   
    
    }
    .v{
    width:40px;
      float: right;
      margin-top: 20px;
       margin-right: 20px;
       color:blue
   
    
    }
    .zu{
      color:aqua
    }
  </style>
  <!-- 或许可以把每对人的对话存入一个表内，而不是混合起来，至于表名可以放入另一个表里存储，而且可以把每队人的对话放入多个表里，但感觉暂时没必要； -->