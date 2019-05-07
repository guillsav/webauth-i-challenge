const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../users/users-model.js');
const checkRequired = require('../middlewares/checkRequired.js');

router.post('/', checkRequired, async (req, res) => {
  try {
    const {username, password} = req.body;
    const foundUser = await db.getUserByUsername(username);
    if (foundUser) {
      const checkPass = bcrypt.compareSync(password, foundUser.password);
      if (checkPass) {
        res.status(200).json({message: `Welcome ${foundUser.username}!`});
      } else {
        res.status(400).json({message: 'Invalid Credentials!'});
      }
    } else {
      res.status(404).json({message: `No user named ${username} was found.`});
    }
  } catch (error) {
    res.status(500).json({errorMessage: 'Error while login.'});
  }
});

module.exports = router;
