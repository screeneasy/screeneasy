var pg = require('pg').native;
var client;
var query;

module.exports = function(app, nconf) {
    var connectionString = process.env.DATABASE_URL || nconf.get('db:dsn');
    client = new pg.Client(connectionString);
    client.connect();

    app.options('/v1/interview/questions', function(req, res) {
      res.send(200);
    });

    app.post('/v1/interview/questions', function(req, res) {
      var now = new Date().toUTCString();
      var title = req.body.title;
      var source = req.body.source;
      var body = req.body.body;

      client.query('INSERT INTO interview_questions (title, body, source, created) VALUES ($1, $2, $3, $4)', [title, body, source, now], function(err, result) {
          if(err) {
            res.json(err);
          }

          res.json(req.body);
      });
    });

    app.get('/v1/interview/questions', function(req, res) {
      query = client.query('SELECT * FROM interview_questions');
      var rows = []
      query.on('row', function(row) {
          rows.push(row);
      });
      query.on('end', function(result) {
          res.json(rows);
      });
    });
}
