const parseRss = require('./parsers/parseRss');
const parseNews = require('./parsers/parseNewsPage');
const { bot } = require('./telegram/tgApi')
const express = require('express')
const app = express()
const botAwaking = require('./botPushing')
const {APPLICATION_URL} = require('./config')
const PORT = process.env.PORT || 80 
const updateRssDalay = 10 // minutes

// console.log('bot is working ...')

// parseNews('https://www.vioms.ru/mailings/36449/full')
// parseNews('https://www.vioms.ru/mailings/36450/full')
// parseNews('https://www.vioms.ru/mailings/36451/full')

bot.on('message', (msg) => {
    console.log(msg)
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(msg.chat.id, `Received your message\n${msg.text}`);
  });

setInterval(() => {
    botAwaking(APPLICATION_URL);
    parseRss()
    .then((links) => {
        if (links && links.length) {
            links.reverse().forEach((link, idx) => {
                setTimeout(() => {
                    parseNews(link)
                }, 2000 * (idx + 1))
            })
        };
    })
        .catch(err => console.log(err));
}, 1000 * 60 * updateRssDalay)

app.get('*', (req, res) => {
    res.end('<h1>Bot is working...</h1>')
})

app.listen(PORT, () => console.log('Bot is working'))
// TODO большие посты в телеграф, малые в телегу
// TODO универсальный парсинг страничек
// TODO функция добавления чата или канала для постинга
// TODO выбор в диалоге, что постить