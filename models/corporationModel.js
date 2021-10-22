const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Task } = require('./taskModel');

const corporationSchema = new Schema({
  name: {
    type: String,
  },
  corporationTask: {
    type: Task,
  },
});

module.exports = mongoose.model('Corporation', corporationSchema);
