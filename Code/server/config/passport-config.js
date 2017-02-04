var passport = require('passport'),
  messages = require('../utils/messages'),
  jwt = require('../utils/jwt'),
  LocalStrategy = require('passport-local').Strategy,
  BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = function (app, data) {

  app.use(passport.initialize());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  var loginStrategy = new LocalStrategy(function (username, password, done) {
    data.users.findByUsernameOrEmail(username, true)
      .then(function (user) {
        if (!user || !user.passMatches(password)) {
          return done(null, false);
        }
        done(null, user);
      })
      .catch(function (err) {
        done(err);
      });
  });

  var authStrategy = new BearerStrategy(function (token, done) {
    try {
      var payload = jwt.decode(token, process.env.SECRET);
    } catch (err) {
      return done({
        message: messages.invalidTokenSignature
      });
    }

    data.users.findById(payload.sub)
      .then(function (user) {
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      })
      .catch(function (err) {
        done(err);
      });
  });

  passport.use('loginStrategy', loginStrategy);
  passport.use('authStrategy', authStrategy);
}