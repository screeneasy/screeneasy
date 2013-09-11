module.exports = function(app, nconf) {
   app.post('/email/send', function(req, res) {
      console.log('hi');
      res.send({status: "success"});
   })
}
