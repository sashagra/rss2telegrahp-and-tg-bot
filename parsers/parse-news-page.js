const https = require('https');
const htmlparser2 = require('htmlparser2');
const { domToTelegraphPost } = require('../telegraph/telegraph-convert')
const createTelegraphPost = require('../telegraph/telegraph');
const { NAME_OF_CHANNEL } = require('../config');
const { bot } = require('../telegram/bot-init');
const { CHAT_ID: news_channel_id } = require('../config')

const parseNews = (link) => {
    const scheduleTitle = 'Расписание лекций'
    https.get(link, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
        data += chunk;
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
            );

        } else {
            console.log('Пост не отправлен')
        }
    });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

module.exports = parseNews;