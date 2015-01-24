var crypto = require('crypto'),
  jwtSimple = require('jwt-simple');

module.exports = {
  encode: jwtSimple.encode,
  getToken: getToken
};

//function encode(payload, secret) {
//  var algorithm = 'HS256';
//
//  var headerStr = JSON.stringify({
//    typ: 'JWT',
//    algorithm: algorithm
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

function getToken(issuer, data, secret) {
  var payload = {
    iss: issuer,
    sub: data
  };

  var token = jwtSimple.encode(payload, secret);
  return token;
}