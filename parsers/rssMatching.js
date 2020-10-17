const isNewPost = require('../helpers/compareDate')

const getNewsLinks = (newDataArr, previousDataArr) => {
  let newsLinks = []
  previousDataArr = previousDataArr.map(el => el.link)
  newDataArr.forEach(n => {
    const isPostedLink = previousDataArr.includes(n.link)
    if (!isPostedLink && isNewPost(n.date)) newsLinks.push(n.link)
  })
  return {newsLinks, isWriteFile: newDataArr[0].link !== previousDataArr[0]}
}

module.exports = { getNewsLinks }