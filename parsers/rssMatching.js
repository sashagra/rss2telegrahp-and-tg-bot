const getNewsLinks = (newDataArr, oldDataArr) => {
  let newsArr = []
  oldDataArr = oldDataArr.map(el => el.link)
  newDataArr = newDataArr.map(el => el.link)
  if (newDataArr[0] && oldDataArr[0]) {
    newDataArr.forEach(newLink => {
      const isNewLink = oldDataArr.includes(newLink)
      if (!isNewLink) newsArr.push(newLink)
    })
  } else {
    newsArr = 0
  }
  console.log(newsArr.length)
  return newsArr
}

module.exports = { getNewsLinks }