const jwt = require("jsonwebtoken");
const secret = require("../config").cert;

const confirmation (req,res,next){
  if(!req.headers.authorization){
    res.status(401).end('no token')
  }else{
    //输出一下req.headers.authorization  前面应该是beard
    const token = req.headers.authorization.splite(" ")[1];
    jwt.verify(token,secret,function(err){
        if(err){
          res.status(401).end('error token')
        }
    });
  }

  next();
}

module.exports = confirmation;