import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import { resolve } from '../../node_modules/any-promise';

Vue.use(Vuex);

const store = new Vuex.Store({
  state : {
    user:{},
    userInfo: null,
    homeArticles:[],//显示在首页的第一个模块
    homeProseArticles: [],
    searchArticles:[],
    //记录分页每次新申请的八个数据
    fenyeArticles:[],
    page: 1,
    tags: ['js','css','html','prose'],
    oneCompleteArticle:{},
    articleId: null,
    token: null,
    allComments: []//谋篇文章的所有评论
  },
  getters: {
    getHomeMessage: function(state){
      var messages = {};
      for(let i = 0; i < 3; i++){
        var m = state.allArticles[i];
        messages[i] = m;
      }

      console.log(messages)
      return messages
    },

  },
  mutations: {
    // getM:function(state){
    //   console.log("start");
    //   axios.get('http://localhost:3030/getMessage.json').then(function(response){
    //     state.articles = response.data;
    //     console.log(state.articles);
    //     return state.articles
    //   })
    // },
    //   set_user: function(state,user){
    //     localStorage.setItem('name',user.name);
    //     state.user = user;
    //   },

    //设置用户是否登录
    setuser:function(state,info){
      localStorage.setItem('isLogin',info);
    },
    //设置文章信息
    setAllArticles:function(state,object){
      // state.allArticles = articles;
      // console.log(state.allArticles.length)

      //切记，这个articles是个数组
      //为了实现申请多少就从数据库里面拿多少，我对以下两个函数做了合并
      //我不知道我为什么要记录所有的数据
      //我暂时注释了记录所有数据的all
      console.log("执行mutation里面的setAllArticles")
      console.log(object.articles)
      if(object.obj.actions === 'nochange'){
        state.fenyeArticles = object.articles;
        state.page = object.obj.page;
      }
      // else if(!object.articles.length){
      //   alert('这是最后一页');
      // }
      else if(object.obj.actions === "next"){
        if(!object.articles.length){
          alert('这是最后一页');
        }else{
            state.fenyeArticles = object.articles;
            state.page++;
        }
      }else if(object.obj.actions === "pre"){

        state.fenyeArticles = object.articles;
        state.page--;
      }
      console.log(state.fenyeArticles)
      console.log("执行完毕mutation里面的setAllArticles")
    },
    // add_articles: (state, articles) => {
    //   state.articles = state.articles.concat(articles)
    // },
    // set_all_articles: (state, articles) => {
    //   state.articles = articles
    // },

    setHomeArticles: function(state,object){
      state.homeArticles = object.articles;
    },
    setHomeProseArticles: function(state,object){
      state.homeProseArticles = object.articles;
    },
    setOneArticle: function(state,article){
        state.oneCompleteArticle = article
    },
    setArticleId: function(state,id){
      state.articleId = id;
      console.log(state.articleId)
    },
    setToken: function(state,token){
      state.token = token;
    },
    setArticleComment: function(state,comments){
      //这里的comments传过来的参数是数组吗
      state.allComments = comments
    }
  },
  actions: {
    //设置用户是否登录
    setToken: function({commit},token){
      console.log("setToken");
      commit('setToken',token)
    },
    //发送邮件到后台接口
    sendEmail: function({commit},obj){
        console.log(obj);
        axios.post('http://localhost:3030/sendEmail',obj).catch((err) => { console.log(err) })
    },
    //发送登录信息到后台接口
    sendLogin: function({commit},obj){
        console.log("发送到后台的数据",obj);
        return axios.post('http://localhost:3030/sendLogin',obj);

    },
    //我未分页之前写的
    //建立文章数据  也就是state里面的articles
    // setAllArticles: function({commit}){
    //     console.log('调用了setArticles函数')
    //     axios.get("http://localhost:3030/getAllArticles").then((res) => {
    //       console.log(res.data)
    //       commit('setAllArticles',res.data)
    //     })
    // },

    //建立文章数据  也就是state里面的articles    通过传参不同来实现分页效果
    //setAllArticles({page: this.page,limit: 8})
    //显示首页的第二部分 this.setAllArticles({page: 1, limit: 2, actions: 'homeprose', tags: 'prose'})
    setAllArticles: function({commit},obj){
        console.log('调用了setAllArticles函数')
        //下面是如果是分页用来请求文章或者删除某一篇文章之后的刷新
        axios.get('http://localhost:3030/articles', {params: {obj}}).then((res) => {
          const object = {articles: res.data,obj : obj}
          if(object.obj.actions === 'homeprose'){
            commit('setHomeProseArticles',object)
          }else if(object.obj.actions === 'home'){//如果要显示首页的那三个文章信息
            commit('setHomeArticles',object)
          }else{//如果要删除文章的话
            //如果不是第一页被删除干净，那么自动跳转前一页
            if(res.data.length === 0 && object.obj.actions === 'nochange' && object.obj.page > 1){//如果删除之后只剩一页，所以最新获得的数据为空，那么自动跳转前一页
              console.log("进入这个判断了")
              //此处需要再重新申请一次之前的数据
              object.obj.page --;
              axios.get('http://localhost:3030/articles', {params: {obj}}).then((res) => {
                const object = {articles: res.data,obj : obj}
                object.obj.actions = "pre";
                commit('setAllArticles',object);
              })
            }else if(res.data.length === 0 && object.obj.actions === 'nochange' && object.obj.page === 1){
              //如果最后一条数据被删除了，那么就使表格为空
              console.log('进入第二个判断了')
              object.obj.actions = "nochange";
              //此处需要是文章列表显示为空
              axios.get('http://localhost:3030/articles', {params: {obj}}).then((res) => {
                const object = {articles: res.data,obj : obj}
                commit('setAllArticles',object);
              })
            }else{//如果是正常分页就正常设置数据  或者如果是查询用来请求参数的话，那么就
              console.log(res.data)
              commit('setAllArticles',object)
            }
          }
        })
        console.log('执行完毕setAllArticles函数')
    },

    //删除某篇文章
    // 我的：this.delArticle({_id: this.delete_id, page: this.delete_page, route: this.$route})
    delArticle: function({dispatch},obj){
      console.log('调用了delArticle函数')
      console.log(obj._id)
      return axios.get(
        'http://localhost:3030/articles/delArticles/' + obj._id,
        {
          headers: {
            'Authorization': 'Bearer ' + token,
          }
        }
      ).then((res) => {
          console.log(res.data)
      }).then((res) => {
        console.log("执行了then")
        if (obj.route.name === 'articles') dispatch('setAllArticles', {page: obj.page, limit: obj.limit, actions: 'nochange'})
      }).then((res) => {
        alert("删除成功");
      })
    },

    //从后台调用一篇文章的信息
    getOneArticle({commit,dispatch,state},id){
      console.log('调用了getOneArticle函数');
      console.log("文章id：",id);
      if(id){
        console.log("有id")
        return axios.get('http://localhost:3030/articles/getOneArticle/' + id).then((res) => {
              console.log("从后台获取文章信息",res.data);
              // commit('setOneArticle',res.data);
              // var info = JSON.parse(res.data);
              var info = JSON.stringify(res.data);
              localStorage.setItem("articleInfo",info)
              var aa = localStorage.getItem("articleInfo");
              console.log("设置articleInfo完毕",aa);
          }).catch((err) => { console.log(err) })
        
      }else{
        // axios.get('http://localhost:3030/articles/getOneArticle/' + state.articleId).then((res) => {
        //   console.log(res.data);
        //   commit('setOneArticle',res.data);
        // }).catch((err) => { console.log(err) })
      }

    },

    //我不知道这个是否应该写在这里，但是如果不从state里面调用文章id，那么刷新的话就会出错，所以需要有一个全局存放id的地方
    //但是显然我的想法错了，我应该利用cookies之类的或者localStorage
    getArticleId({commit},id){
      console.log("调用了getArticleId函数");
      commit('setArticleId',id);
    },

    //保存一篇文章
    saveArticle({commit},obj){
      console.log('调用了saveArticle函数')
      return axios.post('http://localhost:3030/article/save',obj).then((res) => {
        // commit('saveArticle')
        alert(res.data);
      })
    },
    //得到某篇文章的所有的评论
    getArticleComment({commit},id){
      console.log('调用了getArticleComment');
      return axios.get('http://localhost:3030/article/comment' + id).then((res) => {
        console.log("后台传过来的所有的评论",res.data);
        commit('setArticleComment',res.data);
      })
    },
    //测试评论者是否邮箱唯一性
    testComment(obj){
      console.log('调用了testComment',obj);
      return Promise((resolve,reject) => {
        axios.post('http://localhost:3030/article/testComment',obj).then((res) => {
          console.log("验证成功");
        }).catch((err) => {
          alert(err);
        });
      })
    },
    //新建评论
    createComment({commit},obj){
      console.log("调用了createComment");
      return Promise((resolve,reject) => {
        axios.post('http://localhost:3030/article/createComment',obj).then((res) => {
          console.log("存储评论成功");
        }).catch((err) => {
          console.log(err);
        })
      }) 
    }
  }
});

export default store;
