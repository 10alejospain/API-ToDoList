const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: [true, 'Task name required'],
  },
  taskDescription: {
    type: String,
    default: ' ',
  },
  taskType: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  expireDate: {
    type: Date,
  },
  importanceLevel: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Task', taskSchema);
