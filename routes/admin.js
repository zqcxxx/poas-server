const router = require('koa-router')()
const Admin = require('../controller/admin')

router.prefix('/admin')

router.post('/login', Admin.login)

module.exports =  router
