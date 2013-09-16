var GitHubApi = require("github");

//Build up developer profile
module.exports = function(app) {
    var github = new GitHubApi({
        // required
        version: "3.0.0",
        // optional
        timeout: 5000
    });

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

    app.options('/v1/developer/:name/gists', function(req,res) {
       res.send(200);
    });

    app.get('/v1/developer/:user/gists', function(req, res) {
       var github_handle = req.params.user;
       github.gists.getFromUser({
           user: github_handle
       }, function(err, data) {
           res.json(data);
       });
    });

    app.options('/v1/developer/:name/basic', function(req,res) {
       res.send(200);
    });

    app.get('/v1/developer/:user/basic', function(req, res) {
       var github_handle = req.params.user;
       github.user.getFrom({
           user: github_handle
       }, function(err, data) {
           res.json(data);
       });
    });

    app.options('/v1/developer/:name/repos', function(req,res) {
       res.send(200);
    });

    app.get('/v1/developer/:user/repos', function(req, res) {
       // @TODO Re-structure return data and return
       // {
       //    "contributed" : {},
       //    "own": {}
       // }
       var github_handle = req.params.user;
       github.repos.getFromUser({
           user: github_handle
       }, function(err, data) {
           res.json(data);
       });
    });
};
