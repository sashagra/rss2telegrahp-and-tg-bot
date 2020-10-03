const getNewsLinks = (newDataArr, oldDataArr) => {
  let newsArr = []
  if (newDataArr[0] && oldDataArr[0]) {
    newDataArr.forEach(el => {
        for (let i = 0; i < 5; i++) {
          if (oldDataArr[i].link === el.link) {
            newsArr.push(el.link);
            i = 5
          }
        }
    })
  } else {
    newsArr = 0
  }
  return newsArr
}

module.exports = { getNewsLinks }