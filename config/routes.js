module.exports = function(routes, app, passport, io) {
    app.get('/', routes.index);

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
      passport.authenticate('twitter', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      }
    );

    app.get('/login', function(req, res) {
      res.render('login', { user: req.user, message: req.body.error });
    });

    app.post('/login',
      passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
      function(req, res) {
        res.redirect('/');
      });

    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback',
      passport.authenticate('github', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });

    app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    });

    io.sockets.on('connection', function(socket) {
      socket.on('text-changed', function(data) {
          socket.broadcast.emit('update-text', data);
      });
    });
};
