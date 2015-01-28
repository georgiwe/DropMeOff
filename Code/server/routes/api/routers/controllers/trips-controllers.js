var secret = process.env.SECRET,
  utilsRoute = '../../../../utils/',
  beautify = require(utilsRoute + 'error-beautifier'),
  modelUtils = require(utilsRoute + 'model-utils'),
  messages = require(utilsRoute + 'messages'),
  jwt = require(utilsRoute + 'jwt');

module.exports = function (data) {

  function filter(req, res) {
    var options = {
      from: req.query.from,
      to: req.query.to,
      departureAfter: req.query.departureAfter,
      freeSeats: req.query.freeSeats,
      page: req.query.page,
      pageSize: req.query.pageSize,
      driverId: req.query.driverId
    };

    data.trips.filter(options)
      .then(function (trips) {
        return res.json(trips);
      })
      .catch(function (err) {
        return res.status(400)
          .json(beautify.databaseError(err));
      });
  }

  function create(req, res) {
    var tripData = req.body; // clean this

    data.trips.save(tripData)
      .then(function (savedTrip) {
        res.status(201).json(savedTrip); // clean this
      })
      .catch(function (err) {
        res.status(500).json(beautify.databaseError(err));
      });
  }

  function addPassenger(req, res) {
    var tripId = req.params.id;
    var passengerId = req.user.id;

    data.trips.addPassenger(tripId, passengerId)
      .then(function (savedTrip) {
        res.json(savedTrip);
      })
      .catch(function (err) {
        res.status(500).json(beautify.databaseError(err));
      })
  }

  function getById(req, res) {
    var tripId = req.params.id;

    data.trips.findById(tripId)
      .then(function (trip) {
        res.json(trip);
      })
      .catch(function (err) {
        res.status(500).json(beautify.databaseError(err));
      })
  }

  function update(req, res) {
    var tripId = req.params.id;
    var tripData = modelUtils.tripToSafeObj(req.body);

    data.trips.update(tripId, tripData)
      .then(function (trip) {
        return res.json(trip);
      })
      .catch(function (err) {
        res.status(500).json(beautify.databaseError(err));
      })
  }

  return {
    filter: filter,
    create: create,
    addPassenger: addPassenger,
    getById: getById,
    update: update
  };
};