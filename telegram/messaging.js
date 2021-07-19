const { ADMIN_ID } = require('../config')

class MesProcces {
  constructor(msg) {
    this.adminMode = setMode(true)
    this.userId = msg.from.id

  }

  setMode(ret = false) {
    const mode = msg.from.id == ADMIN_ID
    if (ret) return mode
    this.mode = mode
  }

  answer(text) {
    return `Hello, ${this.adminMode ? 'my master' : this.userName}. Your message was\n${msg.text}`
  }

}

const mesProcces = msg => {

  if (msg.from.id == ADMIN_ID) {
    return `Received your message, my master. The message is\n${msg.text}`
    
  } else {
    
    return `Received your message\n${msg.text}`
  }
}

module.exports = {mesProcces, MesProcces }