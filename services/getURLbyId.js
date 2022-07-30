const Urls = require('../database/Urls')

async function getURLById (id) {
  const findOne = await Urls.findOne({ short_url: id })

  if (findOne !== null) {
    return {
      ok: true,
      URL: findOne.original_url
    }
  }

  return {
    ok: false,
    URL: ''
  }
}

module.exports = getURLById
