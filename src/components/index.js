// vue.use(插件)
// 目的，批量的全局注册组件，use的使用
import MyBread from '@/components/my-bread.vue'
// 封装成插件的形式 Vue.use(插件) 执行插件的配置对象中install函数 且传入Vue对象
export default {
  install (Vue) {
    // 住册所有的组件在vue下
    Vue.component(MyBread.name, MyBread)
  }
}
