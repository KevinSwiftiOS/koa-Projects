var Router = require("koa-router");
var router = new Router();
//test
router.get("/test",async (ctx) => {
    ctx.status = 200;
    ctx.response.body = {"msg":"hello world"};
});
router.post("/register",async(ctx) => {
console.log(ctx.request.body);
ctx.response.body = {name:'ckq'};
})
module.exports = router.routes();

