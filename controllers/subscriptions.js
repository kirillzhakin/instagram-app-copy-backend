const { db } = require('../services/firebase-service')

const createSubscription = (req, res) => {
	db.collection('subscriptions')
		.add(req.query)
		.then(_data => {
			res.send({
				message: 'Subscription added',
				postData: req.query
			})
		})
}

module.exports = { createSubscription }
