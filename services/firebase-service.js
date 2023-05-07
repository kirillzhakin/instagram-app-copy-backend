const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getStorage } = require('firebase-admin/storage')
const serviceAccount = require('../config/serviceAccountKey.json')

initializeApp({
	credential: cert(serviceAccount),
	storageBucket: 'chromium-d89a6.appspot.com'
})

const db = getFirestore()
const bucket = getStorage().bucket()

module.exports = { db, bucket }
