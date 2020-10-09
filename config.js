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
  NAME_OF_CHANNEL: process.env.NAME_OF_CHANNEL,
  RSS_URL: process.env.RSS_URL,
  CHANNEL_PICTURE_URL: process.env.CHANNEL_PICTURE_URL,
  APPLICATION_URL: process.env.APPLICATION_URL
};