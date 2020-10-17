const isNewPost = postDate => {
    const days = 1
    const msPerDay = 24 * 60 * 60 * 1000
    const prevDate = new Date(postDate)
    const now = new Date()
    if (now - prevDate < days * msPerDay) return 1
    return 0

}
module.exports = isNewPost