const router = require('koa-router')()
const Admin = require('../controller/admin')

router.prefix('/api/admin')

router.post('/login', Admin.login)

router.get('/getinfo', Admin.getinfo)

router.post('/logout', Admin.logout)

module.exports = router
