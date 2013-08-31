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
      console.log(req);
      console.log(res.body);
      res.json({'foo':'bar'});
    });

    app.get('/v1/interview/questions', function(req, res) {
      query = client.query('select * from interviews_questions');
      var rows = []
      query.on('row', function(row) {
          rows.push(row);
      });
      query.on('end', function(result) {
          res.json(rows);
      });
    });
}
