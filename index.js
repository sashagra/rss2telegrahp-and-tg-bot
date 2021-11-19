const { logger } = require('./logging/logging')
const { parseFunc } = require('./parsers/start')
const { CHECK_RSS_DELAY } = require('./config')
require('./telegram/bot-init')

logger.info(`Start checking RSS feed with delay ${CHECK_RSS_DELAY} minutes`)
setInterval(parseFunc, CHECK_RSS_DELAY * 300 )


// TODO большие посты в телеграф, малые в телегу
// TODO универсальный парсинг страничек
// TODO функция добавления чата или канала для постинга
// TODO выбор в диалоге, что постить