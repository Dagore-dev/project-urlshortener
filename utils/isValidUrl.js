const dns = require('dns/promises')

function isValidUrl (url) {
  try {
    const newURL = new URL(url)
    dns.lookup(newURL.hostname, {}, (err) => {
      console.log('on dns lookup', err)
      throw err
    })
  } catch (err) {
    console.log('on new URL', err)
    return false
  }

  return true
}

module.exports = isValidUrl
