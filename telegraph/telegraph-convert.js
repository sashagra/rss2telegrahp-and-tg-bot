const cheerio = require('cheerio')
const { text } = require('cheerio/lib/api/manipulation')
const {decode} = require('html-entities')
const { CHANNEL_PICTURE_URL } = require('../config')

const domToTelegraphPost = dom => {
  const $ = cheerio.load(dom)
  const postNodes = []
  let postTitle = $('title').text()
  postTitle = postTitle.split('&quot;').join('"')
  let bigPictures = []
  $('img').each((idx, pic) => {
    if (pic.attribs.width) {
      if (pic.attribs.width >= 200) bigPictures.push(pic.attribs.src)
    } else {
      if (pic.attribs.style) {
        pic.attribs.style.split('; ').forEach(el => {
           if (el.slice(0, 5) === 'width') {
            if (el.split(':')[1].split('px')[0] >= 200) bigPictures.push(pic.attribs.src)
           }
        })
      }
    }
  })
  const pictureUrl = bigPictures.length ? bigPictures[0] : CHANNEL_PICTURE_URL

  postNodes.push({
    tag: 'img',
    attrs: {src: pictureUrl}
  })
  regex = /&.{2,6};/g
  $('p').each((idx, el) => {
    const p = el.replaceAll(regex, decode)
    if (p !== '') postNodes.push({tag: 'p', children: [p]})
  })

  
  return {
    postTitle,
    postNodes
  };
}

 
module.exports = {domToTelegraphPost}