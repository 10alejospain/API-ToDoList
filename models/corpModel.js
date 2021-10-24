const mongoose = require('mongoose');

const { Schema } = mongoose;
const taskSchema = require('./taskModel');

const corpSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Corp name required'],
  },
  corporationTask: { // Every corp has a task
    type: taskSchema,
    default: {},
  },
});

module.exports = mongoose.model('Corporation', corpSchema);
module.exports = corpSchema;
