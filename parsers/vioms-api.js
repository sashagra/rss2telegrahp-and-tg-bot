const { httpsGet } = require('../helpers/https-get-promise')
const { RSS_URL } = require('../config')

let lastNewsId = 0

const sortNews = (data) => {
  const lastId = lastNewsId
  lastNewsId = data.mailings[0].id
  if (lastId === 0) return []
  const links = data.mailings
    .filter(n => n.id > lastNewsId)
    .map(n => `https://www.vioms.ru/mailings/${n.id}/full`)
  return links
}


const getAllLists = () => {
  return httpsGet('https://www.vioms.ru/api/mobile/v2/email_lists/')
}


const getNewsFromApi = async () => {
  const listId = RSS_URL.split('email_lists/')[1].split('.')[0]
  const link = `https://www.vioms.ru/api/mobile/v2/email_lists/${listId}/mailings.json?page=1`
  const data = await httpsGet(link)
  return sortNews(data)
}


module.exports = { getAllLists, getNewsFromApi }