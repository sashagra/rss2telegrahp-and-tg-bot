const parseRss = require('./parsers/parseRss');
const parseNews = require('./parsers/parseNewsPage');
const { bot } = require('./telegram/tgApi')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

const parseFunc = () => {
    let fixNews
    parseRss()
    .then((links) => {
        bot.sendMessage(504623509, 'Pasrse news');
        if (links && links.length) {
            if (fixNews && fixNews === links[0]) return // fix doubles of news
            fixNews = links[0]
            bot.sendMessage(504623509, `Incomming news: ${links} item/s`);
            console.log(`Incomming news: ${links} item/s`)
            links.reverse().forEach((link, idx) => {
                setTimeout(() => {
                    parseNews(link)
                }, 20000 * (idx + 1))
            })
        }})
        .catch(err => console.log(err));
}        

bot.on('message', (msg) => {
    console.log(msg)
    bot.sendMessage(msg.chat.id, `Received your message\n${msg.text}`);
});


app.get('/', (req, res, next) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  });

app.get('/16108', (req, res) => {
    if (req.originalUrl === "/16108") {
        parseFunc()
        res.json({status: "News parsing started"})
    }
})

app.get('/message/:text', (req, res) => {
    bot.sendMessage(-598430375, req.params.text)
    res.json({status: 'OK', message: req.params.text})
})

app.listen(PORT, () => console.log('Bot is working...'))
// TODO большие посты в телеграф, малые в телегу
// TODO универсальный парсинг страничек
// TODO функция добавления чата или канала для постинга
// TODO выбор в диалоге, что постить
// TODO в первый запуск публиковать только сегодняшние посты или никакие.
