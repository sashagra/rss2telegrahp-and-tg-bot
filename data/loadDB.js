const fs = require('fs');
const path = require('path');

const rssFile = path.resolve(__dirname, 'rss.json')
const jsonData = '[{"title":"Воскресная он-лайн лекция ЕМ Сарвагьи прабху.","link":"https://www.vioms.ru/mailings/36425/full","date":"Sat, 03 Oct 2020 17:22:00 +0300"}]'

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
    static async checkAndCreateFile() {
        fs.access(rssFile, (err) => {
            if (err) {
                fs.writeFile(rssFile, jsonData, (err) => {
                    if (err) {
                        resolve(false)
                    }
                })
            }
        })
    }
}

module.exports = load;