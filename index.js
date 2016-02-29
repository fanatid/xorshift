'use strict'
var XorShift128Plus = require('./lib/xorshift128plus')

// There is nothing particularly scientific about this seed,
//   it is just based on the clock and values from Math.random
var prng = new XorShift128Plus([
  Math.random() * 0xffffffff, Date.now() / 65536,
  Math.random() * 0xffffffff, Date.now() % 65536
])

// Perform 20 iterations in the PRNG,
//   this prevens a short seed from generating pseudo predictable number.
for (var i = 0; i < 20; i++) prng.randomInt64()

module.exports = prng
module.exports.XorShift = require('./lib/xorshift')
module.exports.XorShift128Plus = require('./lib/xorshift128plus')
module.exports.XorShift1024Star = require('./lib/xorshift1024star')
