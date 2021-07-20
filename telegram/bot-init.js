const TelegramBot = require('node-telegram-bot-api');
const { logger } = require('../logging/logging')
const { TOKKEN } = require('../config')
const { mesProcces, MesProcces } = require('./messaging')
const { CHAT_ID: newsChatId } = require('../config')

// creating tg bot
const bot = new TelegramBot(TOKKEN, {polling: {
    interval: 300,
    autoStart: true,
    params: {
        timeout: 10
    }
}});

const arrOfUsers = []

bot.on('message', (msg) => {
    logger.info('Incoming message: ' + JSON.stringify(msg))
    // message process
    const answer = mesProcces(msg)
    // bot.sendMessage(newsChatId, `Received your message\n${msg.text}`);
    bot.sendMessage(msg.chat.id, answer)
});
logger.warn('Bot was started')

function telegramPost(msg) {
    bot.sendMessage(newsChatId, msg)
}

module.exports = { telegramPost }