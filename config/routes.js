module.exports = function(routes, app, passport){
    app.get('/', routes.index);

    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/', failureRedirect: '/auth/twitter'
    }));

    //app.get('/login', function(req, res){
      //res.render('login', { user: req.user });
    //});

    app.get('/login', function(req, res){
      res.render('login', { user: req.user, message: req.body.error });
    });

    app.post('/login',
      passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
      function(req, res) {
        res.redirect('/');
      });

    app.get('/auth/github',
      passport.authenticate('github'),
      function(req, res){
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
      });

    app.get('/auth/github/callback',
      passport.authenticate('github', { failureRedirect: '/login' }),
      function(req, res) {
        res.render('github_account', {user: req.user });
      });

    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

    app.get('/question', function(req,res){
      res.render('question', {});
    });
}
