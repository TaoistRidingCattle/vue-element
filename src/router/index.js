import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('../views/Register.vue')
  }


]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next)=>{
  if(to.path==="/login") return next()
  if(to.path==="/register") return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
  
})
export default router