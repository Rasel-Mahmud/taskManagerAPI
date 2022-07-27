const mongoose = require('mongoose');

const UserDataSchema = mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String, unique: true},
  password: {type: String},
  mobile: {type: Number},
  photo: {type: String},
  createdDate: {type: Date, default: Date.now()}
}, {versionKey: false});

const UserDataModel = mongoose.model('users', UserDataSchema);

module.exports = UserDataModel;