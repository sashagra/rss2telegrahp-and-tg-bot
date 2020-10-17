const isNewPost = postDate => {
    const days = 1

    const prevDate = new Date(postDate).toLocaleString().split(' ')[0].split('-')
    const now = new Date().toLocaleString().split(' ')[0].split('-')
    // date format [yyyy, mm, dd]
    console.log(prevDate, now)
    if (prevDate[0] === now[0]) {
        if (prevDate[1] === now[1]) {
                if (now[2] - prevDate[2] < days) {
                    return 1
                }
            }
        }
    return 0

}
module.exports = isNewPost