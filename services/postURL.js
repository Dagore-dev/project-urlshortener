function postURL (url) {
  return {
    ok: false,
    obj: {
      original_url: url,
      short_url: 1
    }
  }
}

module.exports = postURL
