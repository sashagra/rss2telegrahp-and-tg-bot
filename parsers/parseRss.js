let Parser = require('rss-parser');
const path = require('path');
let parser = new Parser();
const fs = require('fs');
const load = require('../data/loadDB')
const { RSS_URL } = require('../config');
const { getNewsLinks } = require('./rssMatching')

module.exports = async () => {
  const rssPreviousData = await load.rssDataRead()
  const rssNewData = []

  let feed = await parser.parseURL(RSS_URL);
  feed.items.forEach(item => {
    rssNewData.push({title: item.title, link: item.link + '/full', date: item.pubDate});
  });

  const {newsLinks, isWriteFile} = getNewsLinks(rssNewData, rssPreviousData)
  if (isWriteFile) {
    fs.writeFile(path.join(__dirname, '..', 'data', 'rss.json'), JSON.stringify((rssNewData)), (err) => {
      if (err) throw err;
    });
    console.log('Новые данные записаны', new Date().toLocaleTimeString())
    console.log(newsLinks)
    if (newsLinks.length) return newsLinks
  } else {
    console.log('Данные актуальны',  new Date().toLocaleTimeString())
    return 0
  }
    
};