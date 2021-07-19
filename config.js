const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '.env')
});

module.exports = {
  TOKKEN: process.env.BOT_TOKKEN,
  CHAT_ID: process.env.CHAT_ID, // default channel id to post news
  ADMIN_ID: process.env.ADMIN_ID, // bot admin id
  ACCESS_TOKEN: process.env.ACCESS_TOKEN, // telegra.ph api token
  AUTH_URL: process.env.AUTH_URL, // telegra.ph api url
  NAME_OF_CHANNEL: 'Новости-минской-общины',
  RSS_URL: 'https://www.vioms.ru/email_lists/151.rss', // default uptl to parse news
  CHANNEL_PICTURE_URL: 'https://krishna.by/images/yootheme/logo.png',
  CHECK_RSS_DELAY: 10 // min
};