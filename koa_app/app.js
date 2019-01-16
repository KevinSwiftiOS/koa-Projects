const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
//实例化koa
const app = new Koa();
const router = new Router();
var mongoose = require('mongoose');
app.use(bodyParser());
//引入user.js
const users = require("./routes/api/user");

//配置路由
router.use("/api/user",users);

//配置路由
router.get("/user",async ctx => {
    ctx.body = "msg" + "hello";
})
var mongoURI = require("./config/keys").mongoURI;
//连接数据库
mongoose.connect(mongoURI,
{ useNewUrlParser: true })
.then(() => {
console.log("connected");
}).catch((err) => {
    console.log(err);
});

app.use(router.routes()).use(router.allowedMethods());
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server start" + port);
})