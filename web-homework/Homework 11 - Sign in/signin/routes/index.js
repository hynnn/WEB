var express = require('express');
var router = express.Router();
var mon = require('./mongoose');
var cryPto = require('crypto');
/* GET home page. */
//初始界面
router.get('/', function(req, res, next) {
    if(req.session.user){
        res.render('list',
            { title: 'Express',
        name:req.session.user.name,
        password:req.session.user.password,
        id: req.session.user.id,
        tel:req.session.user.tel,
        email:req.session.user.email });
    }else{
        res.render('index', { title: 'Express' });
    }
});
router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Express' });
});
//加载登陆后的内容
router.post('/signin', function(req, res, next) {
    console.log(req.body.username);
    var encryptPassword = cryPto.createHash('md5').update(req.body.password).digest('hex');
        mon.user.findOne({name:req.body.username},function(err,u){
            if(u){
                req.session.user = u;
                if(u.password == encryptPassword){
                    res.render('list', { title: 'Express',name:u.name, id: u.id, tel:u.tel, email:u.email });
                }
                else{
                    res.render('index',{title: 'Express'});
                }
            }else {
                res.render('index',{title: 'Express'});
            }
        });
});
//加载注册成功后的内容
router.get('/sign_up_list', function(req, res) {
    if(req.session.user){
        res.render('list',
            { title: 'Express',
            name:req.session.user.name,
            password:req.session.user.password,
            id: req.session.user.id,
            tel:req.session.user.tel,
            email:req.session.user.email });
    }else{
        res.redirect("/");
    }
});
router.post('/sign_up_list', function(req, res, next) {
    var encryptPassword = cryPto.createHash('md5').update(req.body.password).digest('hex');
    str='';
    console.log(req.body.username);
    mon.user.find({"name":req.body.username},function(err,u){
        u.forEach(function(data){str+="username "});
    });
    mon.user.find({"id":req.body.id},function(err,u){
        u.forEach(function(data){str+="id "});
    });
    mon.user.find({"tel":req.body.telephone},function(err,u){
        u.forEach(function(data){str+="telephone "});
    });
    mon.user.find({"email":req.body.email},function(err,u){
         u.forEach(function(data){str+="emial "});
    });
    setTimeout(function(){
        console.log(str);
        if(str == '') {
            console.log("save");
            var newuser = new mon.user({name: req.body.username,password:encryptPassword, id: req.body.id, tel:req.body.telephone, email:req.body.email});
            req.session.user = newuser;
            newuser.save();
            res.render('list', { title: 'Express',name:req.body.username,password:req.body.password, id: req.body.id, tel:req.body.telephone, email:req.body.email });
        }
        else{
            console.log("no save");
            str+="is repeated";
            res.send(str);
        }
    },100);
});
router.get('/error', function(req, res, next) {
    res.render('error', { title: 'Express' });
});

router.get('/logout', function(req, res, next) {
    req.session.user = null;
    res.redirect("/");
});

module.exports = router;
