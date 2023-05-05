require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const cors = require('./middlewares/cors')

const PORT = process.env.PORT || 3000

const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const subscriptionRouter = require('./routes/subscriptions')

const app = express()
app.use(bodyParser.json())
app.use(cors)

app.use('/', authRouter)

// app.use(usersRouter)
app.use(postsRouter)
app.use(subscriptionRouter)

app.listen(PORT, () => {
	console.log(`Port ${PORT}`)
})
