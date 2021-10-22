const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  taskName: {
    type: String,
  },
  taskDescription: {
    type: String,
  },
  taskType: {
    type: String,
  },
  creationDate: {
    type: Date,
  },
  expireDate: {
    type: Date,
  },
  importanceLevel: {
    type: Number,
  },
});

module.exports = mongoose.model('Task', taskSchema);
