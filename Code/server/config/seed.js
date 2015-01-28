var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Trip = mongoose.model('Trip');

Trip.count().exec()
  .then(function (count) {
    if (count) return;

    mongoose.connection.collections['trips'].drop(function (err) {
      console.log('trips dropped');

      mongoose.connection.collections['users'].drop(function (err) {
        console.log('users dropped');

        seedUsersAndTrips();
      });
    });
  });

function seedUsersAndTrips() {
  var driver = {
    "firstName": "georgi",
    "lastName": "prodanov",
    "email": "georgiwe@gmail.com",
    "username": "qweQWE",
    "password": "qweqwe",
    "isDriver": true,
    "carModel": "Toyboata",
    "interestCities": ['sOfIA', 'PLoVDiv'],
    "roles": ['user', 'admin']
  };
  var driverModel = new User(driver);
  driverModel.save(function (err, savedDriver) {
    if (err) throw err;
    console.log('saved driver ', savedDriver);
  });

  var passenger = {
    "firstName": "jeremy",
    "lastName": "clarkson",
    "email": "email@email.email",
    "username": "asdASd",
    "interestCities": ['sOfIA', 'PLoVDiv'],
    "password": "asdasd",
    "isDriver": false
  };
  var passengerModel = new User(passenger);
  passengerModel.save(function (err, savedPassenger) {
    if (err) throw err;
    console.log('saved passenger ', savedPassenger);
  });

  for (var i = 0; i < 5; i += 1) {
    var cities = ['Plovdiv', 'Sofia'];
    var fromInd = Math.round(Math.random());
    var days = 1 + Math.round(Math.random() * 6);

    var newTrip = {
      from: cities.splice(fromInd, 1)[0],
      to: cities[0],
      driver: driverModel,
      passengers: [passengerModel, driverModel],
      departure: new Date().addHours(24 * days),
      freeSeats: Math.round(Math.random() * (4 - 1)) + 1
    };

    var tripModel = new Trip(newTrip);
    tripModel.save(function (err, savedTrip) {
      if (err) throw err;
      console.log('saved ', savedTrip);
      driverModel.trips.push(savedTrip);
      driverModel.save();
    });
  }
}