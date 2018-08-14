<template>
    <div class="container">
      <div class="row">
        <h1>{{oneCompleteArticle.title}}</h1>
        <p style="margin-top:30px;"><i class="iconfont icon-shijian"></i>{{date}}</p>
        <img :src="oneCompleteArticle.src" alt="">
      </div>
      <div class="row">
        <p class="articleIntroduce text-muted">{{oneCompleteArticle.introduce}}</p>
        <div class="articleContent text-left" v-html="oneCompleteArticle.txtcontent"></div>
      </div>
      <div class="list">
        <span><a id="back-to-top" @click="goTop"><i class="iconfont icon-huojian" style="font-size:60px;"></i> </a> </span>
        <span><a class="goHome" href="javascript:;" @click="goHome"><i class="iconfont icon-fanhui" style="font-size:60px;"></i></a></span>
      </div>
    </div>
</template>

<script>
  import store from '@/store/index'
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
  import $ from 'jquery'
  import axios from 'axios'
  

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
            date: null
          }
        },
        computed: {
          ...mapState(['oneCompleteArticle'])
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
          // this.getOneArticle(this.id);
          //我做出来的修改
          this.getOneArticle(this.id).then(function(res){
              console.log(res);
              var oneCompleteArticle = localStorage.setItem("completeArticle",res)
              console.log(oneCompleteArticle)
              dispatch('getArticleId',oneCompleteArticle)
              this.date = this.oneCompleteArticle.date.slice(0,10);


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
