import { createRouter, createWebHistory } from 'vue-router'

import PartnerView from "../components/Login.vue"
import CustomerView from "../components/Zhuan.vue"


const routes = [
  {
    path: "/",
   
    
    redirect: "/login",
  },
  {
    path: "/login",
    name: "partner",
    component: PartnerView,
  },
  {
    path: '/customer',
    name: 'customer',
    component: CustomerView
  },
  {
    path: '/ce',
    name: 'ce',
    component: import("../components/Main.vue"),
  }
 
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router