const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const error = require('./utils/error')
const cors = require('koa2-cors');
const koaStatic = require("koa-static")
const koaBody = require('koa-body')
const path = require('path')

const index = require('./routes/index')
const admins = require('./routes/admin')
const user = require('./routes/user')
const shop = require('./routes/shop')
const type = require('./routes/type')
const order = require('./routes/order')
const upload = require('./routes/upload')

require('./db/connect') //连接数据库

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(error)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
app.use(cors({
  origin: function (ctx) {
          return "*"; // 允许来自所有域名请求  
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  // credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(koaStatic(path.join(__dirname,'./public')))
app.use(koaBody({
  enableTypes:['json', 'form', 'text'],
  multipart:true,
  formidable:{
    keepExtensions:true,
    uploadDir:path.join(__dirname,'./public/upload')
  }
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
app.use(admins.routes(), admins.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(shop.routes(), shop.allowedMethods())
app.use(type.routes(), type.allowedMethods())
app.use(order.routes(), order.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
