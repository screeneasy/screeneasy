var TwitterStrategy = require('passport-twitter').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var LocalStrategy = require('passport-local').Strategy;
//var User = require('../models/User.js');

var users = [];

var localUsers = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' },
    { id: 2, username: 'jay', password: 'jay', email: 'jay@example.com' }
];

var pg = require('pg').native;
var client;
var query;

function findById(user, fn) {
  var idx = user.id - 1;
  if (localUsers[idx]) {
    fn(null, localUsers[idx]);
  } else {
    throw new Error('User ' + user.username + ' does\'t exist');
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = localUsers.length; i < len; i++) {
    var user = localUsers[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

module.exports = function(passport, nconf) {
    var connectionString = process.env.DATABASE_URL || nconf.get('db:dsn');
    client = new pg.Client(connectionString);
    client.connect();
    var user = {};

    passport.use(new TwitterStrategy({
        consumerKey: nconf.get('twitter:key'),
        consumerSecret: nconf.get('twitter:secret'),
        callbackURL: nconf.get('twitter:callback_url')
      },
      function(token, tokenSecret, profile, done) {
        if (!user.twitter) {
          user.twitter = profile;
          var provider = profile.provider;
          var providerId = profile.id;
          // TODO: update row if user already exists
          query = client.query('SELECT * FROM users WHERE ' + provider + '_id = $1', [providerId]);
          query.on('end', function(result) {
            if (result.rowCount == 0) {
              // Check if other user account exists and update
              if (user.github) {
                client.query('UPDATE users SET ' + provider + '_id = $1 WHERE github_id = $2', [providerId, user.github.id]);
              } else {
                // Need to insert new user into db
                var now = new Date().toUTCString();
                client.query('INSERT INTO users (' + provider + '_id, created) VALUES ($1, $2)', [providerId, now]);
              }
            }
          });
        }
        return done(null, user.twitter);
      }
    ));

    passport.use(new GitHubStrategy({
        clientID: nconf.get('github:key'),
        clientSecret: nconf.get('github:secret'),
        callbackURL: nconf.get('github:callback_url')
      },
      function(accessToken, refreshToken, profile, done) {
        if (!user.github) {
          user.github = profile;
          var provider = profile.provider;
          var providerId = profile.id;
          query = client.query('SELECT * FROM users WHERE ' + provider + '_id = $1', [providerId]);
          query.on('end', function(result) {
            if (result.rowCount == 0) {
              // Check if other user account exists and update
              if (user.twitter) {
                client.query('UPDATE users SET ' + provider + '_id = $1 WHERE twitter_id = $2', [providerId, user.twitter.id]);
              } else {
                // Need to insert new user into db
                var now = new Date().toUTCString();
                client.query('INSERT INTO users (' + provider + '_id, created) VALUES ($1, $2)', [providerId, now]);
              }
            }
          });
        }
        return done(null, user.github);
      }
    ));

    passport.use(new LocalStrategy(
      function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

          // Find the user by username.  If there is no user with the given
          // username, or the password is not correct, set the user to `false` to
          // indicate failure and set a flash message.  Otherwise, return the
          // authenticated `user`.
          findByUsername(username, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
            if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
            return done(null, user);
          });
        });
      }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      try {
          findById(obj, function (err, user) {
            done(err, user);
          });
      } catch(e) {
          done(null, obj);
      }
    });
};
