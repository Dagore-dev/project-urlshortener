const { urlRegEx } = require('./regularExpressions')

function isValidUrl (url) {
  if (urlRegEx.test(url)) {
    try {
      const newUrl = new URL(url)
      return { ok: true, URL: newUrl }
    } catch (err) {
      return { ok: false, URL: undefined }
    }
  }

  return false
}

module.exports = isValidUrl
