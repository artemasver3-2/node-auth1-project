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

  UsersRouter.get('/', async (req, res, next) => {
    try {
      const user = await User.find()
      .then(
        res.json(user)
      )
    } catch(err) {
      next(err)
    }
  })
  
  UsersRouter.get('/:id', async (req, res, next) => {
    try {
      const user_id = req.params.id
      const user = await User.findById(user_id)
        .then(
          res.json(user)
        )
    } catch(err) {
      next(err)
    }
  })

// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = { UsersRouter }
