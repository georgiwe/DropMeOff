module.exports = function (app) {
  // require extensions, globals, etc
  require('./app-config');
  
  // load models and connect to db
  var data = require('./data-config');

  // express configuration
  require('./express-config')(app);

  // passport configuration
  require('./passport-config')(app);

  // create and register API routes
  require('../routes')(app, data);
}