const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '.env')
});

module.exports = {
  TOKKEN: process.env.BOT_TOKKEN,
  CHAT_ID: process.env.CHAT_ID,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  AUTH_URL: process.env.AUTH_URL,
  NAME_OF_CHANEL: 'Новости минской общины',
  RSS_URL: 'https://www.vioms.ru/email_lists/151.rss',
  CHANEL_PICTURE_URL: 'https://krishna.by/images/yootheme/logo.png'
};