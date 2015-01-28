var jwtSimple = require('jwt-simple'),
  constants = require('./constants');

module.exports = {
  decode: jwtSimple.decode,
  getToken: getToken
};

//function encode(payload, secret) {
//  var algorithm = 'HS256';
//
//  var headerStr = JSON.stringify({
//    typ: 'JWT',
//    alg: algorithm
//  });
//
//  var payloadStr = JSON.stringify(payload);
//
//  var jwt = base64Encode(headerStr) + '.' + base64Encode(payloadStr);
//  jwt += '.' + sign(jwt, secret);
//
//  return jwt;
//}
//
//function base64Encode(str) {
//  return new Buffer(str).toString('base64');
//}
//
//function sign(str, key) {
//  var signed = crypto.createHmac('sha256', key)
//    .update(str)
//    .digest('base64');
//  return signed;
//}

function getToken(issuer, user, secret) {
  var payload = {
    iss: issuer,
    sub: user._id,
    exp: new Date().addHours(constants.TOKEN_EXP)
  };

  return jwtSimple.encode(payload, secret);
}