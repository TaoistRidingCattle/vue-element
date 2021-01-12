import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/util.css'
// import axios from 'axios'
// Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// axios.interceptors.request.use(config=>{
//   // 在发送请求之前做些什么
//   let token = localStorage.getItem('mytoken')
//     if (token) {
//         config.headers.authorization = token;
//     }
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });
Vue.config.productionTip = false
Vue.use(ElementUi)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
