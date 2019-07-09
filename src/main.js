import Vue from 'vue'
import App from './App.vue'
// 引入element-ui，
import ElementUi from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入router
import router from '@/router'
// 在全局范围内注册组件
Vue.use(ElementUi)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
