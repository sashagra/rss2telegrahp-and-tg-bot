const fs = require('fs');
const path = require('path');

const rssFile = path.join(__dirname, 'rss.json')

class load {
    static async rssDataRead() {
        return new Promise((resolve, reject) => {
            fs.readFile(rssFile, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else  resolve(JSON.parse(content))
            })
        })
    }
}

module.exports = load;