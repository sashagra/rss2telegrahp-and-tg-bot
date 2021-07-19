const TelegramBot = require('node-telegram-bot-api');

const { TOKKEN } = require('../config')
const { CHAT_ID: newsChatId } = require('../config')

// creating tg bot
const bot = new TelegramBot(TOKKEN, {polling: {
    interval: 300,
    autoStart: true,
    params: {
        timeout: 10
    }
}});

// testing code


bot.on('message', (msg) => {
    console.log(msg)
    bot.sendMessage(newsChatId, `Received your message\n${msg.text}`);
    // bot.sendMessage(msg.chat.id, `Received your message\n${msg.text}`);
});