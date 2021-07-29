const TelegramBot = require('node-telegram-bot-api')
const { logger } = require('../logging/logging')
const { TOKKEN } = require('../config')
const { mesProcces } = require('./messaging')
const { CHAT_ID: newsChatId } = require('../config')

// creating tg bot
const bot = new TelegramBot(TOKKEN, {polling: {
    interval: 300,
    autoStart: true,
    params: {
        timeout: 10
    }
}})

bot.on('message', (msg) => {
    logger.info('Incoming message: ' + JSON.stringify(msg))
    const answer = mesProcces(msg)
    bot.sendMessage(msg.from.id, answer)
});
logger.warn('Bot was started')

function telegramPost(msg) {
    bot.sendMessage(newsChatId, msg)
}

module.exports = { telegramPost }