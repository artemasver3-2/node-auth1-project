// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const express = require('express')
// const restricted = require('../auth/auth-middleware')
const User = require('./users-model')
const UsersRouter = express.Router()

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */

  UsersRouter.get('/', (req, res, next) => {
    User.find()
      .then(user => {
        res.json(user)
      })
      .catch(next)
  })
  
  UsersRouter.get('/:id', (req, res, next) => {
    const user_id = req.params.id
    User.findById(user_id)
      .then(user => {
        res.json(user)
      })
      .catch(next)
  })

// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = { UsersRouter }
