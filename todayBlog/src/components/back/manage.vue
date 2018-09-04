<template>
    <div class="manage" style="height:500px;">
      <nav>
        <ul class="nav nav-pills nav-stacked">
          <router-link to="/manage/articles" tag="li"><i class="iconfont icon-biji-copy"></i>所有文章</router-link>
          <router-link to="/manage/create" tag="li"><i class="iconfont icon-draft"></i>创建文章</router-link>
        </ul>
      </nav>

      <button @click="goHome" class="btn">返回主页</button>
      <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <router-view style="float:left;width:70%;margin-left:100px;"></router-view>
      </transition>
    </div>
</template>

<script>
  import store from '@/store/index'
  import {mapState,mapActions} from 'vuex'
    export default {
        name: "manage",
        computed:{
          ...mapState(['user'])
        },
        methods: {
          ...mapActions(['setuser']),
          goHome: function(){
            this.setuser("comeout");
            console.log(localStorage.getItem('isLogin'))
            this.$router.push({name:'Index'})
          }
        },
        created(){
  
        },
      store
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
ul{
  float:left;
  border-right:1px solid mediumseagreen;
  width:100px;
  li{
    margin:20px;
    margin-left:0px;
    border-bottom:1px solid mediumseagreen;
  }
}

</style>
