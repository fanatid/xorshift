'use strict'

function XorShift () {}

XorShift.prototype._hex2seed = function (size, hex) {
  var arr = new Array(size)
  for (var i = 0; i < size; ++i) {
    arr[i] = parseInt(hex.slice(i * 8, (i + 1) * 8), 16) | 0
  }
  return arr
}

XorShift.prototype.randomInt64 = function (enc) {
  throw new Error('Not implemented!')
}

XorShift.prototype.random = function () {
  var x = this.randomInt64()
  return (x[0] * 0x00200000 + (x[1] >>> 11)) * Math.pow(2, -53)
}

XorShift.prototype.randomBytes = function (size) {
  var buffer = new Buffer(size)
  for (var offset = 0; offset < size; offset += 8) {
    var x = this.randomInt64()
    buffer.writeUInt32BE(x[0], offset, true)
    buffer.writeUInt32BE(x[1], offset + 4, true)
  }
  return buffer
}

module.exports = XorShift
