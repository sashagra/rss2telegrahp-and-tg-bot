const getNewsLinks = (newDataArr, previousDataArr) => {
  let newsArr = []
  previousDataArr = previousDataArr.map(el => el.link)
  newDataArr = newDataArr.map(el => el.link)
  if (newDataArr[0] && previousDataArr[0]) {
    newDataArr.forEach(newLink => {
      const isPostedLink = previousDataArr.includes(newLink)
      if (!isPostedLink) newsArr.push(newLink)
    })
  } else {
    newsArr = 0
  }
  console.log(newsArr.length)
  return newsArr
}

module.exports = { getNewsLinks }