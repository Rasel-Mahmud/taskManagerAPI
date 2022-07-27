const UserDataModel = require('./../models/UserModel');
const jwt = require('jsonwebtoken');

// Registration
exports.registration = (req, res) => {
  const userData = req.body;
  UserDataModel.create(userData, (err) => {
    if(err){
      res.status(400).json({status: "success", data:err});
    }else{
      res.status(200).json({status: "failed", data:userData});
    }
  })
}

// Login
exports.login = (req, res) => {
  const reqData = req.body;
  UserDataModel.aggregate([
    {$match: reqData},
    {$project: {firstName:1, lastName:1, email:1, mobile:1, photo:1, _id:0}}
  ], (err, data)=> {
      if(err){
        res.status(400).json({status: "failed", data:err});
      }else{
        if(data.length > 0){
          let token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            data: data[0]['email']
          }, 'secretKey');
          res.status(200).json({status: "success", token, data});
        }else{
          res.status(400).json({status: "unauthorize"});
        }
      }
  })
}

// update profile
exports.updateProfile = (req, res) => {
  const filterQuery = req.headers['email'];
  const updateQuery = req.body;
  console.log(filterQuery)
  UserDataModel.findOneAndUpdate({email:filterQuery}, {$set: updateQuery}, (err, updateData) => {
    if(err){
      res.status(400).json({status: "failed", data:err});
    }else{
      res.status(200).json({status: "success", data:updateData});
    }
  })
}