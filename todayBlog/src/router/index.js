import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import HelloWorld from '@/components/HelloWorld'
import Message from '@/components/Message'
import Habit from '@/components/Habit'
import Connect from '@/components/Connect'
import Login from '@/components/Login'
import Complete from '@/components/Complete'
import manage from '@/components/back/manage'
import articles from '@/components/back/articles'
import create from '@/components/back/create'


Vue.use(Router)

export default new Router({//wode
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: 'home',
      children:[
        {path:'home',name: HelloWorld,component: HelloWorld,meta: {title: '首页'}},
        {path: 'message',name: Message,component: Message,meta: {title: '文章'}},
        {path: 'habit',name: Habit,component: Habit,meta: {title: '爱好'}},
        {path: 'connect',name: Connect,component: Connect,meta: {title: '关于我'}}
      ]
    },
    {
      path: '/complete',
      name: 'Complete',
      component: Complete,
      title: '完整的文章'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      title: '登录'
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      redirect: articles,
      title: '管理员页面',
      children:[
        {path:'articles',name: 'articles',component: articles,meta:{title:'所有文章'}},
        {path:'create',name: 'create',component: create,meta:{title:'创建文章'}},
        // {path:'search',name:'search',component:search,mata:{title:'搜索'}}
      ]
    }
  ]
})
