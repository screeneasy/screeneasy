/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var app = express();
var nconf = require('nconf');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
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

var users = [];

//Load up config
nconf.file({ file: '/tmp/config.json' });

passport.use(new TwitterStrategy({
        consumerKey: nconf.get('twitter:key'),
        consumerSecret: nconf.get('twitter:secret'),
        callbackURL: nconf.get('twitter:callback_url')
    },
    function(token, tokenSecret, profile, done) {
        var user = users[profile.id] ||
                   (users[profile.id] = { id: profile.id, name: profile.username});
        done(null, user);
    }
));

passport.use(new GitHubStrategy({
    clientID: nconf.get('github:key'),
    clientSecret: nconf.get('github:secret'),
    callbackURL: nconf.get('github:callback_url')
  },
  function(accessToken, refreshToken, profile, done) {
      // asynchronous verification
      process.nextTick(function () {
        return done(null, profile);
      });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


app.get('/', routes.index);

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/', failureRedirect: '/auth/twitter'
}));

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.render('github_account', {user : req.user });
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
