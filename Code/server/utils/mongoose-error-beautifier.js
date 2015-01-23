var messages = require('./messages');

module.exports = function (err) {
  
  var errorsData = {
    details: [],
    message: err.message
  };
  
  if (err.name === 'MongoError') {
    return {
      details: [],
      message: messages.genericError
    };
  }
  
  for (var key in err.errors) {
    var currentError = err.errors[key];
    errorsData.details.push(currentError.message);
  }
  
  return errorsData;
};