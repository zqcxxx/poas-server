const router = require('koa-router')();
const Question = require('../controller/question');

router.prefix('/question');

router.get('/', async (ctx) => {
    ctx.body = 'this is question router test'
})

router.post('/addquestions', Question.addquestions);

router.get('/delete/:id', Question.delete);

router.get('/getquestions/:pg/:num', Question.getquestions);

router.get('/getoptions/:id', Question.getoptions);

router.post('/editquestions', Question.editquestions);

router.get('/getquestioncount', Question.getquestioncount);

module.exports =  router
