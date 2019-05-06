const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../users/users-model.js');
const checkRequired = require('../middlewares/checkRequired.js');

router.post('/', checkRequired, async (req, res) => {
  try {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    const addedUser = await db.addUser(user);
    res.status(201).json(addedUser);
  } catch (error) {
    res
      .status(500)
      .json({errorMessage: 'Error while adding the user to the database.'});
  }
});

module.exports = router;
