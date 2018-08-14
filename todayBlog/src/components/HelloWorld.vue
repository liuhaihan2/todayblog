<template>
  <div class="hello">
    <div class="container">
      <!--下面是文章展示区域-->
      <h2>最近更新</h2>
      <div class="recentUpdate">
        <div class="article" v-for="(item,index) in homeArticles">
          <div class="article-item">
            <span class="text-success"><i class="iconfont icon-shijian"></i>&nbsp;&nbsp;{{getDate(item.date)}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
            <span class="text-success"  ><span><i class="iconfont icon-huifu"></i>&nbsp;&nbsp;{{item.comment_n}}</span>
  </span>
            <h3 style="color:lightseagreen">{{item.title}}</h3>
            <p class="text-muted text-left" style="width:90%;height:180px;overflow:hidden;margin:10px auto;display:block">{{item.txtcontent}}</p>
            <router-link
              :to="{name:'Complete', params:{_id: item._id,index: index},hash: '#complete'}"
              tag="button"
              class="btn">更多
            </router-link>
            <!--<button class="btn" @click="oneArticle(item._id)">更多</button>-->
          </div>
        </div>
        
      </div>
      <hr style="height:1px;border-top:1px dashed #dedfe4;">
      <h2>随笔散文</h2>
      <div class="recentUpdate" >
          <div v-for="(item,index) in homeProseArticles" class="col-md-6 prose">
            <h3 style="color:lightseagreen">{{item.title}}</h3>
            <p>{{item.introduce}}</p>
            <img :src="item.src" alt="prose">
            <p class="text-muted text-left content">{{item.txtcontent}}</p>
            <router-link
              :to="{name:'Complete', params:{_id: item._id,index: index}}"
              tag="button"
              class="btn">更多
            </router-link>
          </div>
      </div>
      <hr>
      <h2>联系我</h2>
      <div class="row contact" style="">
        <form role="form" style="" class="form-horizontal form">
          <!--<fieldset>-->
          <div class="form-group">
            <!--<div >-->
              <input type="text" class="form-control " placeholder="姓名" v-model="name" style="float:left; width:48%;padding-right:5px;display: inline-block">
            <!--</div>-->
            <!--<div style="width:50%;padding-left:5px;display: inline-block">-->
              <input type="text" class="form-control " placeholder="QQ或者微信" v-model="QW" style="float:right; width:48%;padding-right:5px;display: inline-block">
            <!--</div>-->
          </div>

          <!--</fieldset>-->
          <fieldset>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="邮件主题" v-model="subject">
            </div>
            <div class="from-group col-sm-1"></div>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="请填写邮箱地址" v-model="address">
            </div>
          </fieldset>
          <fieldset>
            <div class="form-group">

            </div>
            <div class="form-group">
              <textarea class="form-control" rows="9" placeholder="你想说啥" v-model="emailContent"></textarea>
            </div>
          </fieldset>
          <fieldset>
            <div class="form-group">
              <div class="form-group">

              </div>
              <button class="form-control btn" :disabled="sendFlag" @click="checkEmail" style="">{{sendFlag ? "正在提交" : "确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定"}}</button>
            </div>
          </fieldset>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store/index'
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
  import $ from 'jquery'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'welcome to my blog',
      sendFlag: false,
      name: null,
      QW: null,
      subject: null,
      address: null,
      emailContent: null,

    }
  },
  computed:{
    // ...mapGetters(['getHomeMessage'])
    ...mapState(['homeArticles','homeProseArticles']),
  },
  methods: {
    ...mapActions(['sendEmail','setAllArticles','getOneArticle']),
    // oneArticle: function(_id){
    //   console.log('调用了oneArticle函数')
    //   this.getOneArticle(_id);
    //   this.$router.push({name: 'Complete',params:{id:_id}});
    // },
    checkEmail: function(){
      console.log("调用了checkEmail");
      this.sendFlag = true;
      let ex = /^[\w-]+@[\w-]+(\.[\w-]+)*$/;
      if(!this.name || !this.QW || !this.subject || !this.address || !this.emailContent){
        alert("您还有信息没有填全");
        this.sendFlag = false;
      }else if(!ex.test(this.address)){
        alert("您的邮箱地址输入不正确");
        this.sendFlag = false;
      }else{
        this.sendFlag = true;
        this.sendEmail({
          name: this.name,
          QW: this.QW,
          subject: this.subject,
          address: this.address,
          emailContent: this.emailContent
        }).then(() => {
          this.name = '';
          this.QW = '';
          this.subject = '';
          this.address = '';
          this.emailContent = '';
          console.log("发送成功");
          this.sendFlag = false;
        }).catch(() => {
          this.sendFlag = false
          alert("对不起，邮件发送失败");
        })
      }

    },
    getDate: function(fullDate){
        console.log(typeof(fullDate))
        return fullDate.slice(0,10);
    }

  },
  created () {
    // this.getM();
    this.setAllArticles({page: 1, limit: 3,actions: 'home'})
    this.setAllArticles({page: 1, limit: 2, actions: 'homeprose', tag: 'prose'})
  },
  store
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.recentUpdate{
  display:flex;
  // border:1px solid black;
  justify-content: center; 
  width:100%;
}
.article{
  padding:10px;
  // border:1px solid red;
  flex-grow:1;
  flex-basis:30%
}
.article-item{
  border:1px solid lightseagreen;
  padding:20px;
    border-radius:12px;
    overflow: hidden;
}
h2{
  color:lightseagreen;
}
  .prose{
    border:1px solid lightseagreen;
    border-radius:12px;
    padding:20px;
    margin:10px;
    width:45%;
    p{
      // width:50px;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow: hidden;
    }
  }
  
  .contact{
    padding:30px;
    border:1px solid lightseagreen;
    border-radius: 25px;
    width:80%;
    margin:10px auto;
  }
  .form{
    /*border:1px solid black;*/
    width:90%;margin:10px auto
  }
  .form input,.form textarea{
    border:1px solid lightseagreen;
    border-radius: 6px;
  }
  .btn{
    border:1px solid lightseagreen;color:lightseagreen;
    background-color: white;
  }
  .btn:hover{
    color:white;
    background-color: lightseagreen;
    transition: 0.4s;

  }
</style>
