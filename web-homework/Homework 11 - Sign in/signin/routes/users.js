var express = require('express');
var router = express.Router();
var mongoose = require("./mongoose");


/* GET users listing. */
router.get('/', function(req, res, next) {
	mongoose.user.find({"username":"z"},function(err,user1){
		user1.forEach(function(data){
			aa = data.username;
		});
	});
	res.send(aa);
});

module.exports = router;
