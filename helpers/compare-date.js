const { CHECK_RSS_DELAY } = require('../config')

const isNewPost = postDate => {
    const msToCheckNews = CHECK_RSS_DELAY * 60 * 1000 + 500
    const prevDate = new Date(postDate)
    const now = new Date()
    if (now - prevDate < msToCheckNews) return 1
    return 0

}
module.exports = isNewPost