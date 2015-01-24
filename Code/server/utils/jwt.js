var crypto = require('crypto');

module.exports = {
  encode: encode,
  createToken: createToken
};

function encode(payload, secret) {
  var algorithm = 'HS256';

  var headerStr = JSON.stringify({
    typ: 'JWT',
    algorithm: algorithm
  });

  var payloadStr = JSON.stringify(payload);

  var jwt = base64Encode(headerStr) + '.' + base64Encode(payloadStr);
  jwt += '.' + sign(jwt, secret);

  return jwt;
}

function base64Encode(str) {
  return new Buffer(str).toString('base64');
}

function sign(str, key) {
  var signed = crypto.createHmac('sha256', key)
    .update(str)
    .digest('base64');
  return signed;
}

function createToken(req, data, secret) {
  var payload = {
    iss: req.hostname,
    sub: data
  };

  var token = encode(payload, secret);
  return token;
}