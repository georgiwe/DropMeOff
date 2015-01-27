var router = require('express').Router(),
  constants = require('../../../utils/constants');

router.get('/', function (req, res) {
  res.json(constants.cities);
});

module.exports = router;