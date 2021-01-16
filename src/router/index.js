import Vue from 'vue'
import VueRouter from 'vue-router'
import request from '../api/request.js'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {

  return originalPush.call(this, location).catch((err) => err);

};
const routes = [{
    path: '/home',
    component: () => import('../views/Home.vue'),
    redirect: '/welcome',
    children: [{
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
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/Login.vue'),
    beforeEnter: function (to, from, next) {
      const token = window.localStorage.getItem('token')
      if (!token) return next()
      async function created() {
        let res = await request.get("/");
        if (res.data.code === 1) {
          window.localStorage.removeItem('token')
          next();
        }
        if (res.data.code === 2) {
          window.localStorage.removeItem('token')
          next();
        }
        if (res.data.code === 0) {
          next(from.path);
        }
      }
      created()

    }
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('../views/Register.vue')
  },
  {
    path: '*',
    name: 'NoFondPage',
    component: () => import('../components/NoFound.vue')
  }


]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next()
  if (to.path === "/register") return next()

  const token = window.localStorage.getItem('token')
  if (!token) return next('/login')
  async function created() {
    let res = await request.get("/");
    if (res.data.code === 1) {
      window.localStorage.removeItem('token')
      router.push("/login");
    }
    if (res.data.code === 2) {
      window.localStorage.removeItem('token')
      router.push("/login");
    }
    if (res.data.code === 0) {
      localStorage.setItem('currentIndex',to.path)
      next();
    }
  }
  created()

  // next()
})


export default router