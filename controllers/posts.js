const { db, bucket } = require('../services/firebase-service')
const { v4: uuidv4 } = require('uuid')

const webpush = require('web-push')
const busboy = require('busboy')
const path = require('path')
const os = require('os')
const fs = require('fs')

const { WEB_PUSH_PUBLIC_KEY } = process.env
const { WEB_PUSH_PRIVATE_KEY } = process.env

webpush.setVapidDetails(
	'mailto:example@yourdomain.org',
	WEB_PUSH_PUBLIC_KEY,
	WEB_PUSH_PRIVATE_KEY
)

const postsController = (_req, res) => {
	const posts = []
	db.collection('posts')
		.orderBy('date', 'desc')
		.get()
		.then(snapshot => {
			snapshot.forEach(doc => posts.push(doc.data()))
			res.send(posts)
		})
}

const createPost = (req, res) => {
	const bb = busboy({ headers: req.headers })
	let uuid = uuidv4()
	let fields = {}
	let fileData = {}
	let imageUrl

	bb.on('file', (name, file, info) => {
		const { filename, encoding, mimeType } = info
		console.log(
			`File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
			filename,
			encoding,
			mimeType
		)

		const filepath = path.join(os.tmpdir(), filename)
		file.pipe(fs.createWriteStream(filepath))
		fileData = { filepath, mimeType }
	})

	bb.on('field', (name, val, _info) => {
		fields[name] = val
	})

	bb.on('close', () => {
		bucket.upload(
			fileData.filepath,
			{
				uploadType: 'media',
				metadata: {
					metadata: {
						contentType: fileData.mimeType,
						firebaseStorageDownloadTokens: uuid
					}
				}
			},
			(err, uploadedFile) => {
				if (!err) {
					addPost(uploadedFile)
				}
			}
		)

		const addPost = uploadedFile => {
			imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`

			db.collection('posts')
				.doc(fields.id)
				.set({
					id: fields.id,
					caption: fields.caption,
					location: fields.location,
					date: parseInt(fields.date),
					imageUrl: imageUrl
				})
				.then(() => {
					sendPushNotification()
					res.send(`Post added: ${fields.id}`)
				})
		}

		const sendPushNotification = () => {
			let subscriptions = []
			db.collection('subscriptions')
				.get()
				.then(data => {
					data.forEach(doc => {
						subscriptions.push(doc.data())
					})
					return subscriptions
				})
				.then(subscriptions => {
					subscriptions.forEach(sub => {
						const pushSubscription = {
							endpoint: sub.endpoint,
							keys: {
								auth: sub.keys.auth,
								p256dh: sub.keys.p256dh
							}
						}
						const pushContent = {
							title: 'New Instsgram Post!',
							body: 'New Post Added! Check it out!',
							openUrl: '/#/',
							imageUrl: imageUrl
						}
						const pushContentStringified = JSON.stringify(pushContent)
						webpush.sendNotification(pushSubscription, pushContentStringified)
					})
				})
		}
	})

	req.pipe(bb)
}

module.exports = { postsController, createPost }
