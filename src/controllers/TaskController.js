const TaskModel = require('./../models/TaskModel');

// Task Create
exports.createTask = (req, res) => {
  const task = req.body;
  task.email = req.headers['email'];
  TaskModel.create(task, (err, data)=>{
    if(err){
      res.status(400).json({status: "failed", data:err});
    }else{
      res.status(200).json({status: "success", data});
    }
  })
}

// Task Delete
exports.deleteTask = (req, res) => {
  const taskID = req.params.id;
  TaskModel.findOneAndDelete({_id:taskID}, (err, data) => {
    if(err){
      res.status(400).json({status: "failed", data:err});
    }else{
      res.status(200).json({status: "success", data});
    }
  })
}

// Task Update
exports.updateTask = (req, res) => {
  const filterQuery = req.params.id;
  const updateQuery = req.body;
  TaskModel.findOneAndUpdate({_id:filterQuery}, {$set: updateQuery}, (err, data)=>{
    if(err){
      res.status(400).json({status: "failed", data:err});
    }else{
      res.status(200).json({status: "success", data});
    }
  }) 
}

// Task status change
exports.taskStatusChange = (req, res) => {
  const filterQuery = {_id: req.params.id};
  const updateQuery = {status: req.params.status};
  TaskModel.findByIdAndUpdate(filterQuery, {$set: updateQuery}, (err, data) => {
    if(err){
      res.status(400).json({status: "failed", data:err});
    }else{
      res.status(200).json({status: "success", data});
    }
  })
}

// Task List by status
exports.taskListByStatus = (req, res) => {
  const filterQuery = {email: req.headers['email'], status: req.params.status}
  TaskModel.find(filterQuery, (err, data) => {
    if(err){
      res.status(400).json({status: "failed", data:err});
    }else{
      res.status(200).json({status: "success", data});
    }
  })
}

// Task status count
exports.taskStatusCount = (req, res) => {
  const filterQuery = req.headers['email'];
  console.log(`${filterQuery}`);
  TaskModel.aggregate([
    {$match: {email: filterQuery}},
    {$group: {_id:"$status", sum: {$count: {}}}}
  ], (err, data)=> {
    if(err){
      res.status(400).json({status: "failed", data:err});
    }else{
      res.status(200).json({status: "success", data});
    }
  })
}