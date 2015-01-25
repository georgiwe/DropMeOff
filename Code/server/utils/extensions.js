String.prototype.toTitleCase = function () {
  return this[0].toUpperCase() + this.substring(1).toLowerCase();
}