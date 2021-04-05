const parseRss = require('./parsers/parseRss');
const parseNews = require('./parsers/parseNewsPage');
const { bot } = require('./telegram/tgApi')
const express = require('express')
const app = express()
// const botAwaking = require('./botPushing')
// const {APPLICATION_URL} = require('./config')
const PORT = process.env.PORT || 80 
// const updateRssDalay = 11 // minutes

// console.log('bot is working ...')

// parseNews('https://www.vioms.ru/mailings/36449/full')
// parseNews('https://www.vioms.ru/mailings/36450/full')
// parseNews('https://www.vioms.ru/mailings/36496/full')



bot.on('message', (msg) => {
    console.log(msg)
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(msg.chat.id, `Received your message\n${msg.text}`);
  });

// setInterval(() => {
    // botAwaking(APPLICATION_URL);
    // }, 1000 * 60 * updateRssDalay)
    
    app.get('*', (req, res) => {
        res.end(`<h1>Bot is working...</h1><p>${JSON.stringify(req)}</p>`)
        bot.sendMessage(504623509, `We have th  request\n${JSON.stringify(req)}`);
        
        parseRss()
            .then((links) => {
                if (links && links.length) {
                    bot.sendMessage(504623509, `Incomming news: ${links} item/s`);
                    console.log(`Incomming news: ${links} item/s`)
                    links.reverse().forEach((link, idx) => {
                        setTimeout(() => {
                            parseNews(link)
                        }, 20000 * (idx + 1))
                    })
                } else {
                    console.log('No news to parse')
                };
            })
            .catch(err => console.log(err));

})

app.listen(PORT, () => console.log('Bot is working...'))
// TODO большие посты в телеграф, малые в телегу
// TODO универсальный парсинг страничек
// TODO функция добавления чата или канала для постинга
// TODO выбор в диалоге, что постить
// TODO в первый запуск публиковать только сегодняшние посты или никакие.
// TODO проверять есть ли rss.json и сооздавать если нету
