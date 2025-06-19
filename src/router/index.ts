import { createRouter, createWebHistory } from "vue-router";
//路由表
const routes = [
  //当路由为空时，重定向到登录页面
  {
    path: "/",
    redirect: "/login",
  },
  //登录页面
  {
    path: "/login",
    name: "C",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/cai",
    name: "Cai",
    component: () => import("../components/HelloWorld.vue"),
  },
  {
    path: "/Tab",
    name: "Ca",
    component: () => import("../components/Ni.vue"),
  },
   {
    path: "/Dayu",
    name: "Cao",
    component: () => import("../components/Table5.vue"),
  },
  {
    path: "/Da",
    name: "Da",
    component: () => import("../components/Da.vue"),

  },
  {
    path: "/Ni",
    name: "Ni",
    component: () => import("../components/Ni.vue"),
  },
  {
    path: "/Gei",
    name: "Gei",
    component: () => import("../components/Gei.vue"),
  },
  {
    path: "/Tu",
    name: "Tu",
    component: () => import("../components/Tu.vue"),
  },
  {
    path: "/Tu1",
    name: "Tu1",
    component: () => import("../components/Tu1.vue"),
  },
  {
    path: "/Wu",
    name: "Wu",
    component: () => import("../components/Wu.vue"),
  },
  {
    path: "/Zhu",
    name: "Zhu",
    component: () => import("../components/Zhu.vue"),
  },
  {
    path: "/Lu",
    name: "Lu",
    component: () => import("../components/Luxi.vue"),
  },
  {
    path: "/juti",
    name: "juti",
    component: () => import("../components/juti.vue"),
  },
  {
    path: "/Zu",
    name: "Zu",
    component: () => import("../components/Zu.vue"),
  },
  {
    path: "/Di",
    name: "Di",
    component: () => import("../components/Dingdan.vue"),
  },
  {
    path: "/uti",
    name: "uti",
    component: () => import("../components/Jutiding.vue"),
  },
  {
    path: "/Ghu",
    name: "Ghu",
    component: () => import("../components/Gzhu.vue"),
  },
  {
    path: "/Gde",
    name: "Gde",
    component: () => import("../components/Gdet.vue"),
  },
  {
    path: "/Zhan",
    name: "Zhan",
    component: () => import("../components/Zhan.vue"),
  },
  {
    path: "/Gfee",
    name: "Gfee",
    component: () => import("../components/Gfee.vue"),
  },
  {
    path: "/Jiaz",
    name: "Jiaz",
    component: () => import("../components/Jiaz.vue"),
  },
  {
    path: "/Yong",
    name: "yong",
    component: () => import("../components/Yong.vue"),
  },
  {
    path: "/Gaixi",
    name: "Gaixi",
    component: () => import("../components/Gaixi.vue"),
  },
  {
    path: "/Jiaxi",
    name: "Jiaxi",
    component: () => import("../components/Jiaxi.vue"),
  },
  {
    path: "/Wel",
    name: "Wel",
    component: () => import("../components/Welcome.vue"),
  },
  {
    path: "/Zhuan",
    name: "zhuan",
    component: () => import("../components/Zhuan.vue"),
  },
  {
    path: "/Ce",
    name: "ce2",
    component: () => import("../components/Ces3.vue"),
    children:[
      {
        path:"/Jiaxi",
        component: () => import("../components/Zhu.vue"),

      }
    ]
  },
  {
    path: "/Cmv",
    name: "Cmv",
    component: () => import("../components/Ces8.vue"),
   
  },
  {
    path: "/Talk",
    name: "Talk",
    component: () => import("../components/Talk4.vue"),
   
  },
  // 小说阅读器路由 - 直接使用NovelReader组件
  
  // 小说阅读器演示路由 - 使用示例组件（包含数据传递）
  
  {
    path: "/novel-simple",
    name: "NovelSimple",
    component: () => import("../components/NovelSimple.vue"),
  },
   {
    path: "/ques",
    name: "ques",
    component: () => import("../components/Ques.vue"),
  },{
    path: "/ques2",
    name: "ques",
    component: () => import("../components/chat.vue"),
  },
  {
    path: '/auto-login',
    name: 'AutoLogin',
    component: () => import('../views/AutoLogin.vue')
  }, 
  
];
//路由创建
const router = createRouter({
  history: createWebHistory(),
  routes,
});
//路由导出
export default router;
