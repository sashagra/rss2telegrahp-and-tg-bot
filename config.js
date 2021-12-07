const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.join(__dirname, '.env')
});

module.exports = {
  TOKKEN: process.env.BOT_TOKKEN,
  CHAT_ID: process.env.CHAT_ID, // default channel id to post news
  ADMIN_ID: process.env.ADMIN_ID, // bot admin id
  ACCESS_TOKEN: process.env.ACCESS_TOKEN, // telegra.ph api token
  AUTH_URL: process.env.AUTH_URL, // telegra.ph api url
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  NAME_OF_CHANNEL: 'Новости-минской-общины',
  RSS_URL: 'https://www.vioms.ru/email_lists/151.rss',
  CHANNEL_PICTURE_URL: 'https://sattvalife.ru/services/img/minskhk.jpg',
  CHECK_RSS_DELAY: 1, // min
  PARSE_METHOD: 'api' // choose one: api/email/rss. You need to provide valid credantials in .env file
}