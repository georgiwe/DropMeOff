var mongoose = require('mongoose'),
chance = require('chance')(),
cities = require('../utils/constants').cities,
User = mongoose.model('User'),
Trip = mongoose.model('Trip');

var numberOfUsers = 49;
var numberOfTrips = 100;

var drivers = [];
var passengers = [];

Trip.count().exec()
.then(function (count) {
  if (count) return;

  mongoose.connection.collections['trips'].drop(function (err) {
    console.log('no trips detected');

    mongoose.connection.collections['users'].drop(function (err) {
      console.log('no users detected');
      console.log('seeding...');

      seedUsersAndTrips();
    });
  });
});

function seedUsersAndTrips() {

  var me = {
    "firstName": "georgi",
    "lastName": "prodanov",
    "email": "georgiwe@gmail.com",
    "username": "qweQWE",
    "password": "qweqwe",
    "isDriver": true,
    "carModel": "Toyboata",
    "interestCities": ['sOfIA', 'PLoVDiv'],
    "roles": ['user', 'admin']
  }
  new User(me).save(function  (err, meSaved) {
    drivers.push(meSaved);
  });

  for (var i = 0; i < numberOfUsers; i++) {
    var newUser = {
      firstName: chance.first(),
      lastName: chance.last(),
      email: chance.email(),
      username: chance.word({length: 6}),
      password: 'qweqwe',
      isDriver: chance.bool({likelihood: 25}),
      interestCities: [],
      roles: ['user']
    };

    var firstCity = cities[randInd()];
    var secondCity = cities[randInd()];
    while (firstCity && firstCity === secondCity) secondCity = cities[randInd()];
    newUser.interestCities.push(firstCity);
    newUser.interestCities.push(secondCity);

    new User(newUser).save(function (err, savedUser) {
      if (savedUser.isDriver) drivers.push(savedUser);
      else passengers.push(savedUser);
    });
  };

  var interval = setInterval(function () {
    User.find().count(function (err, count) {
      if (count > numberOfUsers) {
        clearInterval(interval);
        if (!(drivers.length > 0)) console.log('seeding failed');
        else seedTrips();
      }
    });
  }, 1500);
}

function seedTrips () {
  for (var i = 0; i < numberOfTrips; i++) {
    var from = cities[randInd()];
    var to = cities[randInd()];

    while (to === from) to = cities[randInd()];

    var newTrip = {
      from: from,
      to: to,
      driver: drivers[randInd(drivers.length)],
      passengers: [],
      departure: chance.date({year: 2015}).addHours(chance.integer({min: -6, max: 6})).setMonth(chance.integer({min: 2, max: 11})),
      freeSeats: Math.round(Math.random() * (4 - 1)) + 1
    };

    var rounds = chance.integer({min: 0, max: newTrip.freeSeats});

    for (var j = 0; j < rounds; j++) {
      var index = randInd(passengers.length);
      var newPassenger = passengers[index];

      if (newTrip.passengers.indexOf(newPassenger) !== -1) {
        j--;
        continue;
      }

      newTrip.passengers.push(newPassenger);
    }

    new Trip(newTrip).save(function (err, savedTrip) {
      User.findOne({_id: savedTrip.driver}, function (err, theDriver) {
        theDriver.trips.push(savedTrip);
        theDriver.save(function (err, savedwhatever) {
          checkForEndOfSeed();
        });
      });
    });
  }
}

function randInd (len) {
  len = len || cities.length - 1;
  return chance.integer( { min: 0, max: len - 1 } );
}

function checkForEndOfSeed () {
  // User.count(function (err, userCount) {
  //   Trip.count(function (tripCount) {
  //     if (userCount === numberOfUsers + 1 && tripCount === numberOfTrips) {
  //       console.log('seeding finished');
  //     }
  //   });
  // });
}