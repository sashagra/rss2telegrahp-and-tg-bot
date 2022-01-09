const parseRss = require('./parse-rss')
const parseNews = require('./parse-news-page')
const newsFromMail = require('./mail-parser')
const { getNewsFromApi } = require('./vioms-api')
const { logger } = require('../logging/logging')
const { PARSE_METHOD } = require('../config')

const parsers = {
    rss: parseRss,
    email: newsFromMail,
    api: getNewsFromApi
}


const parseFunc = () => {
    let fixNews
    logger.info('Parse news')
    parsers[PARSE_METHOD]()
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
            }
        })
        .catch(err => logger.error(JSON.stringify(err)))
}

module.exports = { parseFunc }