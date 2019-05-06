const db = require('../database/dbConfig.js');

module.exports = {
  getUsers,
  getUser,
  addUser
};

function getUsers() {
  return db('users');
}

function getUser(username) {
  return db('users')
    .where({username}, 'username')
    .first();
}

function addUser(user) {
  return db('users')
    .insert(user)
    .where(([id]) => {
      return getUser(id);
    });
}
