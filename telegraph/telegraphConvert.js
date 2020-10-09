const cheerio = require('cheerio')
const { CHANEL_PICTURE_URL } = require('../config')

const domToTelegraphPost = dom => {
  const $ = cheerio.load(dom)
  const postNodes = []
  let postTitle = $('title').text()
  const quoteMark = '&quot;'
  postTitle = postTitle.split(quoteMark).join('"')
  let bigPictures = []
  $('img').each((idx, pic) => {
    if (pic.attribs.width) {
      if (pic.attribs.width >= 300) bigPictures.push(pic.attribs.src)
    } else {
      if (pic.attribs.style) {
        pic.attribs.style.split('; ').forEach(el => {
           if (el.slice(0, 5) === 'width') {
            if (el.split(':')[1].split('px')[0] >= 300) bigPictures.push(pic.attribs.src)
           }
        })
      }
    }
  })
  const pictureUrl = bigPictures.length ? bigPictures[0] : CHANEL_PICTURE_URL

  postNodes.push({
    tag: 'img',
    attrs: {src: pictureUrl}
  })
  $('p').each((idx, el) => {
    const p = replaceSymbol($(el).text().trim())
    if (p !== '&nbsp;' && p !== '') postNodes.push({tag: 'p', children: [p]})
  } )

  
  return {
    postTitle,
    postNodes
  };
}

const replaceSymbol = txt => {
  const replacementTable = [
    ['&ndash;', '–'],
    ['&nbsp;', ''],
    ['&#39;', '"'],
    ['&times;', '×'],
    ['&asymp;', '≈'],
    ['&quot;', '"'],
    ['(Гость)', ''],
    ['&copy;', '©']
  ]

  replacementTable.forEach(sym => {
    txt = txt.split(sym[0]).join(sym[1])
  })
    // console.log(txt)
  return txt
}
 
module.exports = {domToTelegraphPost}