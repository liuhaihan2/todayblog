<template>

  <!-- <form role="form" class="form-horizontal " id="form1">
    <fieldset>
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
  </form> -->
  <div id="editor">

  </div>




</template>

<script>
  import  '../../assets/js/highlight.pack.js'
  import WangEditor from 'wangeditor'
  import axios from 'axios'
  import store from '@/store/index'
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
  import hljs from 'highlight.js'

 $(function(){
          $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
          });
  

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
        mounted() {
            var editor = new WangEditor("#editor");
            editor.customConfig.menus = [
                'head',
                'bold',
                'italic',
                'underline',
                'foreColor',
                'image', 
                'code', 
                'undo', 
                'fontSize',  // 字号
            ]
            editor.create()
        },
        created(){
         
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
@import '../../assets/css/github.css';
  button{
  width:100px;
  display:inline-block;
  /* float:bottom; */
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
  #editor{
    border:1px solid mediumpurple;
    text-align: left;
  }
</style>
