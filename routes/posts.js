const postsRouter = require('express').Router()
const {
	postsController,
	deletePost,
	createPost
} = require('../controllers/posts')

postsRouter.get('/posts', postsController)
postsRouter.delete('/deletePost', deletePost)
postsRouter.post('/createPost', createPost)

module.exports = postsRouter
