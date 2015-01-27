module.exports = function (app, data) {
  require('./api')(app, data);
  var messages = require('../utils/messages');

  app.get('*', function (req, res, next) {
    var regEep = new RegExp(/^\/api\/.*/i);
    if (req.path !== '/' && !regEep.test(req.path)) return res.redirect(301, '/');
    next();
  });

  // catch 404 and forwarding to error handler
  app.use(function (req, res, next) {
    var err = new Error('Resource Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV === 'dev') console.log(err);
    res.status(err.status || 500);

    var errorObj = {
      message: 'Internal server error'
    };
    
    if (err.status == 404)
      errorObj.message = messages.resourceNotFound;
      
    if (err.message == messages.invalidTokenSignature)
      errorObj.message = err.message;

    res.json(errorObj);
  });
}