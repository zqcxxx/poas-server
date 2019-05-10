const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const jwt = require('koa-jwt')

// 导入路由
const index = require('./routes/index')
const users = require('./routes/users')
const admin = require('./routes/admin')
const question = require('./routes/question')
const option = require('./routes/option')
const survey = require('./routes/survey')
const answer = require('./routes/answer')

// cors
app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
      return false
    }
    return 'http://localhost:9528'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// error handler
onerror(app)

// middlewares
const secret = 'poas_secret'
app.use(jwt({
  secret
}).unless({
  path: [ /\/login/, /\/getinfo/]
}))

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(question.routes(), question.allowedMethods())
app.use(option.routes(), option.allowedMethods())
app.use(survey.routes(), survey.allowedMethods())
app.use(answer.routes(), answer.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})
module.exports = app
