const https = require('https');

module.exports = (link) => {
    https.get(link, (resp) => {
        let data = ''
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(data)
        });
        }).on("error", (err) => {
        console.log("Error: " + err.message);
        });
}