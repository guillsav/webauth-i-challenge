const bcrypt = require('bcrypt');
const db = require('../users/users-model.js');

function checkHeaderPassword(req, res, next) {
  const {username, password} = req.headers;
  const founduser = db
    .getUserByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({errorMessage: 'Invalid Credentials!'});
      }
    })
    .catch(err =>
      res.status(500).json({
        error: err,
        errorMessage: 'Error while checking for the users credentials.'
      })
    );
}

module.exports = checkHeaderPassword;
