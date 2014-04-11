
/**
 * Module dependencies.
 */
var express = require('express');
var site = require('./routes/index');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var partials = require('express-partials');
var validator = require('express-validator');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(validator());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', site.index);
app.get('/u/:user', user.user);
app.post('/post', user.post);
app.get('/reg', user.reg);
app.post('/reg', user.doReg);
app.get('/login', user.login);
app.post('/login', user.doLogin);
app.get('/logout', user.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
