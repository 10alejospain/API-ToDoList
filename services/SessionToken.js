const jwt = require('jsonwebtoken');

function createToken(user) {
  // Creates a token containing user data that expires in 30 days
  return jwt.sign({ data: user }, process.env.KEY, { expiresIn: '30 days' });
}

function checkToken(token) {
  // 'try-catch' is used because it gives an exception if it not matches
  try {
    return jwt.verify(token, process.env.KEY);
  } catch (error) {
    return undefined;
  }
}

module.exports = {
  createToken,
  checkToken,
};
