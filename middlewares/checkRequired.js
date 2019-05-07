function checkRequired(req, res, next) {
  const {username, password} = req.body;
  if (username.length > 0 && password.length > 0) {
    next();
  } else {
    res
      .status(400)
      .json({errorMessage: 'Please provide a username and password.'});
  }
}

module.exports = checkRequired;
