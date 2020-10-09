const scheduleTitle = 'Расписание лекций на неделю'

const schedulePost = (type, link) => type === "HTML"
?
`<b>${scheduleTitle}</b>

${link}`
: 
`*${scheduleTitle}*
    
[Смотрите по ссылке](${link})`

module.exports = schedulePost