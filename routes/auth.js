const authRouter = require('express').Router()
const { login, signout, createUser } = require('../controllers/users')

authRouter.post('/signin', login)

authRouter.post('/signup', createUser)

authRouter.post('/signout', signout)

module.exports = authRouter
