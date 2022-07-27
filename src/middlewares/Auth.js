const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const token = req.headers.token;
  jwt.verify(token, 'secretKey', function(err, data) {
    if(err){
      res.status(400).json({status: "auth failed", data:err});
    }else{
      let email = data.data;
      req.headers.email = email;
      next();
    }
  });
}
