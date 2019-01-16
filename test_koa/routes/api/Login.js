const jwt = require("jsonwebtoken");
const router = require('koa-router')();
var UserModels = require('../../dbs/UserModels');
var User = UserModels.User;

router.post('/', async (ctx, next) => {
   var username = ctx.request.body.username;
   var password = ctx.request.body.password;
   console.log(username);

   var data = await User.find({username:username});
   var token = jwt.sign({
      user:data.username
   },"secret", {
      expiresIn: 60 * 60 * 24 * 7// 授权时效一礼拜
   });
   ctx.response.body = {
      "token":token
   }
   ctx.state.user = data;


})
module.exports = router.routes();
