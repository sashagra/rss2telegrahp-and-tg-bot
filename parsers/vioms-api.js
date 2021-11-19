const { httpsGet } = require('../helpers/https-get-promise')
const { RSS_URL } = require('../config')

let lastNewsId = 0

const sortNews = (data) => {
  const links = data.mailings.map(n => `https://www.vioms.ru/mailings/${n.id}`)
  lastNewsId = links[0]
  return links
}


const getAllLists = () => {
  return httpsGet('https://www.vioms.ru/api/mobile/v2/email_lists/')
}


const getNewsFromApi = () => {
  const listId = RSS_URL.split('email_lists/')[1].split('.')[0]
  const link = `https://www.vioms.ru/api/mobile/v2/email_lists/${listId}/mailings.json?page=1`
  return httpsGet(link).then(data => sortNews(data))
}


module.exports = { getAllLists, getNewsFromApi }