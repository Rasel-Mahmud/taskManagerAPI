const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  title: {type: String},
  description: {type: String},
  email: {type: String},
  status: {type: String},
  createdDate: {type: Date, default: Date.now()}
}, {versionKey: false});

const TaskModel = mongoose.model('tasks', TaskSchema);

module.exports = TaskModel;