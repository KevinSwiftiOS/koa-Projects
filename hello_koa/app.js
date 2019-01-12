//导入koa 导入的是一个class 因此用大写的Koa表示
const Koa = require('koa');
//创建一个Koa对象表示web app本身
const app = new Koa();
// 对于任何请求 app将调用该异步函数处理请求
// ctx封装了request和response的变量 通过它进行访问
// await next来处理下一个异步函数
// 由async标记的函数被称为异步函数，在异步函数中，可以用
// await来调用另一个异步函数。
const router = require('koa-router')();
//post 请求中用来解析参数bodyparser
const bodyparser = require('koa-bodyparser');
app.use(async(ctx,next) =>{
    console.log("process");
    await next();
});
// //添加路由
// router.get('/hello/:name',async(ctx,next)=>{
//     var name = ctx.params.name;
//     ctx.response.body = `<h1>hello ${name}!<h1>`;
// })
// router.get('/',async(ctx,next)=>{
//     ctx.response.body = '<h1>body</h1>';
// });
// router.post('/login',async(ctx,next)=>{
//     var name = ctx.request.body.name || '';
//     var password = ctx.request.body.password || '';
//     ctx.response.type = 'application/json';
//     ctx.response.body = {
//         'name':name
//     };
// })
// //body-parser必须在router被注册到app对象前加载。
// app.use(bodyparser());
// app.use(router.routes());
// app.listen(3001);


app.use(async(ctx,next)=>{
   console.log("1"); //等这里执行好 调用下一个异步函数
 
    await next();
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
 
});
app.use(async(ctx,next) => {
    const start = new Date().getTime(); // 当前时间
    console.log(2);
    await next();
    const ms = new Date().getTime() - start; //等异步函数执行好 再执行这里 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});
app.use(async(ctx,next)=>{
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>cdda<h1>';
})
// //在端口3000监听
// app.listen(3001);
// console.log("app start");
// //koa把很多async函数组装成一个处理链 每个async函数都可以做一些事情
// //然后用await next()来调用异步函数，这些middleware组合起来，可以完成很多作用。

//先导入fs模块，然后用readDirSync 列出文件，
//这里可以用sync是因为只在启动的时候调用一次，不存在性能的问题
const bodyParser = require('koa-bodyparser');


const controller = require('./controller');


// log request URL:
// app.use(async (ctx, next) => {
//     console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
//     await next();
// });

// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
