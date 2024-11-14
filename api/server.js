const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const UsersRouter = require('./users/users-router');
const AuthRouter = require('./auth/auth-router');
const knex = require('knex')

const session = require('express-session');
const store = require('connect-session-knex')(session);
/**
  Do what needs to be done to support sessions with the `express-session` package!
  To respect users' privacy, do NOT send them a cookie unless they log in.
  This is achieved by setting 'saveUninitialized' to false, and by not
  changing the `req.session` object unless the user authenticates.

  Users that do authenticate should have a session persisted on the server,
  and a cookie set on the client. The name of the cookie should be "chocolatechip".

  The session can be persisted in memory (would not be adecuate for production)
  or you can use a session store like `connect-session-knex`.
 */

const server = express();
server.use(session({
  name: 'chocolatechip',
  secret: 'nobody tosses a dwarf!',
  httpOnly: true, 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: true, 
  }, 
  store: new store ({
    knex, 
    createTable: true, 
    tablname: 'session',
    clearInterval: 1000* 60 * 10,
  }),
}))

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', UsersRouter);
server.use('/api/auth', AuthRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = { server };
