<template>
	<div class="nav">
		<ul>
			<li v-for="item in NavList" class="nav-item" @click="clickNav($event)">
				<div>
					<img class="nav-icon" :src="item.icon" width="20px" height="20px" alt="sy" />
					<router-link :to="item.url">{{item.title}}</router-link>
				</div>
			</li>
		</ul>
		<div class="nav-img-box" style="margin-top: 108px;">
			<img src="@/assets/2.jpg" alt="zs" />
		</div>
	</div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import { Delete } from '@element-plus/icons-vue'
var NavList = reactive([
	{
		title: "合作伙伴",
		url: "/customer",
		icon: "src/assets/1.jpg",
	},
	{
		title: "客户列表",
		url: "/customer",
		icon: "src/assets/1.jpg"
	},
	{
		title: "订单列表",
		url: "/Jiaxi",
		icon: "src/assets/1.jpg"
    },
	{
		title: "物料列表",
		url: "/Jiaxi",
		icon: "src/assets/1.jpg"
    },
	{
		title: "成员管理",
		url: "/Jiaxi",
		icon: "src/assets/1.jpg"
	},
	{
		title: "收益概览",
		url: "/Jiaxi",
		icon: "src/assets/1.jpg"
	},
	{
		title: "价格配置",
		url: "/Jiaxi",
		icon: "src/assets/1.jpg"
	},
	{
		title: "系统设置",
		url: "/Jiaxi",
		icon: "src/assets/1.jpg"
	}
])
function clickNav(e) {
	// var domList = e.currentTarget.parentNode.children
	// for(let d=0;d<domList.length;d++){
	// 	domList[d].className = 'nav-item'
	// }
	// console.log('点击',e.currentTarget)
	// e.currentTarget.className = 'nav-item isclick'
	
}
</script>

<style scoped>
	li {
		list-style-type: none;
	}

	a {
		text-decoration: none;
		color: #39475A;
	}

	.nav {
		width: 200px;
		height: 100%;
		background: #FFFFFF;
		box-shadow: 3px 0px 6px 0px rgba(82, 82, 82, 0.14);
	}

	.nav ul {
		margin-top: 32px;
		padding: 0;
	}

	.nav-item {
		width: 200px;
		height: 46px;
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: #39475A;
		letter-spacing: 0;
		line-height: 46px;
		font-weight: 500;
	}

	.nav-item div {
		margin-left: 17px;
		height: 46px;
		line-height: 46px;
	}

	.nav-item div img {
		width: 20px;
		height: 20px;
	}

	.nav-icon {
		vertical-align: middle;
		margin-right: 7px;
		padding-bottom: 6px;

	}

	.isclick {
		background: #e9feff;
		color: #0bbfbc;
	}

	.nav-img-box img {
		width: 200px;
		height: 416px;
	}
</style>