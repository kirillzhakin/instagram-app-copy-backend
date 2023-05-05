const firebase = require('firebase/app')
const auth = require('firebase/auth')

// const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getStorage } = require('firebase-admin/storage')
const firebaseConfig = require('./firebase-config')
const serviceAccount = require('../serviceAccountKey.json')

// initializeApp({
// 	credential: cert(serviceAccount),
// 	storageBucket: 'chromium-d89a6.appspot.com'
// })

firebase.initializeApp(firebaseConfig)

const db = getFirestore()
const bucket = getStorage().bucket()

module.exports = { auth, db, bucket }
