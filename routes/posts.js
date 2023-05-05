const postsRouter = require('express').Router()
const { postsController, createPost } = require('../controllers/posts')

postsRouter.get('/posts', postsController)
postsRouter.post('/createPost', createPost)

module.exports = postsRouter
