const { Schema, model } = require('mongoose')

const counterSchema = new Schema({
  seq_value: Number
})

const Counters = model('Counters', counterSchema)

module.exports = Counters
