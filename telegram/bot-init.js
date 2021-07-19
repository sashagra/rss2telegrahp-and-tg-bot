const TelegramBot = require('node-telegram-bot-api');
const { logger } = require('../logging/logging')
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

bot.on('message', (msg) => {
    logger.info(JSON.stringify(msg))
    // bot.sendMessage(newsChatId, `Received your message\n${msg.text}`);
    bot.sendMessage(msg.chat.id, `Received your message\n${msg.text}`);
});