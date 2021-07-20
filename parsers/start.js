const parseRss = require('./parse-rss')
const parseNews = require('./parse-news-page')
const { CHECK_RSS_DELAY } = require('../config')
const { logger } = require('../logging/logging')


const parseFunc = () => {
    let fixNews
    logger.info('Parse news')
    parseRss()
    .then((links) => {
        if (links && links.length) {
            if (fixNews && fixNews === links[0]) return // fix doubles of news
            fixNews = links[0]
            logger.info(`Incomming news: ${links.join(', ')} item/s`)
            links.reverse().forEach((link, idx) => {
                setTimeout(() => {
                    parseNews(link)
                }, 20000 * (idx + 1))
            })
        } else {
            logger.info('No incomming news')
        }})
        .catch(err => logger.error(err))
}

module.exports = { parseFunc }