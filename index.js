require('dotenv').config()
const express = require('express')
const cors = require('./middlewares/cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT

const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const subscriptionRouter = require('./routes/subscriptions')

const app = express()
app.use(bodyParser.json())
app.use(cors)

// app.use('/', authRouter)

// app.use(usersRouter)
app.use(postsRouter)
app.use(subscriptionRouter)

app.listen(PORT, () => {
	console.log(`Port ${PORT}`)
})
