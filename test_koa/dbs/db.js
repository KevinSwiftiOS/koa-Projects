var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://lab421:lab421_1@10.1.17.25:27517/dspider2?authSource=admin");
//mongoose.connect("mongodb://localhost:27017/dspider2?authSource=admin");
var db = mongoose.connection;
db.on("error",function (err) {
    console.log(err);
})
module.exports = mongoose;