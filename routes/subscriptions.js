const subscriptionRouter = require('express').Router()
const { createSubscription } = require('../controllers/subscriptions')

subscriptionRouter.post('/createSubscription', createSubscription)

module.exports = subscriptionRouter
