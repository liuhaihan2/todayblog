<template>
  <div>
    <div class="newComment">
      <textarea name="newComment" cols="30" rows="10" placeholder="评论这篇文章"></textarea>
      <input type="text" placeholder="昵称" v-model="nickName">
      <input type="text" placeholder="电子邮箱" v-model="address">
      <button>提交评论</button>
    </div>
    <div class="allComment">
      <!-- 评论按照时间顺序来，倒序 -->
      <!-- 站长评论在左边，普通评论在右边 -->
      <!-- TODO: less -->
      <div :class="item.address === '2565253161@qq.com'?bossComment:comment" v-for="(item,index) in allComments">
        <!-- 如果是一条回复评论，显示，回复目标的基本信息 -->
        <div class="replyItem" v-if="item.replyItem">
              <!-- 昵称 创建时间 -->
              <div>
                <span>回复{{item.replyItem.nickName}}于{{item.replyItem.time}}创建的评论</span>
              </div>
              <!-- 评论内容 -->
              <div>
                <!-- css设置，只显示一行其他用省略号 -->
                <p>{{item.replyItem.content}}</p>
              </div>
        </div>
        <!-- 游客评论 -->
        <div class="userComment">
              <!-- 头像 -->
              <div class="portrait">
                <img :src="item.portraitSrc" alt="head-portrait">
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 评论的逻辑：
// 	文章展示页面，点击文章，传参到文章详情页
// 	params: {id: article.aid, index: index, page: page}
// 	文章详情页的组成，文章具体内容，文章评论
// 	文章内容easy，文章编辑用wangEditor,修改样式，上传图片,文章内容显示，代码高亮
// 	文章评论没想好，创建文章页面的时候，通过articleid获取相对应的评论
// 		怎么显示他们
// 		文章评论界面也是两个部分， newComment 和 allComment
// 		newComment 就是新建，类似于一个表单，但是不要form,提交之后检验是按钮禁用
// 			校验需要有一个加载的标识，弄一个dialog，因为检验中代码禁用，所以只要错误的时候
// 			显示dialog，有插件。
// 			检验成功之后调用action的submitComment方法，调用后台/api/comment接口去保存这个评论
// 			他的逻辑是，新建评论的时候就填写用户姓名和邮箱，我严重觉得他的头像是假的
// 						然后想后台发送，判断用户名是否被别人用过了，鉴别用户是用邮箱
// 						用户名不重复，正常情况下会想站长发送邮件通知是谁对文章进行了评论
// 						用户名不重复，还有一个情况就是站长回复了某个人的评论，此时会给这个
// 						评论者发送邮件告知他站长回复了他的评论
// 						但是我觉得他还是缺少了一个判断条件
// 						在站长回复评论的时候，站长就不需要收到邮件了。
// 						也就是说所有人评论的时候，站长都要收到一个告知邮件，
// 						但是我觉得站长在给别人回复的时候，就不需要收到邮件了
// 		allComment 就是显示全部评论，v-for comments comments在created调用getAllComments获取全部
// 	必须要有用户名，没有更好的办法，你发布评论，没有点赞了

// 	属于站长回复的评论都有属性 replyItem
// 	站长可以回复所有人的评论，但是所有人都只能回复站长的评论
// 站长的评论会在左边  其余在右边
//想明白了写明回复是那一条，正常按照时间顺序加载
  import store from '@/store/index'
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
  import $ from 'jquery'
  import axios from 'axios'

export default {
  data(){
    return {
      allComments: null,//包括属性： portraitSrc  nickName  time content replyItem
      //TODO: 从后台获得这篇文章所有的评论 
            //调用 actions  getArticleComment
            //调用后台接口：getArticleComment  根据articleId在comments表里面寻找所有文章评论并返回
            //getArticleComment.then  在state.allComments存所有的评论
      articleId: null,
      nickName: null,//发布评论里面的 昵称
      address: null,//发布评论里面的 邮箱地址
    }
  },
  prop: [""]
  ,
  methods: {
    ...mapActions(['getArticleComment'])
  },
  created () {
    this.getArticleComment();
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


