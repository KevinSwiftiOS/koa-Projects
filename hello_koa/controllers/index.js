var getuser = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
        console.log(name);
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
   
};

module.exports = {
    'POST /getuser':getuser
}