const Urls = require('../database/Urls')
const isExistingUrl = require('../utils/isExistingUrl')
const isValidUrl = require('../utils/isValidUrl')

async function postURL (url) {
  const { ok, URL } = isValidUrl(url)
  const isExisting = ok ? await isExistingUrl(URL) : false

  if (isExisting) {
    console.log('Ha pasado isExisting', url)
    
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
