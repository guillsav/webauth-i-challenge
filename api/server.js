const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const usersRouter = require('../users/users-router.js');
const authsRouter = require('../auths/auths-router.js');

const server = express();

const sessionConfig = {
  name: 'bearer',
  secret: 'wIjoxNTUG9lIiwiYW2LThmMGEtNIzYyIsImlh',
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 1,
    secure: false
  },
  resave: false,
  saveUninitialized: true
};

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());

// Routers
server.use('/api/auth', authsRouter);
server.use('/api/users', usersRouter);

module.exports = server;
