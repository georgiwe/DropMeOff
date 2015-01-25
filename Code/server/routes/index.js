module.exports = function (app, data) {
  require('./api')(app, data);

  app.get('*', function (req, res, next) {
    if (req.path !== '/') return res.redirect(301, '/');
    next();
  });

  // catch 404 and forwarding to error handler
  app.use(function (req, res, next) {
    var err = new Error('Resource Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {
    return res.status(err.status || 500).json({
      message: 'Internal Server Error'
    });
  });
}