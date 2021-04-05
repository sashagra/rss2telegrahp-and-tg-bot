const isNewPost = postDate => {
    const msToCheckNews = 40 * 60 * 1000 + 1
    const prevDate = new Date(postDate)
    const now = new Date()
    if (now - prevDate < msToCheckNews) return 1
    return 0

}
module.exports = isNewPost