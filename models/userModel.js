const mongoose = require('mongoose');
const { Corporation } = require('./corporationModel');
const { Task } = require('./taskModel');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Email required'],
  },
  name: {
    type: String,
    required: [true, 'Name required'],
  },
  surnames: {
    type: String,
    required: [true, 'Surname required'],
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
  salt: {
    type: String,
    immutable: true,
    required: [true, 'Can not continue without the salt'],
  },
  gender: {
    type: String,
    required: [true, 'Gender required'],
    enum: ['male', 'female', 'other'],
  },
  organization: {
    type: Corporation,
  },
  task: {
    type: Task,
  },
  sharedUsers: [String],
});
module.exports = mongoose.model('User', userSchema);
