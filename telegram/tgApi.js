const TelegramBot = require('node-telegram-bot-api');
const { TOKKEN, CHAT_ID } = require('../config');
const { CHANNEL_PICTURE_URL } = require('../config');

const bot = new TelegramBot(TOKKEN, {polling: {
    interval: 300,
    autoStart: true,
    params: {
        timeout: 10
    }
}});

module.exports = {
    telegramPost: (message, pictureUrl = 0) => {
        if (pictureUrl) bot.sendPhoto(CHAT_ID, pictureUrl)
        bot.sendMessage(CHAT_ID, message);
    },
    bot,
    telegramPostMarkdown: (message, pictureUrl = 0) => {
        if (pictureUrl) bot.sendPhoto(CHAT_ID, pictureUrl)
        bot.sendMessage(CHAT_ID, message, {
            parse_mode: "MarkdownV2"
        }); 
    },
    telegramPostHtml: (message, pictureUrl = 0) => {
        if (pictureUrl) bot.sendPhoto(CHAT_ID, pictureUrl)
        bot.sendMessage(CHAT_ID, message, {
            parse_mode: "HTML"
        }); 
    },
}