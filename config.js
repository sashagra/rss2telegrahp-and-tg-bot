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
  NAME_OF_CHANNEL: "Новости минской общины",
  RSS_URL: process.env.RSS_URL,
  CHANNEL_PICTURE_URL: "https://krishna.by/images/yootheme/logo.png",
  APPLICATION_URL: process.env.APPLICATION_URL
};