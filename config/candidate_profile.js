var github3 = require('github3');
var profile = require('./profile.js');

//Build up developer profile
module.exports = function(app) {
    // Enforces user name
    app.get('/v1/developer/', function(req, res) {
        var message = {
            'error' : {
                'message' : 'username is required',
                'code' : 'INVALID_ENDPOINT',
                'link' : 'fixme'
            }
        };

        res.json(message);
    });

    app.options('/v1/developer/:name', function(req,res) {
       res.send(200);
    });

    app.get('/v1/developer/:user', function(req, res) {
      var github_handle = req.params.user;
      var github_profile = {};

      // - store a local copy
      github3.getUser(github_handle, function(error, user) {
        github_profile.basic = user;
        res.json(github_profile);
      });

    });

    // Provide an endpoint to search by email address
};
