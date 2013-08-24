var TwitterStrategy = require('passport-twitter').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var nconf = require('nconf');

var users = [];

module.exports = function(passport) {
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
}
