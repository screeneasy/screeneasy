var github3 = require('github3');
var profile = require('./profile.js');

//Build up developer profile
module.exports = function(app, nconf) {
    // Enforces user name
    app.get('/v1/developer/github/', function(req, res) {
        var message = {
            'error' : {
                'message' : 'username is required',
                'code' : 'INVALID_ENDPOINT',
                'link' : 'fixme'
            }
        };

        res.json(message);
    });

    app.get('/v1/developer/github/:user', function(req, res) {

      var github_handle = req.params.user;
      var github_profile = {}
      github_profile['social'] = {}

      // @TODO
      // - store a local copy
      github3.getUser(github_handle, function(error, user) {
        github_profile['basic'] = user;

        github3.getUserRepos(github_handle, function(error, repos) {
          github_profile['social']['github'] = repos;
          res.json(github_profile);
        });
      });

    });

    // Provide an endpoint to search by email address
}
