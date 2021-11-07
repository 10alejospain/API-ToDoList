const User = require('../models/userModel');
const Task = require('../models/taskModel');

function getUserById(req, res) {
  User.findById(req.params.id, (err, userData) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    return res.send(userData);
  });
}

function getUserByEmail(req, res) {
  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) return res.status(400).send(`Error in userController: ${err.message}`);
    return res.status(200).send(user);
  });
}

function createUser(req, res) {
  const newUser = new User(req.body);

  newUser.save((err, userInfo) => {
    if (err) return res.status(400).send(`Error in userController: ${err.message}`);
    return res.status(200).send(userInfo);
  });
}

function getAllTasks(req, res) {
  User.findById(req.params.userId, (err) => {
    if (err) return res.status(400).send(`Error in userController: ${err.message}`);
  }).populate('task').populate('corp').exec((err, tasks) => {
    if (err) return res.status(400).send(`Error in userController: ${err.message}`);
    return res.status(200).send(tasks);
  });
}
function getUserTask(req, res) {
  User.findById(req.params.userId, (err, task) => {
    if (err) return res.status(400).send(`Error in userController: ${err.message}`);
    return res.status(200).send(task);
  });
}

function updateUser(req, res) {
  User.findByIdAndUpdate(req.params.userId, req.body, (err, updatedUser) => {
    if (err) return res.status(400).send(`Failed to update: ${err.message}`);
    return res.status(200).send({ msg: 'update ok', updatedUser });
  });
}

function deleteUser(req, res) {
  User.findByIdAndDelete(req.params.userId, (err) => {
    if (err) return res.status(400).send(`Failed to delete: ${err.message}`);
    return res.status(200).send({ msg: `User ${req.params.userId} ok` });
  });
}

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  getAllTasks,
  getUserTask,
  updateUser,
  deleteUser,
};
