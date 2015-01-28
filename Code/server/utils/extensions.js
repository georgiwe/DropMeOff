String.prototype.toTitleCase = function () {
  return this[0].toUpperCase() + this.substring(1).toLowerCase();
};

Number.prototype.isBetween = function (min, max, inclusive) {
  return inclusive
    ? this >= min && this <= max
    : this > min && this < max;
};

Date.prototype.addHours = function (numberOfHours) {
  if (typeof numberOfHours !== 'number')
    throw new Error('Hours must be a number');
  
  this.setTime(this.getTime() + (numberOfHours * 60 * 60 * 1000));
  return this;
};