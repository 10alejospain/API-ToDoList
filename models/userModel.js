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
<<<<<<< HEAD
  },
=======
  }, // Other users task can be shared
>>>>>>> 27e5ebe674e162410d5026fa6f0023ed7ef51fbb
});

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.salt = randomBytes(64).toString('hex');
    this.password = pbkdf2Sync(this.password, this.salt, 1000, 64, 'sha512').toString('hex');
  }
  next();
});

userSchema.methods.checkPass = function (pass) { // Compares passwords in userController login
  return this.password === pbkdf2Sync(pass, this.salt, 1000, 64, 'sha512').toString('hex');
};

module.exports = mongoose.model('User', userSchema);
