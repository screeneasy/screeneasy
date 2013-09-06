var mongoose = require('mongoose');

module.exports = function(app, nconf) {
   var connectionString = nconf.get('db:mongo');
   app.post('/interview/create', function(req,res) {
      mongoose.connect(connectionString);
      var Interview = mongoose.model('interview', 
               { 
                 interviewer: {
                  name: String,
                  email: String,
                  phone: String 
                 },
                 candidate: {
                  name: String,
                  email: String, 
                  phone: String 
                 },
                 interviewDate: Date
               });

      var interview = new Interview(req.body);
      interview.save(function (err) {
           if (err) // ...
                console.log('fail');
           res.send({status:'success'});
           res.end();
      });
   });
}

