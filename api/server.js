const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const usersRouter = require('../users/users-router.js');
const registerRouter = require('../auths/register-router.js');
const loginRouter = require('../auths/login-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// Routers
server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/users', usersRouter);

module.exports = server;
