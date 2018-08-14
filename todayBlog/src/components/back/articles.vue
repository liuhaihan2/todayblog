<template>
  <div>
    <div class="input-group col-md-6 col-md-offset-3" style="margin-bottom:50px; position:relative">
      <input type="text" class="form-control"placeholder="文章名" v-model="text">
      <span class="input-group-btn">
               <button class="btn btn-info btn-search"@click="search()">搜索</button>
      </span>
    </div>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>文章标题</th>
        <th>创建日期</th>
        <th>评论条数</th>
        <th>分类标签</th>
        <th>操作文章</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="item in fenyeArticles">
          <router-link :to="{name:'Complete', params:{_id: item._id,from: 'manage'}}" tag="td">{{item.title}}</router-link>
          <td>{{item.date}}</td>
          <td>{{item.comment_n}}</td>
          <td>{{item.tags}}</td>
          <td>
            <router-link to="edit" tag="i" class="iconfont icon-biji-copy"></router-link>
            <i class="iconfont icon-shanchu" @click="deleteId(item._id,page)"
               data-toggle="modal" data-target="#myModal"></i>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn-group btn btn-info" @click="prePage(page)">上一页</button>
    <button class="btn-group btn">{{page}}</button>
    <button class="btn-group btn btn-info" @click="nextPage(page)">下一页</button>
    <!--弹出框-->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-body">你确定要删除吗</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">按错了</button>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" @click="deleteArticle">删除</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>
  </div>
</template>

<script>
  import store from '@/store/index'
  import {mapState,mapActions} from 'vuex';
    export default {
        name: "articles",
        data(){
          return {
            delete : false,
            delete_id: null,
            delete_page: null,
            text: null,

          }
        },
        computed: {
          ...mapState(['fenyeArticles','page'])
        },
        created(){
          this.setAllArticles({page: 1, limit: 8,actions: "nochange"})
          // var info = localStorage.getItem('isLogin')
          // console.log(info)
          // if(!info){
          //   console.log("为什么不进入判断")
          //   this.$router.push({name:'Login'})
          // }
          // console.log("断掉了吗");
        },
        methods: {
          ...mapActions(['delArticle','setAllArticles','searchArticles']),
          nextPage (page) {
            page ++;
            this.setAllArticles({page: page, limit: 8,actions: "next"})
          },
          prePage (page) {
            if (!(page - 1)) {
              alert('这就是第一页')
            } else {
              page--
              this.setAllArticles({page: page, limit: 8,actions: 'pre'})
            }
          },
          deleteId(id,page){
            this.delete_id = id;
            this.delete_page = page
            console.log(this.delete_id)
            console.log(this.delete_page)
          },
          deleteArticle: function(){
            console.log(this.delete_id)
            this.delArticle({_id: this.delete_id, page: this.delete_page, limit: 8, route: this.$route})
          },
          search: function(){
            this.setAllArticles({title: this.text, page: 1, limit: 3,actions: 'nochange'})
          }
        },
      store,

    }
</script>

<style scoped>

</style>
