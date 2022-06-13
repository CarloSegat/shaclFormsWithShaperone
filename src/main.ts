import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './cefrielForm'

// createApp(App).mount('#app')

import Home from "./views/Ml.vue";
import About from "./views/Sw.vue";

const routes = [
  { 
    path: '/ml', 
    component: Home, 
    name: "Home" 
  },
  { 
    path: '/sw',
    component: About, 
    name: "About" 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

const app = createApp(App).use(router).mount('#app')
