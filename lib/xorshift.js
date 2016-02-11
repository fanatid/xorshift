'use strict';

/**
 * Basic class for XorShift generators
 * @class XorShift
 */
function XorShift () {}

/**
 * Returns a 64bit random number as a 2x32bit array
 * @return {number[]}
 */
XorShift.prototype._random = function () {
  throw new Error('Not implemented!');
};

/**
 * Returns a random number normalized [0, 1), just like Math.random()
 * @return {number}
 */
XorShift.prototype.random = function () {
  var s = this._random();
  return (s[0] * 0x00100000 + (s[1] >>> 12)) * Math.pow(2, -52);
};

module.exports = XorShift;
