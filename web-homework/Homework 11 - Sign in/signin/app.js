var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var path = require('path');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express);
app.set('view engine', 'html');

app.use(session({ 
    secret: 'secret',
    cookie:{ 
        maxAge: 1000*60*30
    }
}));
app.use(function(req, res, next) {
    var queryStr = querystring.parse(url.parse(req.url).query);
    if (queryStr.name){
        res.setHeader("Content-Type", "text/html");
        if (req.session.user) {
            if (req.session.user.name === queryStr.name) {
                res.render('list', 
                { title: 'Express',
                name:req.session.user.name,
                password:req.session.user.password, 
                id: req.session.user.id, 
                tel:req.session.user.tel, 
                email:req.session.user.email });
            }else{
                res.redirect("/index");
            }
        }else{
            res.redirect("/");
            return;
        }
    }
    next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
