const Urls = require('../database/Urls')
const isValidUrl = require('../utils/isValidUrl')

async function postURL (url) {
  if (isValidUrl(url)) {
    const newUrl = new Urls({
      original_url: url
    })

    try {
      const savedUrl = await newUrl.save()

      return {
        ok: true,
        obj: savedUrl
      }
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        obj: { message: 'Cannot save in database.' }
      }
    }
  }

  return {
    ok: false,
    obj: { message: 'Invalid URL.' }
  }
}

module.exports = postURL
