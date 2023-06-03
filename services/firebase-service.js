const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getStorage } = require('firebase-admin/storage')

initializeApp({
	credential: cert({
		type: 'service_account',
		project_id: 'chromium-d89a6',
		private_key_id: '0799132ee1d9b7578935ade87b21ae74e5156e1b',
		private_key:
			'-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDbPjp8XhHb1mKi\no8go0WT++leDFpAD0MjArfx6FWVDlYOLHQ978kaDuArDLKrjXmuyTbXyOsB+5seP\nfYRvo7pcvkxs62LoM4BrhbSz0h8FzJnrdd+rE3ubCB6+zZdtfdtDNMuHe58P2ZuR\nV8WmrXhKV862j5IhPcgMZjPHM2IFyuv6gUnCYA4EV6nn0dR39Nz+SUiGLUVkcTEG\nXuOlpdXfpBnRrggCcnNxFB9TgojxND6MrHNki0aZOhQehJ9mAHkHrAljQrp82RtG\noHINlCjfn00Hji1YAfaNj/IJ9qw2ep8lDU5UpQSG8ier+1au0+EKvkDm2hWGtHt/\nvFovR35fAgMBAAECggEACxtZ18J/C1D1YHTr2nmFMTYNTrRLA0Gr/rexvAOVqwW9\nJMQjn5PBOih0NYZvrKLnazogA6kxs4KAgKBX7PBX+Oo6sYsZNyQIypAUll/vBDQY\nMume6Hbm6UGd9FLMOMoXKUGLwA2lglmNVbpWTO13BxkjFtrEiRxgPcfEGFoRI+bk\nUIJUcLJNwySE+ShaJPRfV+53ieHShvRzz4vvtyxLQgEUS/lHrqt4sDoWB9UcuU1P\n0Fbg8FF4RPegB8rfVyvLwpnk+cSzEFZYPOJcqgjzfeah5znHGgfmB0F0FlAC6szV\n3p//srJHPv/f0mslIbbImgl7sxh12lvKRmb0kJGi5QKBgQDu28UP4myrfISS8F0Q\nrthxC0P+uoNJtC+l91PsGWUxsAu+QckXZrOtkULTY9FI+dVOOUqcQ2Fyw5xNlzJj\n789mUKYxmr9z1b2Juvy0qMAodX3fb09HGY7AsANLnth5nnkOLya9oBXAeOurUkF+\nzHFoSnSxnF5e5p/hKzFYRx3dNQKBgQDq+hdMzWVGFxrELffaTNCOn6UfsxXoaeno\nM/kYwbmQgjIxJk6WGueKy7PaY27daH2QaNNzPxxZrCA9PWRDzRxQULLk2Q/Kq8eY\nHNiJ0VyL+P2sdmm6zzWDZDV8a92yMh8rbC0Xqh0TfMN4nn3ht+/CfHFd5f5zZSEp\nLXiS7RrjwwKBgQDEgu7HuMMq+tCfiz0l4pOTvW79fTlSQ/oHk0nqLqKAlJO0va7R\nn98nZyERhUfDwDdrmdr2YMEliCVp+ICuk7eQN73jhasJg8niLIKHp2YgYzlhv9P7\nbN1zTdwINPFobaaussAutivvJAzP8GaOCWksIkWLclh5v0e+GqkINcouGQKBgGdB\nlQGT9J/zQTjaNmNAhBlYgBhI+ySRfk8in6DIaIHfJK1CdyAxHHR6hUM/lJVI+HyA\nBANNxWiGYfhnROsidAG7JJG57N2T1Pa8Hk+Zp8B+nwKtWlLUAWEGpRZS1C4dJmNP\nexU+FN7eYYtcolaRHJPrWWn4ynLtCsBskeKGvN0/AoGBAKGx08NkHWUzNVD8e5jm\nuSVvN5pJgTuyfFAHJ3ouJkDbf6a2Vmq4PwYSPO1/7BFfS4+H833QXfnIeQm2/RJN\n7qP75oQ2VFj+bhS3YUoO9S+bUZbc/oJP9MywKFaVXCJaO0qPWgGxUSwL3K3ImiXb\nIkcygkNzdncMum/GDDHSzTwG\n-----END PRIVATE KEY-----\n',
		client_email:
			'firebase-adminsdk-6dr6v@chromium-d89a6.iam.gserviceaccount.com',
		client_id: '104854598325804175622',
		auth_uri: 'https://accounts.google.com/o/oauth2/auth',
		token_uri: 'https://oauth2.googleapis.com/token',
		auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
		client_x509_cert_url:
			'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6dr6v%40chromium-d89a6.iam.gserviceaccount.com',
		universe_domain: 'googleapis.com'
	}),
	storageBucket: 'chromium-d89a6.appspot.com'
})

const db = getFirestore()
const bucket = getStorage().bucket()

module.exports = { db, bucket }
