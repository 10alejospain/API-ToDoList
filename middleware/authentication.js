const sessionToken = require('../services/SessionToken');

function loggedIn(req, res, next) {
  const { token } = req.headers;

  if (!sessionToken.checkToken(token)) {
    return res.status(401).send({ msg: 'Not logged in' });
  }
  return next();
}

module.exports = {
  loggedIn,
};
