import Vue from 'vue'
import App from './App.vue'
// 引入element-ui，
import ElementUi from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
// 使用插件
import components from '@/components'
// 导入router
import router from '@/router'
// 引入axios
import axios from '@/api/axios.js'
// 引入公共样式表上传图片样式表
import '@/styles/index.less'
Vue.use(components)
// 变成全局axios
Vue.prototype.axios = axios
// 在全局范围内注册组件
Vue.use(ElementUi)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
