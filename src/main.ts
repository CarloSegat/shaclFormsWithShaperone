import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './cefrielForm'

// createApp(App).mount('#app')

import Ml from "./views/Ml.vue";
import Sw from "./views/Sw.vue";

const routes = [
  { 
    path: '/ml', 
    component: Ml, 
    name: "Home" 
  },
  { 
    path: '/sw',
    component: Sw, 
    name: "About" 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

const app = createApp(App).use(router).mount('#app')
