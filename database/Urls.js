const { Schema, model } = require('mongoose')
const getSeqValue = require('../services/getSeqValue')

const urlSchema = new Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: Number
})

urlSchema.set('toJSON', {
  transform: async (document, obj) => {
    delete obj._id
    delete obj.__v
    obj.short_url = await getSeqValue()
  }
})

const Urls = model('Urls', urlSchema)

module.exports = Urls
