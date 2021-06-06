const {Router, response} = require('express')
const { bot } = require('../telegram/tgApi')
const parseMessage = require('../helpers/parseMessages').parseMessage
const router = Router()

const CHAT_IKIRTAN = '-598430375'
const TEST_CHAT_FOR_GTBOT ='-1001402888933'

router.get('/:text', (req, res) => {
    const message = parseMessage(req.params.text)
    res.json({status: 'OK', message, msg: 'This is CORS-enabled for a Single Route' })
    bot.sendMessage(CHAT_IKIRTAN, message)
})

router.post('/', (req, res) => {
    console.log(req)
    res.json({status: 'OK', msg: 'This is CORS-enabled for a Single Route'})
})

module.exports = router