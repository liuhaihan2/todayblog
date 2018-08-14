<template>

  <form role="form" class="form-horizontal " id="form1">
    <fieldset>
      <!--文章题目--><!--一句话介绍-->
      <div class="form-group">
        <label class="col-sm-2 control-label" for="title">文章名:</label>
        <div class="col-sm-4">
          <input class="form-control" id="title" type="text" placeholder="文章名" v-model="title">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label" for="introduce">简要介绍:</label>
        <div class="col-sm-4">
          <input class="form-control" id="introduce" type="text" placeholder="一句话介绍你的文章" v-model="introduce">
        </div>
      </div>
    </fieldset>
    <fieldset>
      <!--tag复选按钮  内容-->
      <div class="form-group">
        <label class="col-sm-2 control-label">选择文章类型:</label>
        <div class="checkbox checkbox-success checkbox-inline col-md-1" id="tags" v-for="(item,index) in tags">
          <input type="checkbox" :id="item" class="styled" name="tags" :value="item" @click="tagAdd(item)">
          <label :for="item">{{item}}</label>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label" for="content">内容:</label>
        <div class="col-md-8" id="content">
          <script id="ueditor" type="text/plain" name="content">

          </script>
        </div>
      </div>
    </fieldset>
    <fieldset>
      <button type="reset" class="btn">重置</button>
      <button :disabled="sendFlag" @click="save" class="btn">
        {{sendFlag ? "正在提交" : "保存文章"}}
      </button>
    </fieldset>
  </form>




</template>

<script>
  import '../../../static/public/ueditor/ueditor.config';
  import '../../../static/public/ueditor/ueditor.all.min.js';
  import '../../../static/public/ueditor/lang/zh-cn/zh-cn';
  import axios from 'axios'
  import store from '@/store/index'
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'

    export default {
        name: "user",
        data(){
          return {
            title: null,
            introduce: null,
            tag: [],
            content: null,
            // date: new Date().getFullYear(),
            sendFlag: false,
            ue:null
          }
        },
        computed:{
          ...mapState(['tags'])
        },
        mounted () {
            const _this = this;
            this.ue = UE.getEditor('ueditor', { BaseUrl: '',
              UEDITOR_HOME_URL: 'static/public/ueditor/',
              toolbars: [
                ['fullscreen', 'source', 'undo', 'redo'],
                [
                  'bold','insertcode', 'fontfamily', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc'
                ]
              ]
            })
          this.ue.ready(function(){
            _this.ue.setHeight(400)
            var html = '<p>你好</p>'
            _this.ue.setContent(html)
          })
            // console.log(this.ue.setHeight)
            // ue.UE.ready(function(){
            //   console.log('ue已经准备好')
            //   ue.setContent("你好")
            // })
          // this.ue.addListener("ready", function () {
          //   this.ue.setHeight(1000); // 确保UE加载完成后，放入内容。
          // });
        },
        methods: {
          ...mapActions(['saveArticle']),
          save: function(){
            console.log("调用了save");
            if(!this.tag || !this.title || !this.introduce || !this.ue.getContent ){
              alert("任何选项不能为空");
              this.sendFlag = false;
              return null;
            }else{
              this.sendFlag = true;
              var obj = {};
              obj.tags = this.tag;
              obj.title = this.title;
              obj.introduce = this.introduce;
              obj.content = this.ue.getContent();
              obj.txtcontent = this.ue.getPlainTxt();
              console.log(obj);
              this.saveArticle(obj).then((res) => {
                document.getElementById("form1").reset();
                var html = '<p>你好</p>'
                this.ue.setContent(html)
                this.sendFlag = false;
              });
            }
          },
          tagAdd(item){
            this.tag.push(item)
          }
        },
      store
    }
</script>

<style scoped>
  button{
  width:100px;
  display:inline-block;
  float:bottom;
}

  .btn{
    border:1px solid mediumpurple;color:mediumpurple;
    background-color: white;
  }
  .btn:hover{
    color:white;
    background-color: mediumpurple;
    transition: 0.4s;

  }
  .form-group input{
    border:1px solid mediumpurple;
  }
</style>
