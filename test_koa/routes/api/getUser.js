const jwt = require("jsonwebtoken");
const router = require('koa-router')();
var UserModels = require('../../dbs/UserModels');
var User = UserModels.User;

router.post('/', async (ctx, next) => {
    console.log(ctx.request);
  console.log(ctx.user);
  console.log(ctx.state);

});
module.exports = router.routes();
