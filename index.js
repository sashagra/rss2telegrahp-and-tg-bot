require('./telegram/bot-init')
const { logger } = require('./logging/logging');

logger.info('Bot was started')


// TODO большие посты в телеграф, малые в телегу
// TODO универсальный парсинг страничек
// TODO функция добавления чата или канала для постинга
// TODO выбор в диалоге, что постить
// TODO в первый запуск публиковать только сегодняшние посты или никакие.
