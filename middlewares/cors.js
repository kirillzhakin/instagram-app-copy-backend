const allowedCors = [
	'http://chromium-d89a6.web.app',
	'https://chromium-d89a6.web.app',
	'http://localhost:9000',
	'http://localhost:9200'
]

const cors = (req, res, next) => {
	const { origin } = req.headers

	console.log(origin)
	if (allowedCors.includes(origin)) {
		res.header('Access-Control-Allow-Origin', origin)
		res.header('Access-Control-Allow-Credentials', true)
	}

	const { method } = req
	const requestHeaders = req.headers['access-control-request-headers']
	const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'

	if (method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS)
		res.header('Access-Control-Allow-Headers', requestHeaders)
		return res.end()
	}

	return next()
}

module.exports = cors
