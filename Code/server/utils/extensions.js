String.prototype.toTitleCase = function () {
  if (!this) throw new Error('Null refference exception.');
  if (!this.length) return this;
  
  var words = this.split(' ');
  
  if (words.length === 1) 
    return this[0].toUpperCase() + this.substring(1).toLowerCase();

  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].toTitleCase();
  }

  return words.join(' ');
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