const Koa = require('koa');
const json = require('koa-json');
const koaRouter = require('koa-router');
const router = new koaRouter();
const app = new Koa();
const path = require('path');
const render = require('koa-ejs');
//配置模板引擎
render(app,{
    root:path.join(__dirname,'views'),
    layout:'layout',
    viewExt:'html',
    cache:false,
    debug:false
})
//数据库中的一些东西
const things = [{name:'a'},{name:'b'},{name:'c'}];
//路由跳转 index
router.get("/",index);
router.get("/add",showAdd);
//添加路由方法
router.post("/add",add);
async function add(ctx){
    console.log("12345");
 const body = ctx.request.body;
 console.log(body);
 ctx.redirect("/");
}
router.get("/test",ctx => {
    ctx.response.body = `hello ${ctx.user}`
})
//传参
router.get("/test2/:id",ctx => {
console.log(ctx.params.id);
})
//给上下文context 添加属性
app.context.user = "ckq";
//将index抽取出来单独保存 //函数声明
async function index(ctx) {
    await ctx.render("index",{
        title:"i love",
        things:things
    });
}
async function showAdd(ctx){
    await ctx.render("add")
}


app.use(json());
// app.use(async(ctx) =>{
//     ctx.body = {name:"hello"};
// })
// router.get('/test',ctx => {
//     console.log("1234567");
//     ctx.body = "hello router";
// })
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000,() => {
    console.log("server start");
})