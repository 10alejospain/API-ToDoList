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

module.exports = {
  getUserById,
  createUser,
  getAllTasks,
  getUserTask,
};
