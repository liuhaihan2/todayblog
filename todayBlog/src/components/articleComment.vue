<template>
  <div>
    <div class="newComment">
      <textarea name="newComment" cols="30" rows="10" placeholder="评论这篇文章" v-model="content"></textarea>
      <input type="text" placeholder="昵称" v-model="nickName">
      <input type="text" placeholder="电子邮箱" v-model="address">
      <button @click="submmitComment">提交评论</button>
      <!-- TODO: 提交之后按钮禁止点击 -->
    </div>
    <div class="allComment">
      <!-- 评论按照时间顺序来，倒序 -->
      <!-- 站长评论在左边，普通评论在右边 -->
      <!-- TODO: less -->
      <div :class="item.address === '2565253161@qq.com'?bossComment:comment" v-for="(item,index) in allComments">
        <!-- 游客评论 -->
        <div class="userComment">
              <!-- 头像 -->
              <div class="portrait">
                <img :src="'.././assets/' + imgName +'.png'" alt="head-portrait">
              </div>
              <!-- 昵称 创建时间 -->
              <div class="userInfo">
                <span>{{item.nickName}}</span>
                <span>{{item.time}}</span>
              </div>
              <!-- 评论内容 -->
              <div class="content">
                <p>{{item.content}}</p>
              </div>
              <button class="reply" @click="replyComment(index)">回复</button>
              <div class="replyDialog" v-if="showReplyDialog">
                <input type="text" v-model="nickName" placeholder="昵称">
                <input type="text" v-model="address" placeholder="电子邮箱">
                <textarea name="content"  cols="20" rows="5" placeholder="回复内容" v-model="content"></textarea>
                <button @click="submmitComment">提交评论</button>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store/index'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import $ from 'jquery'
import axios from 'axios'

export default {
  data(){
    return {
      content: "",//评论内容
      nickName: null,//发布评论里面的 昵称
      address: null,//发布评论里面的 邮箱地址
      imgName: "visitor",
      showReplyDialog: false,
    }
  },
  prop: ["articleId"]
  ,
  computed: {
    ...mapState(['allComments'])
  },
  methods: {
    ...mapActions(['getArticleComment','createComment']),//TODO:创建createComment函数
    //可以试验一下async函数
    submmitComment(){
      this.showReplyDialog = false;
      //判断是否都填入正确
      const reg = /^[\w_-]+@[\w_-]+\.[\w\\.]+$/
      if(!this.nickName || !this.content || !this.address){
        alert("还有数据没有填")
      }else if(!re.test(this.address)){
        alert("请输入正确的邮箱地址")
      }else if(this.content.length > 500){
        alert("评论过长");
      }else if(this.content.length < 5){
        alert("评论过短");
      }else{
        //先验证用户是否唯一,其实就是验证邮箱
        this.testComment({nickName: this.nickName,address: this.address}).then(() => {
            //整理评论数据
            let newComment = {
              articleId: this.articleId,//被评论文章
              content: this.content,//评论内容
              address: this.address,//评论者的邮箱地址
              nickName: this.nickName,//评论者的昵称
              portraitSrc: 'visitor',//评论者头像  可以先设置一个假的
            }
            //发新评论给后台
            this.createComment(newComment).then(() => {
              this.getArticleComment(this.articleId);
            })
        })
        
      }
      
    },
    replyComment(index){
      this.showReplyDialog = true;
      this.content = "@" + this.allComments[index].nickName + ":" + this.nickName + "回复了您的评论";
      //测试下面的模板字符串
      this.content = `@${this.allComments[index].nickName}:${this.nickName}回复了您的评论`;
    }
  },
  created () {
    this.getArticleComment(this.articleId);
    //如果不是我登录，那么头像就显示的是游客
    if(localStorage.token){
      this.imgName = "me"
    }
  },
  store
  
}
</script>
<style scope lang="less">
.allComment{
  .bossComment{
    float: left;
  }
  .comment{
    float: right;
  }
}
</style>


