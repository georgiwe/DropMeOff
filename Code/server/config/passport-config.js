var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {
  app.use(passport.initialize());
  passport.use(new LocalStrategy(function (username, password, done) {



    if (username === password) {
      done(null, {
        username: username,
        password: password
      });
    } else {
      done(null, null);
    }
  }));
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    return {
      username: 'deserializedUser',
      password: 'deserUserPass'
    };
  });
}