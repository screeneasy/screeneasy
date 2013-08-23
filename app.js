/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var GitHubStrategy = require('passport-github').Strategy;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var users = [];

passport.use(new TwitterStrategy({
        consumerKey: '',
        consumerSecret: '',
        callbackURL: 'http://jay.sea1.office.priv:3000/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
        var user = users[profile.id] ||
                   (users[profile.id] = { id: profile.id, name: profile.username});
        done(null, user);
    }
));

passport.use(new GitHubStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    user.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    var user = users[id];
    done(null, user);
});


app.get('/', routes.index);
app.get('/users', user.list);

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/', failureRedirect: '/auth/twitter'
}));

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
