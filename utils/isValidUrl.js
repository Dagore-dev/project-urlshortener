function isValidUrl (url) {
  try {
    const newUrl = new URL(url)
    return { ok: true, URL: newUrl }
  } catch (err) {
    return { ok: false, URL: undefined }
  }
}

module.exports = isValidUrl
