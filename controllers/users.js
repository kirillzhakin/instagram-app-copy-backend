const { v4: uuidv4 } = require('uuid')

const login = email => {}

const createUser = (req, res) => {
	let uuid = uuidv4()
	const { email, name, password } = req.body
	if (!email || !name || !password) {
		return res.status(400).send({ message: 'Missing fields' })
	}
	console.log(req.body)

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
	// 		const { uid, email, displayName } = user
	// 		res.send({ uid, email, displayName })
	// 	})
	// 	.catch(err => res.send(err.message))
}

const signout = () => {}

module.exports = {
	login,
	signout,
	createUser
}
