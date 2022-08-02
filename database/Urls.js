const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const { Schema, model } = require('mongoose')

const urlSchema = new Schema({
  original_url: {
    type: String,
    required: true
  }
})

urlSchema.set('toJSON', {
  transform: (document, obj) => {
    delete obj._id
    delete obj.__v
  }
})

urlSchema.plugin(AutoIncrement, { inc_field: 'short_url' })

const Urls = model('Urls', urlSchema)

module.exports = Urls
