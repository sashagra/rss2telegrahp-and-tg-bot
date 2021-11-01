const parseNews = require('./parsers/parseNewsPage')
const link = process.argv[2]
parseNews(link)
