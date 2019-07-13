
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
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'

})
// 添加请求拦截器
// 在axios请求之前，获取token，设置在头部
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config--请求配置对象
  const user = window.sessionStorage.getItem('mytoken')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  // 创建promise对象 new promise（）的可能失败可能成功
  // promise.resolve()创建一个成功的promise
  //  Promise.reject()创建一个失败的promise
  //  Promise.resolve()创建一个成功的promise
  return Promise.reject(error)
})
// 添加响应拦截器
// 当服务端token失效，此时去请求接口，401错误---即token失效
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  // 如果响应状态码是401 拦截到登录页面
  // console.log(error.response)
  if (error.response.status === 401) {
    // hash是location提供的获取操作，地址栏的#后的地址属性
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
