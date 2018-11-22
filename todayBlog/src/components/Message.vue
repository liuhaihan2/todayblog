<template>
  <div class="container-fluid">
    <!--分类标签，点击下面的文章按分类显示-->
    <div class="row" style="margin-bottom: 80px;">
      <span style="color:#f5917b">分类标签:</span>
      <span
            class="label"
            v-for="(item,index) in tags"
            @click="setAllArticles({page: 1, limit: 8, tag: item, actions: 'nochange'})"
            style="margin-left:5px;background-color: #f5917b"
      >{{item}}</span>

    </div>

    <!--内容显示区域-->
    <!-- <div class="message row">
      <div class="col-md-3 article" v-for="(item,index) in fenyeArticles">
        <div class="articlechild">
          <span class="text-success">创建时间:{{item.date}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
          <span class="text-success"  ><span><i class="iconfont icon-huifu"></i>{{item.comment_n}}</span>
  评论人数</span>
          <h3 style="color:#f5917b">{{item.title}}</h3>
          <p class="text-success text-left">{{item.introduce}}</p>
          <img :src="item.src" alt="">
          <p class="text-muted text-left" style="width:90%;overflow:hidden;height:100px;margin:10px auto;display:block">{{item.txtcontent}}</p>
          <router-link :to="{name:'Complete', params:{_id: item._id,from: 'message'}}" tag="button" class="btn">更多</router-link>
        </div>
      </div>
    </div> -->
    <!-- 内容展示区域 瀑布流 -->
    <waterfall :line-gap = "200" :watch="fenyeArticles">
      <waterfall-slot
        v-for="(item,index) in fenyeArticles"
        :width="item.width"
        :height="item.height"
        :order="index"
        :key="item._id"
      >
        <div class="articlechild">
          <span class="text-success">创建时间:{{item.date}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
          <span class="text-success"  ><span><i class="iconfont icon-huifu"></i>{{item.comment_n}}</span>
  评论人数</span>
          <h3 style="color:#f5917b">{{item.title}}</h3>
          <p class="text-success text-left">{{item.introduce}}</p>
          <img :src="item.src" alt="">
          <p class="text-muted text-left" style="width:90%;overflow:hidden;height:100px;margin:10px auto;display:block">{{item.txtcontent}}</p>
          <router-link :to="{name:'Complete', params:{_id: item._id,from: 'message'}}" tag="button" class="btn">更多</router-link>
        </div>
      </waterfall-slot>
    </waterfall>

    <div class="row"><button class="btn more" >加载更多</button></div>

</div>

</template>

<script>
  import store from '@/store/index'
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
  import $ from 'jquery'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

    export default {
        name: "Message",
        data(){
          return {}
        },
        computed: {
          ...mapState(['fenyeArticles','tags'])
        },
        methods: {
          ...mapActions(['setAllArticles']),
          haha: function(){
              setTimeout(function(){
                var articles = $(".message").children(".article")
                   console.log(articles.length)
              },0)
            // this.$nextTick(function(){
            //   var articles = $(".message").children(".article")
            //   console.log(articles.length)
            // })
          },

        },
        created(){
          this.setAllArticles({page: 1, limit: 8,actions: 'nochange'})

        },
        mounted(){
          this.haha();
        },
        components: {
          Waterfall,
          WaterfallSlot
        },
        store

    }
</script>

<style scoped>
  .article{
    /*border:1px solid lightgray;*/
    padding:20px;
    border-radius:15px;
    overflow: hidden;
  }
  .articlechild{
    border:1px solid #f5917b;
    border-radius:12px;
    padding:20px;
  }
  .more{
    width:85%;
    margin:150px auto;
    display: block;
    height:80px;
    font-size:26px;
  }
  .btn{
    border:1px solid #f5917b;color:#f5917b;
    background-color: white;
  }
  .btn:hover{
    color:white;
    background-color: #f5917b;
    transition: 0.4s;

  }
</style>
