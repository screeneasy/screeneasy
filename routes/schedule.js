var mongoose = require("mongoose")

module.exports = function(app, nconf) {
   var connectionString = nconf.get('db:mongo');
   var Interview = mongoose.model('Interview', 
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


   mongoose.connect(connectionString);
   app.post('/interview/create', function(req,res) {
      var interview = new Interview(req.body);
      interview.save(function (err) {
           if (err) // ...
              res.send({status: 'error', message: 'failed to save interview'})
           else
              res.send({status:'success'});
      });

   });

   app.get('/interview/find', function(req,res) {
      Interview.find({},function(err, data) {
         if (err)
            res.send({status: 'error', message: 'failed to find interviews'})
         else
            res.send(data);              
      })
   });
}

