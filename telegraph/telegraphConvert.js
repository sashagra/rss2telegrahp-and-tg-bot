const cheerio = require('cheerio')
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
    ['&copy;', '©'],
    ['&mdash;', '—'],
    ['&laquo;', '«'],
    ['&raquo;', '»'],
    ['&bull;', '•'],
    ['&gt;', '>']
  ]

  replacementTable.forEach(sym => {
    txt = txt.split(sym[0]).join(sym[1])
  })
    // console.log(txt)
  return txt
}
 
module.exports = {domToTelegraphPost}