const isNewPost = require('../helpers/compare-date')

const getNewsLinks = newDataArr => {
  let newsLinks = []
  newDataArr.forEach(n => {
    if (isNewPost(n.date)) newsLinks.push(n.link)
  })
  return newsLinks
}

module.exports = { getNewsLinks }