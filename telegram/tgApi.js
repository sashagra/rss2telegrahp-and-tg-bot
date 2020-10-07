const TelegramBot = require('node-telegram-bot-api');
const { TOKKEN, CHAT_ID } = require('../config');

const bot = new TelegramBot(TOKKEN, {polling: {
    interval: 300,
    autoStart: true,
    params: {
        timeout: 10
    }
}});

module.exports = {
    telegramPost: (message) => {
        bot.sendMessage(CHAT_ID, message); 
    },
    bot,
    telegramPostMarkdown: (message) => {
        bot.sendMessage(CHAT_ID, message, {
            parse_mode: "MarkdownV2"
        }); 
    },
    telegramPostHtml: (message) => {
        bot.sendMessage(CHAT_ID, message, {
            parse_mode: "HTML"
        }); 
        const url = 'https://telegram.org/img/t_logo.png';
        bot.sendPhoto(CHAT_ID, url);
    },
}