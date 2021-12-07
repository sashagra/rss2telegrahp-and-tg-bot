const { logger } = require('./logging/logging')
const { parseFunc } = require('./parsers/start')
const { CHECK_RSS_DELAY, PARSE_METHOD } = require('./config')
require('./telegram/bot-init')

logger.info(`Start checking news from ${PARSE_METHOD} with delay ${CHECK_RSS_DELAY} minutes`)
setInterval(parseFunc, CHECK_RSS_DELAY * 60 * 1000 )


// TODO большие посты в телеграф, малые в телегу
// TODO универсальный парсинг страничек
// TODO функция добавления чата или канала для постинга
// TODO выбор в диалоге, что постить