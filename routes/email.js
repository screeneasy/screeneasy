module.exports = function(app, nconf) {
   app.options('/email', function(req,res) {
      res.send(200);
   });

   app.post('/email', function(req, res) {
      console.log('hi');
      res.send({status: "success"});
   })
}
