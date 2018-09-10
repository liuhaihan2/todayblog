const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data')
//连接数据库
 mongoose.connect('mongodb://localhost/my-blog');
 var db = mongoose.connection;
db.on('error',console.error.bind(console,'Database connection error.'));
db.once('open', () => {
  console.log('The database has connected.')
  init();
});


//创建Schema
//文章集合
var  articleSchema = new Schema({
  aid: Number,
  title: String,
  date: Date,
  src: String,
  content: String,
  txtcontent: String,
  tags: [String],//{ type: [String], index: true } // 内部索引{ type : Number, index: { unique: true } }
  comment_n: Number,
  introduce: String
})
//评论集合
var commentSchema = new Schema({
  articleId: Number,//被评论文章
  content: String,//评论内容
  address: String,//评论者的邮箱地址
  nickName: String,//评论者的昵称
  createTime: Date,//评论的创建时间
  portraitSrc: String,//评论者头像  可以先设置一个假的
  replyItem: String,//如果是一条回复评论，这个就是回复的对象
  //这个不对，逻辑不对
})
//用户结合
var userSchema = new Schema({
  name: String,
  password: String
})

//创建model
// 创建集合总集方便暴露
const Modules = {
  article: mongoose.model('article',articleSchema),
  comment: mongoose.model('comment',commentSchema),
  user: mongoose.model('user',userSchema)
}

//创建初始化函数
const init = () => {
  console.log("正在进行初始化");

  Modules.article.find((err,doc) => {
    if(err){
      console.log(err)
    }else if(!doc.length){
      console.log('文章数据库里面没有文档')
      Promise.all(data.map((item) => {
        //把data.json的数据全部插入数据库
        new Modules.article(item).save();

      })).then((res) => {
        console.log("插入文章成功")
      })
    }else{
      console.log('文章列表的长度：' + doc.length)
    }
  })

  Modules.user.find((err,doc) => {
    if(err){
      console.log(err);
      console.log('init failed')
    }else if(!doc.length){
      //判断为第一次登陆
      console.log('主人第一次登陆')
      //创建master用户
      new Modules.user({
        name: "Liuhaihan",
        password: '123456'
      }).save();
      console.log("此处不可以Modules[user],必须是Modules.user,不然会说user undefined")
      //问题来了，如何把所有文章插入数据库呢？
      //需要一个json文件来放要插入的数据
      //把所有文章插入数据库

    }else{
      console.log("用户表长度：" + doc.length)
      console.log("初始化完成")


    }
  })
}

//暴露集合总集接口
module.exports = Modules;






