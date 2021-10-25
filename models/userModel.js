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

userSchema.pre('save', (next) => {
  const user = this;
  if (!user.isModified('password')) { return next(); }

  user.salt = randomBytes(64);

  pbkdf2Sync(user.password, user.salt, 10, 64, 'sha512', (err, encrypted) => {
    if (err) { return next(err); }
    user.password = encrypted;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);
