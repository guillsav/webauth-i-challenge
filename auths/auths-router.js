const router = require('express').Router();
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const db = require('../users/users-model.js');

router.post('/register', async (req, res) => {
  try {
    const schema = Joi.object().keys({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,100}$/)
        .required()
    });

    let user = await Joi.validate(req.body, schema);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    await db.addUser(user);
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({errorMessage: 'Error while adding the user to the database.'});
  }
});

router.post('/login', async (req, res) => {
  try {
    const schema = Joi.object().keys({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,100}$/)
        .required()
    });
    const user = await Joi.validate(req.body, schema);
    const {username, password} = user;
    const foundUser = await db.getUserByUsername(username);
    if (foundUser) {
      const checkPass = await bcrypt.compare(password, foundUser.password);
      if (checkPass) {
        req.session.username = foundUser.username;
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

router.post('/logout', async (req, res) => {
  try {
    req.session
      ? req.session.destroy(err => {
          if (err) {
            res.send(`Wasn't able to logout!`);
          } else {
            res.send('Logout was successfull!');
          }
        })
      : res.send();
  } catch (err) {
    res.status(500).json({errorMessage: 'Error while login out user!'});
  }
});

module.exports = router;
