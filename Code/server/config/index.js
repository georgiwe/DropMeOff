module.exports = function (app) {
  // require extensions, globals, etc
  require('./app-config');
  
  // load models and connect to db
  var data = require('./data-config');

  // express configuration
  require('./express-config')(app);
  
  // validator configuration
  require('./validator-config')(app);

  // passport configuration
  require('./passport-config')(app, data);

  // create and register API routes
  require('../routes')(app, data);
  
  // seed test data
  require('./seed');
}