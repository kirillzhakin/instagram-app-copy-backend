const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getStorage } = require('firebase-admin/storage')

const {
	FIREBASE_TYPE,
	FIREBASE_PROJECT_ID,
	FIREBASE_PRIVATE_KEY_ID,
	FIREBASE_PRIVATE_KEY,
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_CLIENT_ID,
	FIREBASE_AUTH_URL,
	FIREBASE_TOKEN_URL,
	FIREBASE_AUTH_PROVIDER,
	FIREBASE_CLIENT,
	FIREBASE_UNIVERSE_DOMAIN
} = require('../utils/data')

initializeApp({
	credential: cert({
		type: FIREBASE_TYPE,
		project_id: FIREBASE_PROJECT_ID,
		private_key_id: FIREBASE_PRIVATE_KEY_ID,
		private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
		client_email: FIREBASE_CLIENT_EMAIL,
		client_id: FIREBASE_CLIENT_ID,
		auth_uri: FIREBASE_AUTH_URL,
		token_uri: FIREBASE_TOKEN_URL,
		auth_provider_x509_cert_url: FIREBASE_AUTH_PROVIDER,
		client_x509_cert_url: FIREBASE_CLIENT,
		universe_domain: FIREBASE_UNIVERSE_DOMAIN
	}),
	storageBucket: 'chromium-d89a6.appspot.com'
})

const db = getFirestore()
const bucket = getStorage().bucket()

module.exports = { db, bucket }
