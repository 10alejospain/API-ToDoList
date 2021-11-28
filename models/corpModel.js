const mongoose = require('mongoose');

const { Schema } = mongoose;

const corpSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Corp name required'],
    unique: true,
  },
  corporationTask: { // Every corp has a task
    type: Schema.Types.ObjectId,
    ref: 'Task',
    default: null,
  },
});

module.exports = mongoose.model('Corporation', corpSchema);
