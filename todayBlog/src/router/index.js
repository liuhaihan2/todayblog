import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import articles from '@/components/back/articles'

const Index = () => import('@/components/Index')
const HelloWorld = () => import('@/components/HelloWorld')
const Message = () => import('@/components/Message')
const Habit = () => import('@/components/Habit')
const Connect = () => import('@/components/Connect')
const Login = () => import('@/components/Login')
const Complete = () => import('@/components/Complete')
const manage = () => import('@/components/back/manage')
// const articles = () => import('@/components/back/articles')
const create = () => import('@/components/back/create')




Vue.use(Router)

const router = new Router({//wode
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: 'home',
      children:[
        {path:'home',name: 'HelloWorld',component: HelloWorld,meta: {title: '首页'}},
        {path: 'message',name: 'Message',component: Message,meta: {title: '文章'}},
        {path: 'habit',name: 'Habit',component: Habit,meta: {title: '爱好'}},
        {path: 'connect',name: 'Connect',component: Connect,meta: {title: '关于我'}}
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
      meta: {title: '登录'}
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      redirect: articles,
      meta:{requireAuth: true,title: '管理员页面'},
      children:[
        {path:'articles',name: 'articles',component: articles,meta:{requireAuth: true,title:'所有文章'}},
        {path:'create',name: 'create',component: create,meta:{requireAuth: true,title:'创建文章'}},
      ]
    }
  ]
})

router.beforeEach((to,from,next) => {
  document.title = to.meta.title;
  console.log("判断用户是否登录");
  if(to.matched.some(record => record.meta.requireAuth)){
      if(!localStorage.token && to.name !== 'Login'){
        next({name: 'Login'});
      }else if(localStorage.token && to.name === 'Login'){
        console.log('不应该再显示login')
        next({name: 'Index'});
      }else{
        next();
      }
  }else{
    if(localStorage.token && to.name === 'Login'){
      next({name: 'manage'});
    }else{
      next();
    }
  }
})

export default router


