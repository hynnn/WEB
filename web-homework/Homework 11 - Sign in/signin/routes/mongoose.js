var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/data');
var db = mongoose.connection;

db.on('error', function callback () {
  console.log("Connection error");
});

db.once('open', function callback () {
  console.log("Mongo working!");
});
var Schema = mongoose.Schema;
var userSchema = new Schema({
  name : String,
  password : String,
  id : String,
  tel : String,
  email : String
});


var User = mongoose.model('User', userSchema);

exports.db = db;
exports.user = User;

