const jwt = require("jsonwebtoken");
const secret = require("../config").jwt;

const confirmation = (req,res,next) => {
  console.log("执行了confirmation");
  if(!req.headers.authorization){
    console.log("没有authorzation");
    res.status(401).end('no token')
  }else{
    //输出一下req.headers.authorization  前面应该是beard
    console.log(req.headers.authorization);
    const token = req.headers.authorization.splite(" ")[1];
    jwt.verify(token,secret,function(err){
        if(err){
          console.log("err存在");
          res.status(401).end('error token')
        }else{
          next();
        }
    });
  }

}

module.exports = confirmation;