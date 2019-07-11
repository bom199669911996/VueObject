import Vue from 'vue'
// 导入vue-router
import VueRouter from 'vue-router'
// 导入login组件
import login from '@/views/login/login.vue'
// 导入home组件
import Home from '@/views/home/home.vue'
// 导入welcome组件
import Welcome from '@/views/welcome/welcome.vue'
// 注册为全局
Vue.use(VueRouter)
// 配置路由规则
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/',
      name: 'home',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    }

  ]
})
// 导出router
export default router
