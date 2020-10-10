const getNewsLinks = (newDataArr, previousDataArr) => {
  let newsArr = []
  previousDataArr = previousDataArr.map(el => el.link)
  // newDataArr.filter(el => el.data - new Date < 10)
  newDataArr = newDataArr.map(el => el.link)
  if (newDataArr[0] && previousDataArr[0]) {
    newDataArr.forEach(newLink => {
      const isPostedLink = previousDataArr.includes(newLink)
      if (!isPostedLink) newsArr.push(newLink)
    })
  } else {
    newsArr = 0
  }
  return newsArr
}

module.exports = { getNewsLinks }