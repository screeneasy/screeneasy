
/*
 * GET users listing.
 */

exports.list = function(req, res){
  console.log(req);
  res.render('users', { res: res });
};
