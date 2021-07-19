const parseRss = require('./parse-rss');
const parseNews = require('./parsers/parseNewsPage');


const parseFunc = () => {
    let fixNews
    parseRss()
    .then((links) => {
        bot.sendMessage(504623509, 'Pasrse news');
        if (links && links.length) {
            if (fixNews && fixNews === links[0]) return // fix doubles of news
            fixNews = links[0]
            bot.sendMessage(504623509, `Incomming news: ${links.join(', ')} item/s`);
            console.log(`Incomming news: ${links.join(', ')} item/s`)
            links.reverse().forEach((link, idx) => {
                setTimeout(() => {
                    parseNews(link)
                }, 20000 * (idx + 1))
            })
        }})
        .catch(err => console.log(err));
} 

module.exports = { parseFunc }