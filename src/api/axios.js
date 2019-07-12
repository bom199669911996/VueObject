
// // axios 配置的默认值/defaults
// // 基准路径
// axios.defaults.baseURL = `http://ttapi.research.itcast.cn/mp/v1_0/`
// // 请求头
// axios.defaults.headers = {
//   // 保存token token需要认证的字段 值：需要加上 'Bearer '
//   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('mytoken')).token
// }

// Vue.prototype.axios = axios

// 自定义实例默认值
// aixos的提取与封装

// // 引入axios
import axios from 'axios'
// 创建实例时设置配置的默认值
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  headers: {
    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('mytoken')).token
  }
})
export default instance
