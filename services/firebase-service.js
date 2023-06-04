const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getStorage } = require('firebase-admin/storage')

initializeApp({
	credential: cert({
		type: process.env.FIREBASE_TYPE,
		project_id: process.env.FIREBASE_PROJECT_ID,
		private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
		private_key: process.env.FIREBASE_PRIVATE_KEY
			? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
			: undefined,
		client_email: process.env.FIREBASE_CLIENT_EMAIL,
		client_id: process.env.FIREBASE_CLIENT_ID,
		auth_uri: process.env.FIREBASE_AUTH_URL,
		token_uri: process.env.FIREBASE_TOKEN_URL,
		auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
		client_x509_cert_url: process.env.FIREBASE_CLIENT,
		universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
	}),
	storageBucket: 'chromium-d89a6.appspot.com'
})

const db = getFirestore()
const bucket = getStorage().bucket()

module.exports = { db, bucket }
