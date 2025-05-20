<template>
	<div >
		<div v-for="(item,index) in conentList" >
			<!-- <view v-if="item.type === 1" class=" girlChart"> -->
				<!-- <image class="headimg" v-if="item.type === 1" :src="item.headImgUrl" mode="widthFix"></image>
				<view class="imgBox" v-if="item.textType ==='image'">
					<image v-if="item.textType ==='image'" :src="item.content" mode="widthFix">
					</image>
				</view> -->
				<div class=" text girlBackground" >{{item.content}}</div>
               
			<!-- </view> -->
			<!-- <view v-else class="chartRow boyChart">
				<image class="headimg" v-if="item.type == 2" :src="item.headImgUrl" mode="widthFix">
				</image>
				<view class="imgBox" v-if="item.textType ==='image'">
					<image v-if="item.textType ==='image'" :src="item.content" mode="widthFix">
					</image>
				</view>
				<text class="text bodyBackground" v-if="item.textType ==='text'">{{item.content}}</text>
               
			</view> -->
           <div>uu</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				"myTextArea": "",
				"conentList": [{
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
		onLoad() {

		},
		methods: {
			sendBoy: function() {
				let obj = {
					id: this.conentList.length + 1,
					"type": 1,
					"headImgUrl": "/static/boy.jpeg",
					"textType": "text",
					"content": this.myTextArea,
				}
				this.conentList.push(obj);
			},
			sendGril: function() {
				let obj = {
					id: this.conentList.length + 1,
					"type": 2,
					"headImgUrl": "/static/girl.jpeg",
					"textType": "text",
					"content": this.myTextArea,
				}
				this.conentList.push(obj);
			},
			inputHandle: function(e) {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 500px;
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
      //  padding-top: 15px;
		//font-size: 22px;
		//width: 500px;
		//display: table;
		//height: 30px;
		//max-width: 300px;
		//padding: 3px 6px;
        //padding-top: 5px;
		//line-height: 30px;
		border-radius: 4px;
		// overflow-wrap: anywhere;
		text-align: left;
        
	}

	.bodyBackground::after {
		position: absolute;
		right: -18px;
		top: 10px;
		content: '';
		border: 10px solid transparent;
		border-left-color: #9cda62;
	}

	.girlBackground::after {
       // padding-top: 5px;
		//position: absolute;
		//left: -18px;
		//top: 10px;
		//content: '';
		//border: 10px solid transparent;
		border-right-color: white;
	}

	.imgBox {
		position: absolute;
		top: 0px;
		left: 160px;
		width: 100%;
		height: auto;
	}

	.girlChart {
		text-align: right;
		position: relative;
	}

	.boyChart {
		text-align: left;
		position: relative;
	}

	.girlBackground {
		background-color: white;
		border: 1px solid #eee;
		color: #000;
		position: relative;
		right: 180px;
		top: 50px;
	}

	.bodyBackground {
		background-color: #9cda62;
		border: 1px solid #eee;
		color: #000;
		position: absolute;
		left: 100px;
		top: 50px;
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
    .i{
        margin-top: 50px;
    }
</style>