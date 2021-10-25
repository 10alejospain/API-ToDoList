const User = require('../models/userModel');

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

module.exports = {
  getUserById,
  createUser,
};
