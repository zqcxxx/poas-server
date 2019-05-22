const router = require('koa-router')()
const Admin = require('../controller/admin')

router.prefix('/api/users')

router.get('/', function (ctx, next) {
  console.log(ctx)
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  // ctx.body = 'this is a users/bar response'
  let json = { 'a' : '2', 'b' : '3'}
  ctx.body = json
})

router.post('/login', Admin.login)

module.exports = router
