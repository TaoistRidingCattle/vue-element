import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articleCenter:{
      id:0,
        menuName:'文章中心',
        icon:'el-icon-tickets',
        subMenuList:[
          {
            id:0,
            menuName:'文章列表',
            path:'/articleList'
          },
          {
            id:1,
            menuName:'创建文章',
            path:'/createArticle'
          }
        ]
    },
    menuList:[
      {
        id:1,
        menuName:'口碑管理',
        icon:'el-icon-menu',
        path:'/publicPraise'
      },
      {
        id:2,
        menuName:'发布口碑',
        icon:'el-icon-document',
        path:'/pushpublicPraise'
      },
      {
        id:3,
        menuName:'素材管理',
        icon:'el-icon-picture',
        path:'/data',
      },
      {
        id:4,
        menuName:'评论管理',
        icon:'el-icon-s-comment',
        path:'/reviews'
      },
      {
        id:5,
        menuName:'个人设置',
        icon:'el-icon-s-comment',
        path:'/selfsetting'
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
