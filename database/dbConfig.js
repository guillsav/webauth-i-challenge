const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig);

module.exports = db;
