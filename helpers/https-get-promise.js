const https = require('https')

const httpsGet = url => new Promise((resolve, reject) => {

  const req = https.get(url, res => {
    const { statusCode } = res
    if (statusCode < 200 || statusCode >= 300) {
      return reject(new Error(`status:${statusCode}`))
    }

    let body = [];
    res.on('data', c => body.push(c))

    res.on('end', () => {
      try {
        body = JSON.parse(Buffer.concat(body).toString())
      } catch (e) {
        reject(e)
    }
    resolve(body)
    })
  })

  req.on('error', err => reject(err))
  req.end()
})

module.exports = { httpsGet }