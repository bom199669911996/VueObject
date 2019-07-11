import Vue from 'vue'
// 导入vue-router
import VueRouter from 'vue-router'
// 导入login组件
import login from '@/views/login/login.vue'
// 注册为全局
Vue.use(VueRouter)
// 配置路由规则
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: login }

  ]
})
// 导出router
export default router
