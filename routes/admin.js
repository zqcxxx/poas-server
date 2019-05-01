const router = require('koa-router')()
const Admin = require('../controller/admin')

router.prefix('/admin')

router.post('/login', Admin.login)

router.get('/getinfo', Admin.getinfo)

module.exports =  router
