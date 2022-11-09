const router = require('express').Router()

const { getAllMessage , addMessage } = require('../controllers/messagesController')


router.post('/addMsg',addMessage)
router.post('/getMsg',getAllMessage)

module.exports = router