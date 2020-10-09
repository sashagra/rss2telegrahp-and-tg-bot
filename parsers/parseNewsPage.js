const https = require('https');
const htmlparser2 = require('htmlparser2');
const { domToTelegraphPost } = require('../telegraph/telegraphConvert')
const createTelegraphPost = require('../telegraph/telegraph');
const { NAME_OF_CHANNEL } = require('../config');
const { telegramPost, telegramPostMarkdown, telegramPostHtml } = require('../telegram/tgApi');
const schedulePost = require('../custom-posts/schedule')

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
            if (postTitle.slice(0, scheduleTitle.length) !== 'scheduleTitle') {
                    createTelegraphPost(
                        postTitle,
                        NAME_OF_CHANNEL,
                        JSON.stringify(postNodes),
                        link
                        );
                } else {
                    telegramPostHtml(schedulePost('HTML', link))
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