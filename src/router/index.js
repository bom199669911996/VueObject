import Vue from 'vue'
// 导入vue-router
import VueRouter from 'vue-router'
// 导入login组件
import login from '@/views/login/login.vue'
// 导入home组件
import Home from '@/views/home/home.vue'
// 导入welcome组件
import Welcome from '@/views/welcome/welcome.vue'
// 引入wrong组件
import Wrong from '@/views/wrong/wrong.vue'
// 引入article样式
import Content from '@/views/content/content.vue'
// 引入images样式
import Images from '@/views/images/images.vue'
// 注册为全局
Vue.use(VueRouter)
// 配置路由规则
// 利用vue-router的全局前置守卫=====完成拦截操作
const router = new VueRouter({

  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/',
      name: 'home',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/content', name: 'content', component: Content },
        { path: '/images', name: 'images', component: Images }
      ]
    },
    // 当请求一个路径，去匹配你定义好的路由规则，如果没有对应的规则，此时认为是404请求
    // 匹配的过程是根据路由规则的顺序，一个一个去匹配。
    { path: '*', name: '404', component: Wrong }
  ]
})
router.beforeEach((to, from, next) => {
  // 如果不去主动的触发 resolve（next 下一步） 会一直等待
  // 获取登录信息
  const users = window.sessionStorage.getItem('mytoken')
  // 如果是登录页面直接放行
  // if (to.path === '/login') return next()
  // // 如果有登录信息，即跳转到目标路由，没有则跳回登录页面
  // if (users) {
  //   next()
  // } else {
  //   next('/login')
  // }
  // 简化写法
  if (!users && to.path !== '/login') return next('/login')
  next()
})
// 导出router
export default router
