const dns = require('dns/promises')

async function isExistingUrl (URL) {
  try {
    await dns.lookup(URL.hostname)
  } catch {
    return false
  }

  return true
}

module.exports = isExistingUrl
