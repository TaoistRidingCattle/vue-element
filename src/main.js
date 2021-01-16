import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/util.css'
import '@/style/iconfont/iconfont.css'
import request from '@/api/request.js'
import {mapState,mapMutations,mapActions,mapGetters}from 'vuex'
Vue.prototype.$http = request
Vue.config.productionTip = false
Vue.use(ElementUi)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
