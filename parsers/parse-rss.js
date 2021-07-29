let Parser = require('rss-parser')
let parser = new Parser()
const { RSS_URL } = require('../config')
const { getNewsLinks } = require('./rss-matching')

module.exports = async () => {
  const rssNewData = []
  let feed = await parser.parseURL(RSS_URL);
  feed.items.forEach(item => {
    rssNewData.push({title: item.title, link: item.link + '/full', date: item.pubDate});
  });

  const newsLinks = getNewsLinks(rssNewData)
  return newsLinks.length ? newsLinks : 0
};