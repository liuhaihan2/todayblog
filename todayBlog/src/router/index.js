import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
// import Index from '@/components/Index'
// import HelloWorld from '@/components/HelloWorld'
// import Message from '@/components/Message'
// import Habit from '@/components/Habit'
// import Connect from '@/components/Connect'
// import Login from '@/components/Login'
// import Complete from '@/components/Complete'
// import manage from '@/components/back/manage'
// import articles from '@/components/back/articles'
// import create from '@/components/back/create'
const Index = () => import('@/components/Index')
const Message = () => import('@/components/Message')
const Habit = () => import('@/components/Habit')
const Connect = () => import('@/components/Connect')
const Login = () => import('@/components/Login')
const Complete = () => import('@/components/Complete')
const manage = () => import('@/components/manage')
const articles = () => import('@/components/articles')
const create = () => import('@/components/create')




Vue.use(Router)

const router = new Router({//wode
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
        {path:'articles',name: 'articles',component: articles,meta:{requireAuth: true,title:'所有文章'}},
        {path:'create',name: 'create',component: create,meta:{requireAuth: true,title:'创建文章'}},
      ]
    }
  ]
})

//这里注意不要死循环，如果你要去的页面就是login，那么如果继续next({name : "login"})，就会陷入死循环
//我原来的页面判断在manage里面，在localStorage里面设置了一个setUser的flag来判断是否应该显示manage界面
//回去试一下，看好不好使
router.beforeEach((to,form,next) => {
  document.title = to.meta.title;
  //我家里的电脑还没有提交，我忘记这个token我存在哪里了，如果在state里面名字我也忘了
  //那登出的时候是不是要清空token
  if(store.state.token && to.name === "login"){
      next({name : 'manage'});
  }else if(!store.state.token && to.meta.requireAuth){
      next({name : 'login'});
  }else{
      next();
  }
})

export default router


