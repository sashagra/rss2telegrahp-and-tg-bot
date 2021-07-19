const { parseFunc } = require('./parsers/parse-func')
const { CHECK_RSS_DELAY } = require('./config')

require('./telegram/bot-init')
const { logger } = require('./logging/logging');

logger.info('Bot was started')
logger.info(`Start checking RSS feed with delay ${CHECK_RSS_DELAY} minutes`)

setInterval(parseFunc, CHECK_RSS_DELAY * 3600 * 1000 )


// TODO большие посты в телеграф, малые в телегу
// TODO универсальный парсинг страничек
// TODO функция добавления чата или канала для постинга
// TODO выбор в диалоге, что постить
// TODO в первый запуск публиковать только сегодняшние посты или никакие.
