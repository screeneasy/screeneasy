var TwitterStrategy = require('passport-twitter').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var LocalStrategy = require('passport-local').Strategy;

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

    passport.use(new TwitterStrategy({
            consumerKey: nconf.get('twitter:key'),
            consumerSecret: nconf.get('twitter:secret'),
            callbackURL: nconf.get('twitter:callback_url'),
            passReqToCallback: true
        },
        function(req, token, tokenSecret, profile, done) {
            debugger;
            if (!req.user) {
                // Authenticate on Twitter
                /*var user = users[profile.id] || 
                  (users[profile.id] = { id: profile.id, name: profile.username})*/
                // TODO: get a user from the db and return that user
                var user = [];
                /*query = client.query('SELECT * FROM users WHERE twitter_id = 231250747', function(err, result) {
                  user = result.rows;
                });*/
                var queryConfig = {
                  text: 'SELECT * FROM users WHERE twitter_id = \'' + profile.id + '\''
                  //values: ['231250747']
                };

                query = client.query(queryConfig, function(err, result) {
                  user = result.rows;
                });
                /*query = client.query('SELECT * FROM users WHERE twitter_id = $1', ['231250747'], function(err, result) {
                  if (err) {
                    res.json(err);
                  }
                  user = result.rows;
                });*/
                /*var user = [];
                query.on('row', function(row) {
                    user.push(row);
                });*/

                // Found an existing user
                if (user.length > 0) {
                  return done(null, user[0]);
                } else {
                  // Need to insert new user into db
                  var now = new Date().toUTCString();
                  var twitter_id = profile.id;

                  client.query('INSERT INTO users (twitter_id, created) VALUES ($1, $2)', [twitter_id, now]);
                  client.query('SELECT * FROM users WHERE twitter_id = $1', [profile.id]);
                  return done(null, user[0]);
                }

                
            } else {
                // TODO: Associate Twitter account with user
            }
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
