
/**
 * Module dependencies.
 */

// database config
require('./db');

// required modules
var express = require('express');
var routes = require('./routes');
var data = require('./routes/data');
var http = require('http');
var path = require('path');
var cons = require('consolidate');


var app = express();

app.engine('html', require('hogan-express'));
app.enable('view cache');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('THIS IS A SECRET KEY, UH?'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// views
app.get('/', routes.index);
app.get('/:uniqueid', data.showMessage);
app.post('/create_message', data.createMessage);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
