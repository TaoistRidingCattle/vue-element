import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    redirect:'/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcomePage',
        component: () => import('../components/welcome.vue')
      },
      {
        path: '/articleList',
        name: 'articleListPage',
        component: () => import('../components/Article.vue')
      },
      {
        path: '/createArticle',
        name: 'createArticlePage',
        component: () => import('../components/CreateArticle.vue')
      },
      {
        path: '/publicPraise',
        name: 'publicPraisePage',
        component: () => import('../components/PublicPraise.vue')
      },
      {
        path: '/pushPublicPraise',
        name: 'pushPublicPraisePage',
        component: () => import('../components/PushPublicPraise.vue')
      },
      {
        path: '/data',
        name: 'dataPage',
        component: () => import('../components/Data.vue')
      },
      {
        path: '/reviews',
        name: 'reviewsPage',
        component: () => import('../components/Reviews.vue')
      },
      {
        path: '/selfsetting',
        name: 'selfSettingPage',
        component: () => import('../components/SelfSetting.vue')
      },
      {
        path: '*',
        name: '404',
        component: () => import('../components/NoFound.vue')
      }
    ]
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
  },
  {
    path: '*',
    name: '404',
    component: () => import('../components/NoFound.vue')
  }


]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next()
  if (to.path === "/register") return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  else
    next()

})
export default router