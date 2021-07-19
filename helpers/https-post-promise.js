const https = require('https');

const httpsPost = (url, path, data) => new Promise((resolve, reject) => {
    data = JSON.stringify(data)

    const params = {
        method: 'POST',
        hostname: url,
        path: path,
        headers: {
          'Content-Type': 'application/json'
        },
      };
  const req = https.request(params, res => {
    const { statusCode } = res;
    if (statusCode < 200 || statusCode >= 300)
      return reject(new Error(`status:${statusCode}`));

    let body = [];
    res.on('data', c => body.push(c));

    res.on('end', () => {
      try {
        body = JSON.parse(Buffer.concat(body).toString());
      } catch (e) {
        reject(e);
    }
    resolve(body);
    });
  });

  req.on('error', err => reject(err));
  if (data)
    req.write(data);
  req.end();
});

module.exports = { httpsPost };