const Counters = require('../database/Counters')

async function getSeqValue () {
  const [obj] = await Counters.find({})
  return obj.seq_value
}

module.exports = getSeqValue
