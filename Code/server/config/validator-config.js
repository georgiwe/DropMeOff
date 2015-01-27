var expressValidator = require('express-validator');

module.exports = function (app) {
  var validatorOptions = {
    customValidators: {

    }
  };

  app.use(expressValidator(validatorOptions));
}