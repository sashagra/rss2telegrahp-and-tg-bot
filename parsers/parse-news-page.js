const https = require('https')
const htmlparser2 = require('htmlparser2')
const { logger } = require('../logging/logging')
const { domToTelegraphPost } = require('../telegraph/telegraph-convert')
const createTelegraphPost = require('../telegraph/telegraph')
const { NAME_OF_CHANNEL } = require('../config')
const { CHAT_ID: news_channel_id } = require('../config')

const parseNews = (link) => {
    https.get(link, (resp) => {
    let data = ''
    resp.on('data', (chunk) => {
        data += chunk
    });
    resp.on('end', () => {
        let dom = htmlparser2.parseDOM(data);
        const { postNodes, postTitle} = domToTelegraphPost(dom)
        if (postTitle && postNodes) {
            
            createTelegraphPost(
                postTitle,
                NAME_OF_CHANNEL,
                JSON.stringify(postNodes),
                link
            )

        } else {
            logger.warn('Post have not been sended')
        }
    });
    }).on("error", (err) => {
        logger.err(JSON.stringify(err))
    })
}

module.exports = parseNews