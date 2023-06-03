const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getStorage } = require('firebase-admin/storage')

initializeApp({
	credential: cert({
		type: process.env.FIREBASE_TYPE,
		project_id: process.env.FIREBASE_PROJECT_ID,
		private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
		private_key:
			'-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDGbVZFHvCa8qVM\n25a2OSWhY3EZiz9imV6SPXKLdFPuT5zBoJPY5DVtHG9IifRdYTTMgNuPs0pA5Xw9\nJ361aR8oeTAqGJmlEO82VYCgBT/JVVw/0fjvXlUjEK9kSD4q/oO7WYSRMJImBYzK\n67EacpezS8U00jb5qKAf6ISOt7N0CpA/BMkapb1sAwwvxrrbGzseGJu3BbQDZ8zH\nif3Atn4C00QZUHlINDfJ+WQ9hlHMDSjSgN2fZbrFi4OwBm4RgNdTmgyr5EkGdREq\nzwVb+C0LskJ63BhFgDDLH2JG7x1qJh/C8CylUhkbjM4pTrSVFVFwZJQVYUrHer6k\nI016VHMFAgMBAAECggEAMbducKYmaeRXB3FTize5Vn0Idvp9OLKtz91miEtuxhyb\nbaZStPrE6iBAP8AVApqa9IxqttAY0DbPkLEHHeQHYwguSbXdNU8PaKE2t6FpEIR7\nNyBgi3Uqxrzk/S7eqL4ZeoUc4pX1YGJumt9AAhzpJorbD/eFv7sA183V/L5JT87u\nrV6pclPDzBY6nEoPP6QVpMFL9nZbtI67YFmsNBLbCBTacgduX2aLlrt3QqmMWwgv\ndLFzrI81ArTtm/ttWsrc/U/tJs+pZKWjKAKXIl3odEqtVo6XedRCWF0ywLIznwTI\nwFviZgN/OfInMN9uty0RSniC0pWaEqDusK++dPuAJwKBgQDs4ExAvv5z+aw7pdMq\nqATbhbqhfUBlQ+p6NBFvQ1zue6vEyG03fNmKQ0T4oz2B5ibSB0vg9+I+hAV+agIV\nthigudrP8GmzUpBaGtCmeWgQ1w3/KvXHBIBFkR3p9+MH4XzFHCuV9vMBBROhE2CO\n38bmwKN8rmUSWf7UlGlDIG/DpwKBgQDWcmH2dubmq0Q+V0HLboEnjveTwSzNDcrq\nlnKpouHrVwtlPDuH2BPABQwlmbHp4sH3lf20tn9qTBw6WBvhlkPGQR4ew56wS34i\nWjcN+uATUOmdPaz90OboyuapIaArzxOS/hBCfsqlyeNV/n8Eu62mgXxFelN+Bt5q\nm/BWz2HZcwKBgBVZpiXT0TV81IRPzveySzXKGOdDVdGKzJCVLtkbdj3ckb/b3NQ6\ngZUPuSC7/eg+aVNW6wTs8sx1s9UQEv4H+rJJ7in93lkWYQJuFk5a9QFHkPBl299D\nTZh3mv2ipSjprwhJILiUmJSH85v6FiLqko/r3xB2249K40gf1FkDjG9TAn97IzMd\nUylDSxTktzYQmmOPU4jWTxZqqIDcM4ej4OPZPyJL/0ovtuOgX0WaUabXpl26zWXh\nXunLH+kVl4JrBt3j+YBSKgH1OWQ0VZlHbcc9UDjVEZVEKbBt/BR3CdfvT/jtbvXn\nOOckS8k+l+RX02zjL3csbhGDTG5qySA4uNx3AoGBANNi/QSolGuc4qXYRS5nI5F3\n7np3NtVbDHW2PPn6+bBvP1gO7PbcYyASDUGiBT+sQGHw5hkdizfSv2aG80Po95KM\nW5jUZ3Idwc8rYP1U2MBNsG7NgihhstobDQSTX8tLPA0Bd85v7hTvk4vjG9bvVzuw\nsQMgxLHZmWQv1YhUkcXA\n-----END PRIVATE KEY-----\n',

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
