const router = require('koa-router')()
const Answer = require('../controller/answer')

router.prefix('/answer')

router.post('/submitanswer', Answer.submitanswer)

module.exports = router
