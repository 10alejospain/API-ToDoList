const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  taskName: { type: String },
});

module.exports = mongoose.model('Task', taskSchema);
