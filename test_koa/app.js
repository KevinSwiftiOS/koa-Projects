const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
//jwt_token的引入
const jwt = require('jsonwebtoken');
const jwtKoa = require("koa-jwt");
//跨域引入
var cors = require("koa2-cors");
const login = require('./routes/api/Login');
const getUser = require('./routes/api/getUser');
const app = new Koa();
const router = new Router();
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
//处理跨域操作
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));
const secret = 'secret';
//jwttoken的设置
app.use(jwtKoa({secret}).unless(
    {
      path: [/^\/api\/login/] //数组中的路径不需要通过jwt验证
    }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// routes 配置路由
router.use("/api/login",login);
router.use("/api/getuser",getUser);
app.use(router.routes()).use(router.allowedMethods());


// error-handling
// app.on('error', (err, ctx) => {
// if(err.message == 'Authentication Error') {
//   console.log(223344);
//   ctx.body = {
//     "message": "验证失败"
//   }
// }
// });

app.use((ctx, next) => {
  return next().catch((err) => {
    if(err.status === 401){
ctx.status = 401;
console.log(1221111);
ctx.body = 'Protected resource, use Authorization header to get access\n';
}else{
      throw err;
}
})
})

module.exports = app
