require('dotenv').config()
const express = require('express')
const cors = require('cors')
const postURL = require('./services/postURL')
const getURLById = require('./services/getURLbyId')
const logger = require('./middlewares/logger')
const app = express()

// Basic Configuration
const port = process.env.PORT ?? 3000

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use('/public', express.static(`${process.cwd()}/public`))

app.use(logger)

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.post('/api/shorturl', (request, response) => {
  const { url } = request.body
  const { ok, obj } = postURL(url)

  if (ok) {
    response.json(obj)
  } else {
    response.status(401).json({ error: 'invalid url' })
  }
})

app.get('/api/shorturl/:id', (request, response) => {
  const { id } = request.params
  const { ok, URL } = getURLById(id)

  if (ok) {
    console.log(URL)
    response.status(301).redirect(URL)
  } else {
    response.status(404).json({ status: 404, message: 'Not Found' })
  }
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
