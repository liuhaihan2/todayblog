<template>
    <div class="container">
      <div class="row">
        <h1>{{articleInfo.title}}</h1>
        <p style="margin-top:30px;"><i class="iconfont icon-shijian"></i>{{date}}</p>
        <img :src="articleInfo.src" alt="">
      </div>
      <div class="row">
        <p class="articleIntroduce text-muted">{{articleInfo.introduce}}</p>
        <div class="articleContent text-left" v-html="articleInfo.txtcontent"></div>
      </div>
      <div class="list">
        <span><a id="back-to-top" @click="goTop"><i class="iconfont icon-huojian" style="font-size:60px;"></i> </a> </span>
        <span><a class="goHome" href="javascript:;" @click="goHome"><i class="iconfont icon-fanhui" style="font-size:60px;"></i></a></span>
      </div>
      <!-- 评论 -->
      <article-Comment :articleId="id"></article-Comment>
    </div>
</template>

<script>
  import store from '@/store/index'
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
  import $ from 'jquery'
  import axios from 'axios'
  import articleComment from 'articleComment'
  

  $(function(){
    $(window).scroll(function(){
      if($(window).scrollTop() >= 10){
        $("#back-to-top").fadeIn();
      }else{
        $("#back-to-top").fadeOut();
      }
    })
  })

    export default {
        name: "Complete",
        data(){
          return {
            id: this.$route.params._id,
            from: this.$route.params.from,
            date: null,
            articleInfo:null
          }
        },
        computed: {
          ...mapState(['oneCompleteArticle'])
        },
        components: {
          articleComment,
        },
        methods: {
          ...mapActions(['getOneArticle']),
          goHome: function(){
            if(this.from === 'manage'){
              console.log('来自manage')
              this.$router.push({name:'manage'})
            }else if(this.from === 'message'){
              console.log('来自message');
              this.$router.push({path:'message'})
            }else{
              this.$router.push({name: 'Index'});
            }
          },
          goTop: function(){
            $('html').animate({scrollTop:0},500)
          }
        },
        created(){
          var self = this;
          console.log(self.id)
          this.getOneArticle(self.id)//这里存在了本地
          .then(function(){
              self.articleInfo = JSON.parse(localStorage.getItem("articleInfo"));
              self.date = self.articleInfo.date.slice(0,10);
          })
          console.log(this.$route.params.from)
        },
        store
    }

</script>

<style  scoped>
.articleContent{
  width:80%;
  margin:30px auto;
  font-size: 16px;
  line-height: 2em;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif;
}
  .articleIntroduce{
    margin-top:20px;
    font-size:20px;
  }
  .list{
    position:fixed;
    /*display:none;*/
    bottom:100px;
    right:80px;
    /*border:1px solid black*/
  }
  .list span{
    display: block;

  }
 #back-to-top{
   display:none;
 }
  .list a{
    text-decoration: none;
    color:forestgreen;

  }
  .list a:hover{
    color:limegreen;
    transition: 0.7s;
  }


</style>
