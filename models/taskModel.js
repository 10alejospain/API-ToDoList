const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  userIdReference: { type: String },
  taskName: { type: String },
  taskDescription: { type: String },
  taskType: { type: String },
  creationDate: { type: Date },
  expireDate: { type: Date },
  importanceLevel: { type: Number },
  sharedIds: { type: Array },
});

module.exports = mongoose.model('Task', taskSchema);
