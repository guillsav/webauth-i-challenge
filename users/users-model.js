const db = require('../database/dbConfig.js');

module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  addUser
};

function getUsers() {
  return db('users');
}

function getUserById(id) {
  return db('users')
    .where({id}, 'id')
    .first();
}
function getUserByUsername(username) {
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
