
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mail = require('./mail.js');
const db = require('./db.js');
const path = require('path');
const ueditor = require("ueditor")
const confirmation = require("../server/middle")
const jwt = require("jsonwebtoken");
const secret = require("../config").jwt;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {

  // ueditor 客户发起上传图片请求
  if(req.query.action === 'uploadimage'){
    var foo = req.ueditor;
    var date = new Date();
    var imgname = req.ueditor.filename;

    var img_url = '/images/ueditor/';
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
  }//  客户端发起图片列表请求
  else if (req.query.action === 'listimage'){
    var dir_url = 'your img_dir'; // 要展示给客户端的文件夹路径
    res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
  }
// 客户端发起其它请求
  else {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/ueditor.config.json')
  }}));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//发送邮件
app.post('/sendEmail',function(req,res){
  console.log("我是服务器，我收到你的请求啦");
  console.log(req.body);
  var html = ` <div style="border:1px solid orangered;width:300px;height:400px;">
    <p style="color:yellowgreen">主题：${req.body.subject}</p>
    <p style="color:mediumvioletred">内容：${req.body.emailContent}</p>
    <p style="color:dodgerblue">对方的邮箱地址：${req.body.address}</p>
  </div>`
  mail.send('18843601932@qq.com','有人找你',html,res)
  //现在我得到了前面传过来的数据，我要怎么使用呢？
  //问题是我要怎么发邮件啊
  //问题解决：要从mail.js里面的方法sendMail()
  //用node的发送邮箱插件nodemailer
})


//获取前端所需要的文章
//从数据库获取所有文章,现在我要改造她，让她变成你想从数据库取出来多少文章才取出来多少文章
app.get('/articles',function(req,res){
  console.log('调用了后台的/articles的接口');
  // axios.get('/api/articles', {params: {obj}})
  //不能再像下面这样简单了
  // db.article.find((err,doc) => {
  //   if(err){
  //     console.log(err);
  //   }else{
  //     res.json(doc);
  //   }
  // })
  //要根据params来判断到底从数据库获哪段文章信息，其实这就是分页的根本实现原因
  //console.log(req.body);//看看会输出什么，不出意外的话是obj这个对象
  //现在又了params就不能像上面那样获取参数了
  console.log(req.query.obj);
  const obj = JSON.parse(req.query.obj);
  const page = obj.page
  // const value = req.query.payload.value
  const limit = obj.limit - 0 || 4
  const skip = limit * (page - 1 );
  // const title = obj.title;
  if(obj.tag){
    db.article.find({tags: obj.tag}).sort({date:-1}).limit(limit).skip(skip).exec().then((articles) => {
      res.send(articles)
    })
  }else if (obj.title) {
    db.article.find({title: obj.title}).sort({date: -1}).limit(limit).skip(skip).exec().then((articles) => {
        res.send(articles)
    })
  } else {
    db.article.find().sort({date: -1}).limit(limit).skip(skip).exec().then((articles) => {
      res.send(articles)
    })
  }
})

//删除某篇文章
//axios.delete('http://localhost:3030/articles/delArticles' + obj._id)
app.get('/articles/delArticles/:_id',confirmation,function(req,res){
  console.log('调用了后台的articles/delArticles')
  db.article.remove({_id: req.params._id}, (err, data) => {
    if (err) {
      console.log(err)
    }
    res.send(data)
    // else {
    //   db.Comment.remove({articleId: req.params.aid}, (err, data) => {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       res.status(200).send('succeed in deleting ---' + data)
    //     }
    //   })
    // }
  })
})

//得到一篇文章
app.get('/articles/getOneArticle/:id',function(req,res){
  console.log("调用了后台得到一篇文章的接口");
  // const obj = JSON.parse(req.query.obj);
  // console.log(req.params)
  db.article.findOne({_id: req.params.id},(err, doc) => {
    if (err) {
      console.log(err)
    } else {
      console.log("得到的这篇文章：",doc)
      res.status(200).json(doc)
    }
  })
})

//保存某一篇文章
app.post('/article/save',function(req,res){
  console.log('调用了article/save接口')
  console.log(req.body);
  const article = {
    comment_n: 0,
    title: req.body.title,
    content: req.body.content,
    date: Date(),
    tags: req.body.tags,
    introduce: req.body.introduce
  }
  new db.article(article).save()
  res.status(200).send('成功保存新文章')
})
//创建token
const createToken = (id,name) => {
  return jwt.sign({
    id,
    name
  },secret.cert,{expiresIn: '7d'});//expiresIn 授权时限 60*60*24就是24小时
}
//登录
app.post('/sendLogin',function(req,res){
  console.log("调用了后台的/sendLogin的路由回调函数");
  console.log(req.body.name);
    db.user.findOne({name: req.body.name},function(err,doc){
      console.log('进入判断')
      if(err){
        console.log(err);
        res.status(403).send('没有访问权限');
      }else if(doc){
         if(doc.password === '123456'){
           console.log('hi,old friend')
           const token = createToken(doc._id,doc.name);
           var info = {
            name: doc.name,
            id: doc._id,
            token
          };
          console.log("token",info);
           res.status(200).send(info)
         }
      }else{
        console.log("用户列表里没有您")
        res.status(403).send('没有访问权限');
      }
    })
  console.log("判断结束")
})
//获取谋篇文章的所有评论
app.get('article/comment',function(req,res){
  console.log('调用了后台的article/comment接口',req.params.id);
  db.comment.find({articleId: req.params.id},'nikeName createTime content portraitSrc').exec().then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    res.status(400).send("查询失败");
  })
})
//新建评论,并邮件通知我
app.get('article/createComment',function(req,res){
  console.log('调用了后台的article/createComment接口',req.body.nickName);
  let comment = {
    nickName: req.body.nickName,
    address: req.body.address,
    content: req.body.content,
    createTime: new Date(),
    portraitSrc: 'visitor',
    articleId: req.body.articleId
  }
  new db.comment(comment).save().then(()=>{
    let reg = /^@(.+):/;
    //如果是回复性评论
    if(reg.test(comment.content)){
        const replyItem = reg.exec(comment)[1];//TODO: 测试是否能得到replyItem昵称
        mail.send('18843601932@qq.com','有人找你',html,res)
    }
  });
})
//验证  一个邮箱不能注册两个评论者
app.post('/article/testComment',function(req,res){
  console.log('调用了后台的/article/testComment接口',req.body.nickName);
  db.comment.findOne({nickName: req.body.nickName, articleId: req.body.articleId},(err,doc) => {
    if(doc && doc.address !== req.body.address){
        res.status(403).send("换一个昵称吧");
    }else if(!doc || doc.address === req.body.address){
        res.status(200);
    }
  })
})

app.listen(3030);
console.log("success");
