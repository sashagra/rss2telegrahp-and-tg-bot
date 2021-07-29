const { ADMIN_ID } = require('../config')

const mesProcces = msg => {

  if (msg.from.id == ADMIN_ID) {
    return `Received your message, my master. The message is\n${msg.text}`
    
  } else {
    
    return `Received your message\n${msg.text}`
  }
}

module.exports = { mesProcces }