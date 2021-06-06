const parseMessage = text => {
    if (text.slice(0, 10) == 'kirtanform') {
        const formData = text.split('()')
        return `Сообщение с сайта Kirtan Fest
        От: ${formData[1]}
        Телефон: ${formData[2]}
        Email: ${formData[3]}
        Сообщение: ${formData[4]}`
        
    } else {
        return text
    }
}

module.exports = { parseMessage }