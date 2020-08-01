const router = require('koa-router')()
const Answer = require('../controller/answer')

router.prefix('/answer')

router.post('/submitanswer', Answer.submitanswer)

router.get('/getanswer/:id', Answer.getanswer)

module.exports = router
