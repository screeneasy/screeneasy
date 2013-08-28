module.exports = function(app) {
    app.options('/v1/interview/questions', function(req, res) {
      res.send(200);
    });

    app.post('/v1/interview/questions', function(req, res) {
      console.log(req);
      console.log(res.body);
      res.json({'foo':'bar'});
    });

    app.get('/v1/interview/questions', function(req, res) {
      res.json({'source':'google', 'body':'hello', 'defaultLanguage': 'python'});
    });
}
