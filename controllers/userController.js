const { User } = require('../models/userModel');

function getUserById(req, res) {
  User.findById(req.params.id, (err, userData) => {
    if (err) {
      return res.staus(400).send(err.message);
    }
    return res.send(userData);
  });
}

function createuser(req, res) {
  const newUser = new User(req.body);
}

module.exports = {
  getUserById,
};
