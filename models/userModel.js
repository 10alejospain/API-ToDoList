const mongoose = require('mongoose');
const { pbkdf2Sync, randomBytes } = require('crypto');

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
  surname: {
    type: String,
    required: [true, 'Surname required'],
  },
  password: {
    type: String,
    // required: [true, 'Password required'],
  },
  salt: {
    type: String,
    immutable: true,
    // required: [true, 'Can not continue without the salt'],
  },
  gender: {
    type: String,
    required: [true, 'Gender required'],
    enum: ['male', 'female', 'other'],
  },
  corp: {
    type: Schema.Types.ObjectId,
    ref: 'Corporation',
    default: null,
  },
  task: { // Every user has a task
    type: Schema.Types.ObjectId,
    ref: 'Task',
    default: null,
  }, // Other users task can be shared
  sharedUsers: [Schema.Types.ObjectId], // Shared task from users stored as users id's
});

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.salt = randomBytes(64);
    this.password = pbkdf2Sync(this.password, this.salt, 10, 64, 'sha512').toString('hex');
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
