require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const postURL = require('./services/postURL')
const getURLById = require('./services/getURLbyId')
const logger = require('./middlewares/logger')
const app = express()

// Basic Configuration
const port = process.env.PORT ?? 3000
app.use(cors())

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB
const connectionString = process.env.MONGO_DB_URI
mongoose.connect(connectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

// Include and serve statics
app.use('/public', express.static(`${process.cwd()}/public`))

app.use(logger)

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

// Endpoints
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.post('/api/shorturl', async (request, response) => {
  const { url } = request.body
  const { ok, obj } = await postURL(url)

  if (ok) {
    response.json(obj)
  } else {
    response.status(401).json({ error: 'Invalid URL' })
  }
})

app.get('/api/shorturl/:id', async (request, response) => {
  const { id } = request.params
  const { ok, URL } = await getURLById(id)

  if (ok) {
    response.status(301).redirect(URL)
  } else {
    response.status(404).json({ status: 404, message: 'Not Found' })
  }
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
