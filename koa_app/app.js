const Koa = require("koa");
const Router = require("koa-router");
//实例化koa
const app = new Koa();
const router = new Router();
//配置路由

router.get("/user",async ctx => {
    ctx.body = "msg" + "hello";
})
app.use(router.routes()).use(router.allowedMethods());
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server start" + port);
})