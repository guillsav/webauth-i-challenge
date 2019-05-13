const bcrypt = require('bcrypt');
const db = require('../users/users-model.js');

function checkHeaderPassword(req, res, next) {
  req.session && req.session.username
    ? next()
    : res.status(401).json({errorMessage: 'Invalid Credentials!'});
}

module.exports = checkHeaderPassword;
