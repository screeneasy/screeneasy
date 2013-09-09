/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var passport = require('passport');
var app = express();
var nconf = require('nconf');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Max-Age', 60);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-XSRF-TOKEN');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(allowCrossDomain);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('secret'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Load up config
nconf.file({ file: '/tmp/config.json' });

// Init passport config
require('./config/passport.js')(passport, nconf);

// instantiate socket-io
// Kick off routes
var server = http.createServer(app);
var io = require('socket.io').listen(server);
require('./config/routes.js')(routes, app, passport, io);

// Candidate profile
require('./config/candidate_profile.js')(app, nconf);

// Candidate questions
require('./config/candidate_questions.js')(app, nconf);

// schedule routes
require('./routes/schedule.js')(app, nconf);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
