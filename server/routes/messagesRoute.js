const router = require('express').Router()

const { getAllMessage , addMessage } = require('../controllers/messagesController')


router.post('/addMsg',addMessage)
router.get('/getMsg',getAllMessage)

module.exports = router