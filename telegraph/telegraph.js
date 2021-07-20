const { httpsPost } = require('../helpers/https-post-promise')
const { telegramPost } = require('../telegram/bot-init');
const { ACCESS_TOKEN, AUTH_URL } = require('../config')
const { logger } = require('../logging/logging')


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
  .catch(err => logger.error('from post', err));

}

module.exports = createTelegraphPost