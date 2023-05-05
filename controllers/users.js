const { admin, firebase } = require('../services/firebase-service')
const { v4: uuidv4 } = require('uuid')

const login = email => {
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(user => console.log(user))
}

const createUser = (req, res) => {
	let uuid = uuidv4()
	const { email, name, password } = req.body
	console.log(req.body)
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(user => console.log(user))
	// admin
	// 	.auth()
	// 	.createUser({
	// 		uid: uuid,
	// 		email: email,
	// 		displayName: name,
	// 		password: password,
	// 		emailVerified: true
	// 	})
	// 	.then(user => {
	// 		console.log(user)
	// 		res.send(user)
	// 	})
	// 	.catch(err => res.send(err.message))
}
// auth
// 	.createUser({
// 		uid: uuid,
// 		email: email,
// 		displayName: name,
// 		password: password,
// 		emailVerified: true
// 	})
// 	.then(user => {
// 		const { uid, email, displayName } = user
// 		res.send({ uid, email, displayName })
// 	})
// 	.catch(err => res.send(err.message))

const signout = () => {}

module.exports = {
	login,
	signout,
	createUser
}
