var utilsRoute = '../../../../utils/',
  constants = require(utilsRoute + 'constants'),
  beautify = require(utilsRoute + 'error-beautifier');

module.exports = function (data) {
  function getTopDrivers(req, res) {
    var count = req.params.count;
    data.stats.topDrivers(count)
      .then(function (drivers) {
        res.json(drivers);
      })
      .catch(function (err) {
        res.status(400).json(beautify.databaseError(err));
      });
  }

  return {
    topDrivers: getTopDrivers
  };
};