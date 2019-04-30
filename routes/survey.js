const router = require('koa-router')();

const Survey =  require('../controller/survey')

router.prefix('/survey')

router.get('/getsurveys/:pg/:num', Survey.getsurveys);

router.get('/delsurvey/:id', Survey.delsurvey);

router.post('/addsurvey', Survey.addsurvey);

router.post('/editsurvey', Survey.editsurvey);

router.get('/getsurvey/:id', Survey.getsurvey);
