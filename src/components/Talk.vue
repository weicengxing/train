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
            <!-- <div style="height: 350px; overflow:auto; border-top: 1px solid #ccc" v-html="content"></div> -->
            <view class="content">
		<view v-for="(item,index) in conentList">
			<view v-if="item.type === 1" class="chartRow girlChart">
				<image class="headimg" v-if="item.type === 1" :src="item.headImgUrl" mode="widthFix"></image>
				<view class="imgBox" v-if="item.textType ==='image'">
					<image v-if="item.textType ==='image'" :src="item.content" mode="widthFix">
					</image>
				</view>
				<text class="text girlBackground" v-if="item.textType ==='text'">{{item.content}}</text>
			</view>
			<view v-else class="chartRow boyChart">
				<image class="headimg" v-if="item.type == 2" :src="item.headImgUrl" mode="widthFix">
				</image>
				<view class="imgBox" v-if="item.textType ==='image'">
					<image v-if="item.textType ==='image'" :src="item.content" mode="widthFix">
					</image>
				</view>
				<text class="text bodyBackground" v-if="item.textType ==='text'">{{item.content}}</text>
			</view>
		</view>

		
	</view>
      















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
						"content": "对呀，这都被你发现了，只是我爸妈不让我养.",
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
  .tip {
    color: white;
    text-align: center;
    border-radius: 10px;
    font-family: sans-serif;
    padding: 10px;
    width:auto;
    display:inline-block !important;
    display:inline;
  }
  .right {
    background-color: deepskyblue;
  }
  .left {
    background-color: forestgreen;
  }


  .content {
		width: 100%;
		height: 400px;
		overflow-x: hidden;
		overflow-y: auto;
		background-color: #eee;
	}

	.charRow {
		width: 100%;
		height: 200px;
		position: relative;
	}

	.headimg {
		width: 150px;
		height: 150px;
	}

	.text {
		font-size: 12px;
		
		display: table;
		height: 30px;
		max-width: 300px;
		padding: 3px 6px;
		line-height: 30px;
		border-radius: 4px;
		overflow-wrap: anywhere;
		text-align: left;
	}

	.bodyBackground::after {
		position: absolute;
		right: 10000px;
		top: 10px;
		content: '';
		border: 10px solid transparent;
		border-left-color: #9cda62;
	}

	.girlBackground::after {
		position: absolute;
		left: -18px;
		top: 10px;
		content: '';
		border: 10px solid transparent;
		border-right-color: white;
	}

	.imgBox {
		position: absolute;
		top: 0px;
		left: 160px;
		width: 100px;
		height: auto;
	}

	.girlChart {
		text-align: left;
		position: relative;
	}

	.boyChart {
		text-align: right;
		position: relative;
	}

	.girlBackground {
		background-color: white;
		border: 1px solid #eee;
		color: #000;
		position: relative;
		right: -50px;
		top: 50px;
    
	}

	.bodyBackground {
		background-color: #9cda62;
		border: 1px solid #eee;
		color: #000;
		position: relative;
		text-align: right;
		top: 50px;
    right: 50px;
    float: right;
	}

	.chart-foot {
		width: 100%;
		height: 100px;
		line-height: 100px;
		position: fixed;
		bottom: 0px;
		left: 0px;
		border: 1px solid #eee;
	}

	.inputText {
		text-align: left;
		width: 80%;
		height: 100px;
		float: left;
	}

	.btn {
		text-align: center;
		width: 10%;
		height: 100px;
		float: left;
	}
  </style>