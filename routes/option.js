const router = require('koa-router')()
const Option = require('../controller/option')

router.prefix('/api/option')

router.post('/addoption', Option.addoption)

router.get('/getoption/:id', Option.getoption)

router.get('/deloption/:id', Option.deloption)

router.post('/editoption', Option.editoption)

module.exports = router
