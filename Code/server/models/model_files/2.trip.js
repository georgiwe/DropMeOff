var mongoose = require('mongoose'),
  modelUtils = require('../../utils/model-utils'),
  constants = require('../../utils/constants'),
  userModel = mongoose.model('User'),
  Schema = mongoose.Schema;

var tripSchema = new Schema({
  from: {
    type: String,
    required: true,
    require: 'From city is required',
    enum: constants.cities,
    set: setTitleCase
  },
  to: {
    type: String,
    required: true,
    require: 'To city is required',
    enum: constants.cities,
    set: setTitleCase
  },
  driver: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
    require: 'A trip must have a driver'
  },
  passengers: {
    type: [{
      type: Schema.ObjectId,
      ref: 'User'
    }]
  },
  departure: {
    type: Date,
    required: true,
    require: 'Departure time is required'
  },
  freeSeats: {
    type: Number,
    required: true,
    require: 'Number of total seats is required',
    min: constants.SEATS_MIN,
    max: constants.SEATS_MAX
  },
  created: {
    type: Date,
    default: new Date(),
    select: false
  }
});

function setTitleCase(str) {
  return str.toTitleCase();
}

tripSchema.path('freeSeats').validate(function (seatsCount) {
  return seatsCount >= constants.SEATS_MIN &&
         seatsCount <= constants.SEATS_MAX;
});

tripSchema.path('from').validate(function (fromCity) {
  return this.to !== fromCity;
}, 'From and To cities cannot be the same');

tripSchema.path('driver').validate(function (driver) {
  return driver && driver.isDriver;
}, 'Driver must be a registered driver');

tripSchema.path('departure').validate(function (date) {
  return date > new Date().addHours(1);
}, 'Trip must take place at least one hour from now - after ' + new Date().addHours(1));

tripSchema.methods.toOutObj = function () {
  return modelUtils.tripToSafeObj(this);
};

mongoose.model('Trip', tripSchema);