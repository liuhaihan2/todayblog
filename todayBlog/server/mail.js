const nodemailer = require('nodemailer');

//建立邮箱
//下面是设置你要用那个邮箱发送  发送者
let transporter = nodemailer.createTransport({
  service: 'QQ',
  auth: {
    user: '2565253161@qq.com',
    pass: 'cwtvozrmrcyqeaha'
  }
});
// mail.send('18843601932@qq.com','有人找你',html,content,)
exports.send = function(address,subject,html,res){
  var options = {
    from :'"我的公用邮箱："2565253161@qq.com',
    to:address,
    subject:subject,
    text:"hello guys",
    html:html
  }
  transporter.sendMail(options,function(error,info){
    console.log("调用sendMail")
    if(err){
      console.log("error");
      res.status(500).send("邮件发送失败");
    }else{
      console.log("Message sent: " + info.response);
    }
  })
}

// module.exports = sendMail;
//
// exports.send = function(to, subject, html, res) {
//   const mailOptions = {
//     from: '"博客小管家" <blogbutler@126.com>',
//     to : to,
//     subject : subject,
//     html : html
//   }
//
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error)
//       res.status(504).end("通知邮件发送失败")
//     } else {
//       console.log("Message sent: " + info.response)
//     }
//   })
// }


