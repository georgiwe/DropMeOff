var messages = require('./messages'),
  _ = require('underscore');

module.exports = {
  databaseError: beautifyDatabaseErrors,
  validationError: beautifyValidationErrors,
  customError: beautifyCustomError
};

function beautifyDatabaseErrors(err) {

  var errorsData = {
    details: [],
    message: err.message
  };

  if (err.name === 'MongoError') {

    errorsData.message = (err.code === 11000) ? messages.duplicate : messages.genericError;

    return errorsData;
  }

  for (var key in err.errors) {
    var currentError = err.errors[key];
    errorsData.details.push(currentError.message);
  }

  return errorsData;
}

function beautifyValidationErrors(rawErrors) {
  var errorsData = {
    details: undefined,
    message: 'Validation Error' + (rawErrors.length > 1 ? 's' : '')
  };

  errorsData.details = _.map(rawErrors, function (err) {
    return err.msg;
  });

  return errorsData;
}

function beautifyCustomError(err) {
  if (Object.keys(err).length === 1) {
    return err;
  } else {
    return {
      message: messages.genericError
    };
  }
}