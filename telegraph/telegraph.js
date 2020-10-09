const { httpsPost } = require('../helpers/httpsPostPromise')
const { telegramPost } = require('../telegram/tgApi');
const { ACCESS_TOKEN, AUTH_URL } = require('../config')


const createTelegraphPost = (title, authorName, content, authorUrl = "") => {
  httpsPost('api.telegra.ph', '/createPage', {
    access_token: ACCESS_TOKEN,
    title,
    author_name: authorName,
    author_url: authorUrl,
    content
  })
  .then(data => {
    const telegraphPostUrl = data.result.url
    telegramPost(telegraphPostUrl)
  })
  .catch(err => console.log('from post', err));

}

module.exports = createTelegraphPost