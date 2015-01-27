var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Trip = mongoose.model('Trip');

if (!Trip.count() && !User.count()) {
  mongoose.connection.collections['trips'].drop(function (err) {
    console.log('trips dropped');

    mongoose.connection.collections['users'].drop(function (err) {
      console.log('users dropped');

      seedUsersAndTrips();
    });
  });
}

function seedUsersAndTrips() {
  var driver = {
    "firstName": "georgi",
    "lastName": "prodanov",
    "email": "georgiwe@gmail.com",
    "username": "qweQWE",
    "password": "qweqwe",
    "isDriver": true,
    "carModel": "Toyboata",
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
    "password": "asdasd",
    "isDriver": false
  };
  var passengerModel = new User(passenger);
  passengerModel.save(function (err, savedPassenger) {
    if (err) throw err;
    console.log('saved passenger ', savedPassenger);
  });

  for (var i = 0; i < 5; i += 1) {
    var newTrip = {
      from: 'Sofia',
      to: 'Plovdiv',
      driver: driverModel,
      passengers: [passengerModel],
      departure: new Date().addHours(24 * 365),
      freeSeats: 3
    };

    var tripModel = new Trip(newTrip);
    tripModel.save(function (err, savedTrips) {
      if (err) throw err;
      console.log('saved ', savedTrips);
    });
  }
}