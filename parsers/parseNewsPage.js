const https = require('https');
const htmlparser2 = require('htmlparser2');
const { domToTelegraphPost } = require('../telegraph/telegraphConvert')
const createTelegraphPost = require('../telegraph/telegraph');
const { NAME_OF_CHANEL } = require('../config');
const {telegramPost} = require('../telegram/tgApi');
const parseNews = (link) => {

    https.get(link, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
        data += chunk;
    });
    resp.on('end', () => {
        let dom = htmlparser2.parseDOM(data);
        const { postNodes, postTitle} = domToTelegraphPost(dom)
        if (postTitle && postNodes) {
            const scheduleTitle = 'Расписание лекций'
            if (postTitle.slice(0, scheduleTitle.length) !== scheduleTitle) {
                    createTelegraphPost(
                        postTitle,
                        NAME_OF_CHANEL,
                        JSON.stringify(postNodes),
                        link
                        );
                } else {
                    telegramPost(`${postTitle}\n\n${link.slice(0, link.length - 5)}`)
                }
        } else {
            console.log('Пост не отправлен')
        }
    });
    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}

module.exports = parseNews;