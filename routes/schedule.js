var Sequelize = require("sequelize")

module.exports = function(app, nconf) {
   var connectionString = nconf.get('db:dsn');
   var sequelize = new Sequelize(connectionString, {
       // Look to the next section for possible options
   })

   app.post('/interview/create', function(req,res) {
      var Interview = sequelize.define('interview', {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING
      });

      Interview.build({
        'name': req.body.name,
        'email': req.body.email,
        'phone': req.body.phone
      })
      .save()
      .success(function(data) {
        console.log(data);
      })
      .error(function(error) {
        console.log(error);
      });

   });
}

