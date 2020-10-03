const cheerio = require('cheerio')
const { CHANEL_PICTURE_URL } = require('../config')

const domToTelegraphPost = dom => {
  const $ = cheerio.load(dom)
  const postNodes = []
  let postTitle = $('title').text()
  const quoteMark = '&quot;'
  postTitle = postTitle.split(quoteMark).join('"')
  const pictureUrl = $('img')[0] ? $('img')[0].attribs.src : CHANEL_PICTURE_URL
  //TODO проверка по размеру картинки
  //TODO 
  postNodes.push({
    tag: 'img',
    attrs: {src: pictureUrl}
  })
  $('p').each((idx, el) => {
    const p = $(el).text().trim().split('&nbsp;').join('').split('&#39;').join('"')
    // console.log('=================================\n', p)
    if (p !== '&nbsp;' && p !== '') postNodes.push({tag: 'p', children: [p]})
  } )

  
  return {
    postTitle,
    postNodes
  };
}
 
module.exports = {domToTelegraphPost}