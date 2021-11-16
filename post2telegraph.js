const parseNews = require('./parsers/parseNewsPage')
const id = process.argv[2]
// parseNews('https://www.vioms.ru/mailings/' + id + '/full')
parseNews(id)
