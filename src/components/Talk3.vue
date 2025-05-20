<template>
    <div style="padding: 10px; margin-bottom: 50px">
      <el-row>
        <el-col :span="8">
          <el-card style="width: 100%; min-height: 300px; color: #333">
           <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc">在线用户<span style="font-size: 12px">（点击聊天气泡开始聊天）</span></div>
            <div style="padding: 10px 0" v-for="user in users" :key="user.username">
              <span>{{ user.username }}</span>
              <!-- <i class="el-icon-chat-dot-round" style="margin-left: 10px; font-size: 16px; cursor: pointer"
                 @click="chatUser = user.username"></i> -->
                 <el-icon  @click="chatUser = user.username"><ChatDotRound /></el-icon>
              <span style="font-size: 12px;color: limegreen; margin-left: 5px" v-if="user.username === chatUser">chatting...</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="16">
        <div style="width: 800px; margin: 0 auto; background-color: white;
                    border-radius: 5px; box-shadow: 0 0 10px #ccc">
          <div style="text-align: center; line-height: 50px;">
            Web聊天室（{{ chatUser }}）
          </div>
          <div style="height: 350px; overflow:auto; border-top: 1px solid #ccc" >
          <div v-for="(item,index) in conentList" class="chat-container" >
         
            <img src="/src/assets/1.jpg" width="70px" class="a" v-if="item.type==1">
            <div class="chat-bubble left" v-if="item.type==1">
                
        {{ item.content }}
            </div>
            <p style="padding-top: 72px;"></p>
            <img src="/src/assets/2.jpg" width="70px" class="b" v-if="item.type==2">
            <div class="chat-bubble right" v-if="item.type==2">
                
        {{ item.content }}
            </div>
        </div>

      
          <p style="margin-top: 72px;"></p>
            <img src="/src/assets/2.jpg" width="70px" class="b" >
            <div class="chat-bubble right" >
              {{ "io" }}
            
        </div>
        <p style="padding-top: 72px;"></p>
            <img src="/src/assets/2.jpg" width="70px" class="b" >
            <div class="chat-bubble right" >
              {{ "io" }}
            
        </div>
          </div>






          <div style="height: 200px">
            <textarea v-model="text" style="height: 160px; width: 100%; padding: 20px; border: none; border-top: 1px solid #ccc;
             border-bottom: 1px solid #ccc; outline: none"></textarea>
            <div style="text-align: right; padding-right: 10px">
              <el-button type="primary" size="mini" @click="send">发送</el-button>
            </div>
          </div>
        </div>
      </el-col>
      </el-row>
    </div>
  </template>
  <script>
  import request from "@/utils/request";
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
        text: "",
        messages: [],
        content: '',
        userna:'',
        conentList: [{
						"id": 1,
						"type": 1,
						"headImgUrl": "/static/boy.jpeg",
						"textType": "text",
						"content": "看你朋友圈，你应该很喜欢养小动物吧！",
					},
					{
						"id": 2,
						"type": 2,
						"textType": "text",
						"headImgUrl": "/static/girl.jpeg",
						"content": "对呀，这都被你发现了，只是我爸妈不让我养.对呀，这都被你发现了，只是我爸妈不让我养.",
					},
					{
						"id": 3,
						"type": 1,
						"textType": "text",
						"headImgUrl": "/static/boy.jpeg",
						"content": "把你的兴趣给剥夺了，我之前养过一只萨摩，去年送给朋友了。",
					},
					{
						"id": 4,
						"type": 2,
						"textType": "text",
						"headImgUrl": "/static/girl.jpeg",
						"content": "你也喜欢养宠物啊?",
					},
					{
						"id": 5,
						"type": 1,
						"textType": "text",
						"headImgUrl": "/static/boy.jpeg",
						"content": "是啊，猜我现在养的啥?",
					},
					{
						"id": 6,
						"type": 2,
						"textType": "text",
						"headImgUrl": "/static/girl.jpeg",
						"content": "小猫?",
					},
					{
						"id": 7,
						"type": 1,
						"textType": "text",
						"headImgUrl": "/static/boy.jpeg",
						"content": "不对，养了一只小仓鼠",
					},
					{
						"id": 8,
						"type": 1,
						"textType": "image",
						"headImgUrl": "/static/boy.jpeg",
						"content": "/static/cangshu.jpg",
					},
					{
						"id": 9,
						"type": 2,
						"textType": "text",
						"headImgUrl": "/static/girl.jpeg",
						"content": "真的好可爱啊",
					},
					{
						"id": 10,
						"type": 2,
						"textType": "text",
						"headImgUrl": "/static/girl.jpeg",
						"content": "看的我也想养一只",
					}, {
						"id": 11,
						"type": 1,
						"textType": "text",
						"headImgUrl": "/static/boy.jpeg",
						"content": "要不我送你一只好啦",
					},
					{
						"id": 12,
						"type": 2,
						"textType": "text",
						"headImgUrl": "/static/girl.jpeg",
						"content": "真的吗？",
					}
				]
      }
    },
    created() {
      this.init()
    },
    methods: {
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
            let message = {from:  this.userna, to: this.chatUser, text: this.text}
            socket.send(JSON.stringify(message));  // 将组装好的json发送给服务端，由服务端进行转发
            this.messages.push({user:  this.userna, text: this.text})
            // 构建消息内容，本人消息
           
            this.createContent(null, this.userna, this.text)
           
            this.text = '';
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
      init() {
        this.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        let username = this.user.username;
                
                const res=this.$route.query.name;
    if(res!=null)
   username=res.toString();
this.userna=username;
        let _this = this;
        if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          console.log("您的浏览器支持WebSocket");
          let socketUrl = "ws://localhost:8888/imserver/" + username;
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
            if (data.users) {  // 获取在线人员信息
              _this.users = data.users.filter(user => user.username !== username)  // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
            } else {
              // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
              //  // {"from": "zhang", "text": "hello"}
              if (data.from === _this.chatUser) {
                _this.messages.push(data)
                // 构建消息内容
                _this.createContent(data.from, null, data.text)
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
        top:-70px;
        left:30px;
        display: inline-block;
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
        float: right;
        background-color: #007aff;
        color: white;
        align-self: flex-end;
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
       display: inline-block;
       margin-top: 10px;
       margin-left: -60px;
    }
    .b{
       
        float: right;
    
       
    }
  </style>