const router = require('koa-router')()
const Question = require('../controller/question')

router.prefix('/api/question')

router.post('/addquestions', Question.addquestions)

router.get('/delete/:id', Question.delete)

router.get('/getquestions/:pg/:num', Question.getquestions)

router.get('/getoptions/:id', Question.getoptions)

router.post('/editquestions', Question.editquestions)

router.get('/getquestioncount', Question.getquestioncount)

router.get('/getallquestions', Question.getallquestions)

module.exports = router
