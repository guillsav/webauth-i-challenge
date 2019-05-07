const router = require('express').Router();
const db = require('./users-model.js');
const checkHeadersPassword = require('../middlewares/checkHeaderPassword.js');

router.get('/', checkHeadersPassword, async (req, res) => {
  try {
    const users = await db.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Error while retrieving the users from the database.'
    });
  }
});

router.get('/:id', checkHeadersPassword, async (req, res) => {
  try {
    const user = await db.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({errorMessage: `User with ID ${req.params.id} not found. `});
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Error while retrieving the user from the database.'
    });
  }
});

module.exports = router;
