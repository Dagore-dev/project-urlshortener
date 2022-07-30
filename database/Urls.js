const { Schema, model } = require('mongoose')

const urlSchema = new Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: Number
})

const Urls = model('Urls', urlSchema)

module.exports = Urls
